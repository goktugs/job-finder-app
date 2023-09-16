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
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function JobFilters() {
  const { sortType, setSortType } = useSortStore();
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div className="flex gap-2">
      <DropdownMenu
        onOpenChange={(open) => {
          setOpen(open);
        }}
        open={open}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{t("sortBy")}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortType} onValueChange={setSortType}>
            <DropdownMenuLabel>Salary</DropdownMenuLabel>

            <DropdownMenuRadioItem value={"salary asc"}>
              {t("ascending")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"salary desc"}>
              {t("descending")}
            </DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Date</DropdownMenuLabel>

            <DropdownMenuRadioItem value={"createdAt asc"}>
              {t("ascending")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"createdAt desc"}>
              {t("descending")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <Button
            className="w-full mt-4"
            onClick={() => {
              setSortType("none");
              setOpen(false);
            }}
          >
            {t("reset")}
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
