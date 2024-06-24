"use client";

import { Button } from "@/components/ui/button";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import googleIcon from "./google.svg";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const next = searchParams.next || "/feed";
  return (
    <SessionProvider>
      <SignInPageInternal next={next} />
    </SessionProvider>
  );
}

function SignInPageInternal({ next }: { next: string }) {
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") {
    router.push(next);
  }

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
