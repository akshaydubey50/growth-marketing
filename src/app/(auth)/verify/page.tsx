"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Loader2Icon } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { decryptData } from "@/lib/crypto";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
export default function InputOTPControlled() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const router = useRouter();

  const { toast } = useToast();
  const verifyCode = async () => {
    setButtonDisabled(true);
    setError(null);
    try {
      //if params has token then call /api/verify-token
      const result = await axios.post("/api/verify", {
        code: value,
        email: email,
      });
      console.log("result", result);
      if (result.data.success) {
        toast({
          title: "Success",
          description: "Code verified successfully",
        });
        router.push("/signin");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{
        status: string;
        message: string;
      }>;
      console.log("axiosError", axiosError.response?.data?.message);
      setError(axiosError.response?.data?.message || "Something went wrong");
      toast({
        title: "Verification Code Failed",
        // description: axiosError.response?.data,
        variant: "destructive",
      });
    } finally {
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    // Retrieve and decrypt the email from sessionStorage
    const encryptedEmail = sessionStorage.getItem("verificationEmail");
    if (encryptedEmail) {
      const decryptedEmail = decryptData(encryptedEmail);
      setEmail(decryptedEmail);
    } else {
      // If email is not found, redirect to signup
      router.push("/signup");
    }
  }, [router]);

  return (
    <section className="w-full h-full flex items-center justify-center bg-white">
      <Card className="mx-auto max-w-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-black bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Enter Verification code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Enter 6 digit code</Label>
              <Input
                id="verificationCode"
                type="text"
                placeholder="123456"
                value={value}
                onChange={(e) => setValue(e.target.value.trim())}
                required
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {/*  {msg && <div className="text-green-500">{msg}</div>}
             */}
            <Button
              type="submit"
              variant="outline"
              onClick={verifyCode}
              className="bg-[#1c1c1c] text-white font-medium hover:bg-opacity-80"
              disabled={buttonDisabled || value.length < 6}
            >
              {buttonDisabled ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Verifying Code
                </>
              ) : (
                "Verify Code"
              )}
            </Button>
          </div>
        </CardContent>
        {/*  <div className="flex flex-col justify-center items-center min-h-screen space-y-4 w-fit  mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Verify Your Account</h1>
            <p className="text-sm text-gray-300">
              Enter Verification code sent to your email
            </p>
          </div>
          <Input
            maxLength={6}
            value={value}
            onChange={(e) => setValue(e.target.value.trim())}
          />

          <Button
            onClick={verifyCode}
            // variant={"outline"}
            className={`text-center font-semibold  `}
            type="submit"
            disabled={buttonDisabled || value.length < 6}
          >
            {buttonDisabled ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Verifying Code
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </div> */}
      </Card>
    </section>
  );
}
