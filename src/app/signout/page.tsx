"use client";

import { Button } from "@/components/ui/button";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const next = searchParams.next || "/";
  return (
    <SessionProvider>
      <SignOutPageInternal next={next} />
    </SessionProvider>
  );
}

function SignOutPageInternal({ next }: { next: string }) {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push(next);
  }

  return (
    <div className="p-24 space-y-12 w-full text-center">
      <h1 className="text-4xl font-extrabold">Sign out from Billy</h1>
      <Button type="button" onClick={() => signOut({ callbackUrl: next })}>
        Sign out
      </Button>
    </div>
  );
}
