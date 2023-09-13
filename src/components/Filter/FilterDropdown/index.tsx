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

export default function FilterDropdown() {
  const { searchType, setSearchType } = useFilterStore();

  return (
    <div className="flex justify-center ">
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Filter Options</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none text-center">
                Filter By
              </h4>
              <p className="text-sm text-muted-foreground text-center">
                You can filter by location, salary and company name
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-4">
                <Label className="w-16" htmlFor="Location">
                  Location
                </Label>
                <Input
                  value={filterByLocation}
                  onChange={(e) => setFilterByLocation(e.target.value)}
                />
              </div>
           

              <div className="flex items-center gap-4">
                <Label className="w-16" htmlFor="CompanyName">
                  Company Name
                </Label>
                <Input
                  value={filterByCompanyName}
                  onChange={(e) => setFilterByCompany(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={filterHandler}>Filter</Button>
          </div>
        </PopoverContent>
      </Popover> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Search By</Button>
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
              Position
            </DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem
              className="hover:cursor-pointer"
              value={"companyName"}
            >
              Company Name
            </DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem
              className="hover:cursor-pointer"
              value={"location"}
            >
              Location
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
                      Salary
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
