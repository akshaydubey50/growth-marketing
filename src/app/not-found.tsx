"use client";
import * as RoutePath from "@/constants/RoutePath";
import { useRouter } from "next/navigation";
import InputOTPControlled from "./(auth)/verify/page";

export default function NotFound() {
  const route = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-[79vh] space-y-8 px-6">
      <h2 className="font-bold text-9xl inline-block text-transparent bg-gradient-to-b from-DarkOrange to-white bg-clip-text">404</h2>
      <p className="font-medium text-2xl text-center">
        The page you are looking for doesn’t exist.
      </p>
      <button
        className="border-2 border-DarkOrange text-base px-6 py-2 text-DarkOrange rounded-full hover:bg-green-100 mt-4"
        onClick={() => route.push(RoutePath.HomePage)}
      >
        Back to Home
      </button>
    </div>
   
  );
}
