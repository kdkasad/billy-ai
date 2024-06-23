"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { SessionProvider, useSession } from "next-auth/react";

export interface ActionButtonParams {
  label: string;
  href: string;
}

const landingNavLinks = [{ name: "Home", href: "/" }];

const appNavLinks = [{ name: "Feed", href: "/feed" }];

export default function MainNav() {
  return (
    <SessionProvider>
      <MainNavInternal />
    </SessionProvider>
  );
}

function MainNavInternal() {
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <div className="hidden md:contents">
        <nav className="flex flex-row items-center gap-6 text-center text-sm">
          {(session ? appNavLinks : landingNavLinks).map((link) => {
            const active = link.href === pathname;
            return (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        <div className="flex flex-1 flex-row items-center justify-end gap-2">
          {/* <Button on:click={toggleMode} variant="ghost" size="icon">
          {
            $mode === 'dark'
              ? <Sun className="size-5" />
              : <Moon className="size-5" />
          }
        </Button> */}

          {session ? (
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href="/api/auth/signout"
            >
              Sign out
              <LogOut className="ml-2 size-4" />
            </Link>
          ) : (
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href="/api/auth/signin?callbackUrl=/feed"
            >
              Sign in
              <ArrowRight className="ml-2 size-4" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
