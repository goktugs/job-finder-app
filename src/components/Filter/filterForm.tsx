import { Input } from "../ui/input";
import { useFilterStore } from "@/store/filterSlice";
import { Toggle } from "@/components/ui/toggle";
import { useListTypeStore } from "@/store/listTypeSlice";
import { WidthIcon } from "@radix-ui/react-icons";

const SORTBY_OPTIONS = [
  {
    id: 1,
    label: "Date Post",
  },
  {
    id: 2,
    label: "Salary Low to High",
  },

  {
    id: 3,
    label: "Job Type",
  },
  {
    id: 4,
    label: "Salary High to Low",
  },
];

const AIRLINES_OPTIONS = [
  {
    id: 1,
    label: "Location",
  },
  {
    id: 2,
    label: "Job Type",
  },
  {
    id: 3,
    label: "Salary",
  },
];
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
    </div>
  );
}
