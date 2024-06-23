"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Rank } from "./page";

export default function SortSelector({ rank }: { rank: Rank }) {
  "use client";

  function handleChange(rank: Rank) {
    router.replace("/feed?rank=" + rank);
  }

  const router = useRouter();

  return (
    <Select value={rank} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="new">Newest</SelectItem>
          <SelectItem value="top">Most votes</SelectItem>
          <SelectItem value="bottom">Fewest votes</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
