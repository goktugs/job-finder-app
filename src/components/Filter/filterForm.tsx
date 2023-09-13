// fixme filterQuery should stay on url

import { Input } from "../ui/input";
import { useFilterStore } from "@/store/filterSlice";
import FilterDropdown from "./FilterDropdown";

export default function FilterForm() {
  const filter = useFilterStore((state) => state.filterQuery);
  const setFilter = useFilterStore((state) => state.setFilterQuery);
  const { searchType } = useFilterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className=" flex flex-col md:flex-row space-y-4 md:space-y-0  md:space-x-4 items-center justify-center -">
      <Input
        type="search"
        placeholder={`Search by ${
          searchType === "name"
            ? "Position"
            : searchType === "companyName"
            ? "Company Name"
            : "Location"
        }`}
        className="w-full md:w-1/2 placeholder:text-center bg-[#FFFAF1] "
        value={filter}
        onChange={handleChange}
      />
      <FilterDropdown />
    </div>
  );
}
