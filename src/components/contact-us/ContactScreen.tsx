"use client"
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
import { cn } from "@/lib/utils";
import { FaLinkedin } from "react-icons/fa6";
import { RiTwitterFill } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import NewsLetter from "@/components/newsletter";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { MapPin, Mail, Phone, Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

const loginSchema = z.object({
  name: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
  description: z.string().min(5, "Describe your message"),
  message: z.string().min(1, "message selection is required"),
});

export default function ContactScreen() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { toast } = useToast();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            name: "",
            description: "",
            message: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.post("/api/contact-form", {
                fullName: values.name,
                email: values.email,
                queryReason: values.message,
                message: values.description,
            });

            if (response.data.success) {
                toast({
                    description: "Contact form submitted successfully",
                });
            }
        } catch (error: any) {
            const errMsg = error as AxiosError<{ status: string; message: string }>;
            setError(errMsg?.response?.data?.message || "Something went wrong");
            toast({
                description: error,
            });
        } finally {
            form.reset();
            setIsLoading(false);
        }
    };

    const messages = [
        { value: "advertising_sponsorship", label: "Advertising / Sponsorship" },
        { value: "affiliate_patnership", label: "Affiliate / Patnership" },
        { value: "bug_issue", label: "Bug / Issue" },
        { value: "careers", label: "Careers" },
        { value: "feedback", label: "Feedback" },
        { value: "media_pr", label: "Media / PR" },
        { value: "other", label: "Other" },
    ];
    return (
        <>
            <div className="min-w-xs bg-light-gray  h-[250px] lg:h-[300px] flex items-center justify-center px-4 mb-4">
                <div className="mx-auto max-w-8xl text-center">
                    <h1 className="text-2xl font-bold  md:text-4xl lg:text-6xl">
                        Contact
                    </h1>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                <div className="flex flex-col lg:flex-row  space-y-10 lg:space-y-0 lg:justify-center  lg:items-start  lg:space-x-20    mt-6 lg:mt-10 lg:px-6 ">
                    <section>
                        <div className="flex flex-col lg:items-start space-y-4 ">
                            <p className="text-xl font-semibold">
                                {" "}
                                Get in Touch with the CCF Team
                            </p>

                            <p>
                                Got a question, feedback, or just want to say hello? We&apos;re
                                all ears!
                            </p>
                            <p>
                                Drop us a message, and we&apos;ll get back to you as quickly as
                                possible.
                            </p>
                            <p>
                                Your insights help us shape a better experience for the
                                community..
                            </p>
                            <p>Don&apos;t hesitate—get in touch!</p>

                            <p className="flex  items-center gap-2">
                                <span>
                                    <Mail className="w-4 h-4" />
                                </span>
                                <span>
                                    <Link href={"mailto:contentcreation.fyi@gmail.com"}>
                                        contentcreation.fyi@gmail.com
                                    </Link>
                                </span>
                            </p>

                            <p className="flex  items-center gap-2">
                                <span>
                                    <MapPin className="w-4 h-4" />
                                </span>
                                <span>Mumbai, India</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="cursor-pointer">
                                    <Link
                                        href="https://www.linkedin.com/in/digiarpit/"
                                        target="_blank"
                                    >
                                        <FaLinkedin className="text-3xl" />
                                    </Link>
                                </span>
                                <span className="cursor-pointer">
                                    <Link href="https://x.com/digiarpit" target="_blank">
                                        <RiTwitterFill className="text-3xl" />
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </section>
                    <section className="flex-1">
                        <Card className="py-6">
                            <CardContent>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-6"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Full Name"
                                                            {...field}
                                                            className={cn(
                                                                "border-gray-500",
                                                                "transition-all duration-200 ease-in-out",
                                                                form.formState.errors.name &&
                                                                "border-red-500 focus-visible:ring-red-500 input-error"
                                                            )}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500 font-medium text-sm transition-all duration-200 ease-in-out" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Email"
                                                            {...field}
                                                            className={cn(
                                                                "border-gray-500",
                                                                "transition-all duration-200 ease-in-out",
                                                                form.formState.errors.email &&
                                                                "border-red-500 focus-visible:ring-red-500 input-error"
                                                            )}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500 font-medium text-sm transition-all duration-200 ease-in-out" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger className="border-gray-500">
                                                                <SelectValue placeholder="Reason for contacting" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-gray-100 cursor-pointer">
                                                                {messages.map((msg) => (
                                                                    <SelectItem
                                                                        key={msg.value}
                                                                        value={msg.value}
                                                                        className="hover:bg-green-200 cursor-pointer"
                                                                    >
                                                                        {msg.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage className="text-red-500 font-medium text-sm transition-all duration-200 ease-in-out" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Message"
                                                            {...field}
                                                            className={cn(
                                                                "border-gray-500",
                                                                "transition-all duration-200 ease-in-out",
                                                                form.formState.errors.description &&
                                                                "border-red-500 focus-visible:ring-red-500 input-error"
                                                            )}
                                                        />
                                                    </FormControl>

                                                    <FormMessage className="text-red-500 font-medium text-sm transition-all duration-300 ease-in-out" />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex justify-start">
                                            <Button
                                                type="submit"
                                                variant="outline"
                                                className=" text-white font-medium border w-full border-black bg-black hover:bg-white hover:text-black"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="animate-spin mr-2" /> Submitting
                                                    </>
                                                ) : (
                                                    <>Submit</>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
            <div className="px-4 md:px-8 lg:px-16">
                <NewsLetter />
            </div>
        </>
    )

}
