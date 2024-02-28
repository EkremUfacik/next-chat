"use client";

import { Search } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  console.log(value);

  const handleSearch = () => {
    if (!value) {
      replace(pathname);
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("search", value);
    replace(pathname + "?" + params);
  };

  useEffect(() => {
    handleSearch();
  }, [value]);

  return (
    <form>
      <Label htmlFor="search" className="flex items-center relative">
        <Search
          color="gray"
          size={16}
          className="pointer-events-none absolute left-2"
        />
        <Input
          type="text"
          id="search"
          name="search"
          value={search}
          className="border border-b-2 border-gray-200 border-b-gray-400 focus:outline-none focus:border-b-gray-600 pl-8"
          placeholder="Search users"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Label>
    </form>
  );
};

export default SearchInput;
