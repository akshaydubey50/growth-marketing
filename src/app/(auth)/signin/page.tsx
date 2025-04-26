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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Loader2Icon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter email address"),
  password: z.string().min(1, "Please enter password"),
});

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<any>(false);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.error) {
        setError(response.error);
      } else if (response?.url) {
        router.push("/");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full flex items-center justify-center min-h-screen md:min-h-[calc(100vh-20rem)] py-8">
      <Card className="mx-4 md:mx-auto  max-w-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-black bg-white">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignIn)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="off"
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
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>{" "}
                        <Link
                          href="/forgot-password"
                          className="inline-block ml-auto text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>

                    <FormControl>
                      <>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            {...field}
                            className={cn(
                              "transition-all duration-300 ease-in-out pr-10",
                              form.formState.errors.password &&
                                "border-red-500 focus-visible:ring-red-500 input-error"
                            )}
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
                          </Button>{" "}
                        </div>
                      </>
                    </FormControl>
                    <FormMessage className="text-sm font-medium text-red-500 transition-all duration-300 ease-in-out" />
                  </FormItem>
                )}
              />
              {error && (
                <p className="font-medium text-red-500 transition-all duration-200 ease-in-out">
                  {error}
                </p>
              )}
              <div className="grid gap-2">
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-[#1c1c1c] text-white font-medium hover:bg-opacity-80"
                >
                  {isLoading ? (
                    <>
                      <Loader2Icon className="mr-2 animate-spin" /> Loading
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" /> Login
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <Button
            variant="outline"
            className="w-full mt-2 font-medium bg-slate-200 hover:bg-opacity-50"
            onClick={() => {
              setIsLoadingGoogle(true);
              signIn("google");
            }}
          >
            {isLoadingGoogle ? (
              <>
                <Loader2Icon className="mr-2 animate-spin" /> Loading
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" /> Login with Google
              </>
            )}
          </Button>
          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
