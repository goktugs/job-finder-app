import FilterForm from "@/components/Filter/filterForm";
import JobList from "@/components/JobList";
import React from "react";

export default function Jobs() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* <FilterForm /> */}
      <JobList />
      {/* <UserInfo /> */}
    </div>
  );
}
