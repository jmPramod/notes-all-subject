"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { fetchSubjectCategory } from "@/app/utils/Api.services";
import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";
const SelectDropDown = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [errorMessage, setErrorMessage] = useState("");
  const [listCategory, setListCategory] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      let e = await fetchSubjectCategory();
      if (e?.status === 200) {
        setListCategory(e?.data);

        setErrorMessage("");
      } else {
        setErrorMessage(e.message || "Fetching data failed. Please try again.");
        ("");
      }
      setLoading(false);
    };
    if (listCategory.length === 0) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    console.log("246", pathname);
    if (!pathname.includes("/fetch-notes/")) {
      setSelectedSubject("");
    }
  }, [pathname, selectedSubject]);
  useEffect(() => {
    console.log("246 selectedSubject", selectedSubject);

    if (selectedSubject !== "") {
      router.push(`/fetch-notes/${selectedSubject}/1`);
    }
  }, [selectedSubject]);
  return (
    <div>
      <Select onValueChange={setSelectedSubject} defaultValue={selectedSubject}>
        <SelectTrigger>
          <SelectValue placeholder="Select Subject" />
        </SelectTrigger>
        <SelectContent position="popper">
          {loading
            ? "Loading..."
            : listCategory &&
              listCategory?.map((subject: any, index: number) => (
                <SelectItem key={index} value={subject}>
                  {subject}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDropDown;
