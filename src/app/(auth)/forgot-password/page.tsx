"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<String | null>(null);
  const [msg, setMessage] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRouter();

  const handleForgetPassword = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage(null); // Clear previous messages

      const response = await axios.post("/api/forgot-password", {
        email: email,
      });

      // Set success message
      setMessage("Reset Password link sent to your email!!");
    } catch (error) {
      const errorMsg = error as AxiosError<{ status: string; message: string }>;
      setError(errorMsg?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full h-full flex items-center justify-center bg-white">
      <Card className="mx-auto max-w-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-black bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Forget Password</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={!!msg}
                autoComplete="off"
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {msg && <div className="text-green-500">{msg}</div>}

            <Button
              type="submit"
              variant="outline"
              onClick={handleForgetPassword}
              className="bg-[#1c1c1c] text-white font-medium hover:bg-opacity-80"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="animate-spin mr-2" /> Submitting
                </>
              ) : (
                <>Submit</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
