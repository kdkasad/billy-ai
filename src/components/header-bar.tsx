import { cn } from "@/lib/utils";
import { ScrollText } from "lucide-react";
import MainNav from "./main-nav";

export default function HeaderBar({ solid = true }: { solid: boolean }) {
  return (
    <header
      className={cn("z-50 h-14 w-full", solid && "border-b bg-background")}
    >
      <div className="container flex h-14 max-w-screen-2xl flex-row items-center gap-4">
        <a href="/" className="mr-6 flex flex-row items-center gap-2">
          <ScrollText className="size-6" />
          <span className="font-bold tracking-tight">Billy</span>
        </a>

        <MainNav />
      </div>
    </header>
  );
}
