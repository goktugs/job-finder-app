import FilterForm from "@/components/Filter/filterForm";
import JobList from "@/components/JobList/JobList";

export default function Jobs() {
  return (
    <div className="flex flex-col flex-1 ">
      <FilterForm />
      <JobList />
    </div>
  );
}
