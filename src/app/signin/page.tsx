"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import googleIcon from "./google.svg";
import { signIn } from "next-auth/react";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { next: string };
}) {
  const next = searchParams.next || "/feed";
  return (
    <div className="p-24 space-y-12 w-full text-center">
      <h1 className="text-4xl font-extrabold">Sign in to Billy</h1>
      <Button
        type="button"
        onClick={() => signIn("google", { callbackUrl: next })}
      >
        <Image
          src={googleIcon}
          alt="Google logo icon"
          className="size-6 mr-3"
        />
        Sign in with Google
      </Button>
    </div>
  );
}
