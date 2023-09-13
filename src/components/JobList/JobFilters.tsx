import { useSortStore } from "@/store/sortSlice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export default function JobFilters() {
  const { sortType, setSortType } = useSortStore();

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Sort By</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortType} onValueChange={setSortType}>
            <DropdownMenuLabel>Salary</DropdownMenuLabel>

            <DropdownMenuRadioItem value={"salary asc"}>
              Ascending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"salary desc"}>
              Descending
            </DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Date</DropdownMenuLabel>

            <DropdownMenuRadioItem value={"createdAt asc"}>
              Ascending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"createdAt desc"}>
              Descending
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <Button
            className="w-full mt-4"
            onClick={() => {
              setSortType("none");
            }}
          >
            Reset
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
