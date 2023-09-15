import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFilterStore } from "@/store/filterSlice";
import { Label } from "@radix-ui/react-label";
import { useTranslation } from "react-i18next";

export default function FilterDropdown() {
  const { searchType, setSearchType } = useFilterStore();

  const { t } = useTranslation();

  return (
    <div className="flex justify-center ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {t("searchBy")}
            {searchType === "name"
              ? t("position")
              : searchType === "companyName"
              ? t("company")
              : t("location")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={searchType}
            onValueChange={setSearchType}
          >
            <DropdownMenuRadioItem
              className="hover:cursor-pointer"
              value={"name"}
            >
              {t("position")}
            </DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem
              className="hover:cursor-pointer"
              value={"companyName"}
            >
              {t("company")}
            </DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem
              className="hover:cursor-pointer"
              value={"location"}
            >
              {t("location")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuItem>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-2 ">
                    <Label
                      className="w-16 text-left opacity-40"
                      htmlFor="height"
                    >
                      {t("salary")}
                    </Label>
                    <div className="flex flex-1 space-x-2">
                      <Input
                        disabled
                        id="min"
                        placeholder="Min"
                        className="col-span-1 h-8 text-xs placeholder:text-xs"
                        type="number"
                      />
                      <Input
                        disabled
                        id="max"
                        placeholder="Max"
                        className="col-span-1 h-8 text-xs placeholder:text-xs"
                        type="number"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Salary Search not implemented to BE yet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
