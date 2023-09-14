// fixme filterQuery should stay on url

import { Input } from "../ui/input";
import { useFilterStore } from "@/store/filterSlice";
import FilterDropdown from "./FilterDropdown";

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

export default function FilterForm() {
  const filter = useFilterStore((state) => state.filterQuery);
  const setFilter = useFilterStore((state) => state.setFilterQuery);
  const { searchType } = useFilterStore();
  const [lang, setLang] = useState("en");

  const { i18n, t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const changeLangHandler = async (lang: string) => {
    await i18n.changeLanguage(lang);
  };

  console.log("lang", lang);
  return (
    <div className=" flex flex-col md:flex-row space-y-4 md:space-y-0  md:space-x-4 items-center justify-center ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{t("language")}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{t("selectLang")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={lang}
            onValueChange={(value) => {
              setLang(value);
              changeLangHandler(value);
            }}
          >
            <DropdownMenuRadioItem value="en">{t("en")}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="tr">{t("tr")}</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        type="search"
        placeholder={`${t("searchBy")} ${
          searchType === "name"
            ? t("position")
            : searchType === "companyName"
            ? t("company")
            : t("location")
        }`}
        className="w-full md:w-1/2 placeholder:text-center bg-[#FFFAF1] "
        value={filter}
        onChange={handleChange}
      />
      <FilterDropdown />
    </div>
  );
}
