"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";

export default function ActionButton() {
  return (
    <SessionProvider>
      <ActionButtonInternal />
    </SessionProvider>
  );
}

function ActionButtonInternal() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Link className={buttonVariants()} href="/feed">
        Go to my feed
        <ArrowRight className="ml-2 size-5" />
      </Link>
    );
  } else {
    return (
      <Link className={buttonVariants()} href="/signin">
        Sign in
        <ArrowRight className="ml-2 size-5" />
      </Link>
    );
  }
}
