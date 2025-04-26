"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, Mail, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { encryptData } from "@/lib/crypto";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const signUpSchema = z.object({
  email: z.string().email("Please enter valid email address"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:";'<>?,./|`~])[A-Za-z\d!@#$%^&*()_\-+={}[\]:";'<>?,./|`~]{8,}$/,
      "Please Enter Password  "
    ),
});

export default function Page() {
  const [error, setError] = useState<String | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMessages, setPasswordMessages] = useState<string[]>([]);
  const [passwordConditionsMet, setPasswordConditionsMet] = useState<boolean[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<any>(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post("/api/signup", values);

      if (response.data.success) {
        const encryptedEmail = encryptData(values.email);
        sessionStorage.setItem("verificationEmail", encryptedEmail);
        router.push("/verify");
      }
      if (response.data.success === false) {
        setError(response.data.message);
      }
    } catch (error: any) {
      const errMsg = error as AxiosError<{ status: string; message: string }>;
      setError(errMsg?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = (password: string) => {
    const conditions = [
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&]/.test(password),
      password.length >= 8,
    ];

    setPasswordConditionsMet(conditions);

    const messages = [
      "Password must include a capital letter",
      "Password must include a lowercase letter",
      "Password must include a number",
      "Password must include a special character",
      "Password must be at least 8 characters",
    ];

    if (conditions.every((condition) => condition)) {
      setPasswordMessages([]); // Clear messages if all conditions are met
    } else {
      setPasswordMessages(messages); // Set messages if conditions are not met
    }
  };

  return (
    <section className="w-full flex items-center justify-center min-h-screen md:min-h-[calc(100vh-20rem)] py-8">
      <Card className="mx-4 md:mx-auto max-w-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-black bg-white my-8">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-6"
            >
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          type="text"
                          placeholder="m@example.com"
                          {...field}
                          className={cn(
                            "transition-all duration-200 ease-in-out",
                            form.formState.errors.email &&
                              "border-red-500 focus-visible:ring-red-500 input-error"
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-sm font-medium text-red-500 transition-all duration-200 ease-in-out" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            autoComplete="off"
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            {...field}
                            className={cn(
                              "transition-all duration-300 ease-in-out pr-10",
                              form.formState.errors.password &&
                                "border-red-500 focus-visible:ring-red-500 input-error"
                            )}
                            onBlur={(e) => {
                              validatePassword(e.target.value);
                              field.onBlur();
                            }}
                            onChange={(e) => {
                              validatePassword(e.target.value);
                              field.onChange(e);
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-0 right-0 h-full px-3 py-2 transition-opacity duration-300 ease-in-out hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <Eye className="w-4 h-4 icon-fade" />
                            ) : (
                              <EyeOff className="w-4 h-4 icon-fade" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-sm font-medium text-red-500 transition-all duration-300 ease-in-out" />
                    </FormItem>
                  )}
                />
              </div>
              {passwordMessages.length > 0 && (
                <ul className="ml-5 text-sm font-medium list-disc">
                  {passwordMessages.map((msg, index) => (
                    <li
                      key={index}
                      className={
                        passwordConditionsMet[index]
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {msg}
                    </li>
                  ))}
                </ul>
              )}
              {error && <p className="font-medium text-red-500">{error}</p>}
              <div className="grid gap-2">
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-[#1c1c1c] text-white font-medium hover:bg-opacity-80"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" /> Loading
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" /> Sign Up
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <Button
            variant="outline"
            className="w-full mt-2 font-medium bg-slate-200 hover:bg-opacity-50"
            onClick={async () => {
              setIsLoadingGoogle(true);
              const response = await signIn("google", { redirect: false });
              console.log("signin response", response);
            }}
          >
            {isLoadingGoogle ? (
              <>
                <Loader2 className="mr-2 animate-spin" /> Loading
              </>
            ) : (
              <>
                {/* <LogIn className="w-4 h-4 mr-2" /> Sign Up */}
                <Mail className="w-4 h-4 mr-2" /> Sign up with Google
              </>
            )}
          </Button>
          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
