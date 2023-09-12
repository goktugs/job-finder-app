// fixme filterQuery should stay on url

import { Input } from "../ui/input";
import { useFilterStore } from "@/store/filterSlice";
import FilterDropdown from "./FilterDropdown";

export default function FilterForm() {
  const filter = useFilterStore((state) => state.filterQuery);
  const setFilter = useFilterStore((state) => state.setFilterQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="mb-2 flex  flex-col md:items-center">
      <Input
        type="search"
        placeholder="Search"
        className="w-full md:w-1/2 placeholder:text-center bg-[#FFFAF1] "
        value={filter}
        onChange={handleChange}
      />
      <FilterDropdown />
    </div>
  );
}
