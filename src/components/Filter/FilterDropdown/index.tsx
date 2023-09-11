import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLocationStore } from "@/store/locationSlice";
import { AutoComplete } from "@/components/autoComplete";
import { useFilterStore } from "@/store/filterSlice";

export default function FilterDropdown() {
  const locations = useLocationStore((state) => state.locations);

  const filterByLocation = useFilterStore((state) => state.filterByLocation);
  const setFilterByLocation = useFilterStore(
    (state) => state.setFilterByLocation
  );
  const filterBySalary = useFilterStore((state) => state.filterBySalary);
  const setFilterBySalary = useFilterStore((state) => state.setFilterBySalary);

  return (
    <div className="flex justify-center">
      <Popover>
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
                You can filter by location and salary
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-4">
                <Label htmlFor="Location">Location</Label>
                <AutoComplete
                  options={locations.map((location, index) => ({
                    label: location,
                    value: index.toString(),
                  }))}
                  emptyMessage={"No location were found"}
                />
              </div>

              <div className="grid grid-cols-3 items-center gap-4 ">
                <Label htmlFor="height">Salary</Label>
                <Input
                  id="min"
                  placeholder="Min"
                  className="col-span-1 h-8 text-xs placeholder:text-xs"
                  type="number"
                />
                <Input
                  id="max"
                  placeholder="Max"
                  className="col-span-1 h-8 text-xs placeholder:text-xs"
                  type="number"
                />
              </div>
            </div>
            <Button>Filter</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
