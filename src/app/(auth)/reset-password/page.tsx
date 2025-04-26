"use client";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type PasswordCondition = {
  test: (password: string) => boolean;
  message: string;
};

const passwordConditions: PasswordCondition[] = [
  { test: (pwd) => /[A-Z]/.test(pwd), message: "Include a capital letter" },
  { test: (pwd) => /[a-z]/.test(pwd), message: "Include a lowercase letter" },
  { test: (pwd) => /\d/.test(pwd), message: "Include a number" },
  {
    test: (pwd) => /[@$!%*?&]/.test(pwd),
    message: "Include a special character",
  },
  { test: (pwd) => pwd.length >= 8, message: "Be at least 8 characters" },
];

export default function VerifyPassword() {
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationResults, setValidationResults] = useState<boolean[]>(
    passwordConditions.map(() => false)
  );
  const router = useRouter();
  const { toast } = useToast();

  const validatePassword = useCallback((password: string): boolean[] => {
    return passwordConditions.map((condition) => condition.test(password));
  }, []);

  useEffect(() => {
    const results = validatePassword(passwords.new);
    setValidationResults(results);
  }, [passwords.new, validatePassword]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const resetPassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const token = new URLSearchParams(window.location.search).get("token");
      const { data } = await axios.post("/api/reset-password", {
        token,
        newPassword: passwords.new,
      });

      if (data.success) {
        toast({
          title: "Success",
          description: "Password reset successfully",
        });
        router.push("/signin");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isResetDisabled =
    isSubmitting ||
    !validationResults.every((result) => result) ||
    passwords.new !== passwords.confirm;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4 w-fit mx-auto">
      <Card className="w-full max-w-sm  shadow-lg bg-white rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            type="password"
            name="new"
            placeholder="New Password"
            value={passwords.new}
            onChange={handlePasswordChange}
            required
          />
          <Input
            type="password"
            name="confirm"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            required
          />
          <Button
            onClick={resetPassword}
            className="bg-[#1c1c1c] text-white font-medium hover:bg-opacity-80"
            disabled={isResetDisabled}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Resetting Password
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
          <ul className="text-sm font-medium list-disc ml-5">
            {passwordConditions.map(({ message }, index) => (
              <li
                key={index}
                className={
                  validationResults[index] ? "text-green-500" : "text-red-500"
                }
              >
                {message}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
