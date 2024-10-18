"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import SummaryDetail from "./SummaryDetail";
// import {
//   fetchSubjectCategory,
//   fetchSubjectList,
// } from "../../utils/Api.services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
// import { PaginationPage } from "./PaginationPage";
import { Progress } from "@/components/ui/progress"; // Import your Progress component
import { useRouter } from "next/navigation";
import { CodeEditorType, libEditorType, subjectType } from "@/app/all.types";
import SummaryDetail from "../../SummaryDetail";
import {
  fetchSubjectCategory,
  fetchSubjectList,
} from "@/app/utils/Api.services";
import { PaginationPage } from "../../PaginationPage";
// PaginationPage
const Page = ({ params }: { params: { id: string; subject: string } }) => {
  console.log("id123", params.id, params.subject);

  const router = useRouter();
  const [individualSubjectDataList, setIndividualSubjectDataList] = useState<
    subjectType[]
  >([]);

  const [listCategory, setListCategory] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState(params.subject);
  const [info, setInfo] = useState<any>();
  const [pageValue, setPageValue] = useState(parseInt(params.id));
  const [pagelimit, setLimitValue] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progress state

  const handleOptionChange = async () => {
    setLoading(true);
    setProgress(0); // Reset progress

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 100; // Complete progress
        }
        return prev + 10; // Increment progress
      });
    }, 100);

    const payload: {
      subject: string;
      page: number;
      limit: number;
    } = {
      subject: selectedSubject,
      page: pageValue,
      limit: pagelimit,
    };

    let d = await fetchSubjectList(payload);
    if (d?.status === 200) {
      setIndividualSubjectDataList(d.data);

      setInfo(d.info);
    } else {
      setErrorMessage("Failed to fetch data.");
    }

    clearInterval(progressInterval);
    setLoading(false);
    setProgress(100); // Ensure it reaches 100%
  };

  useEffect(() => {
    if (selectedSubject !== "") {
      handleOptionChange();
    }
  }, [selectedSubject, pageValue, pagelimit]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProgress(0); // Reset progress

      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 100; // Complete progress
          }
          return prev + 10; // Increment progress
        });
      }, 100);

      let e = await fetchSubjectCategory();
      if (e?.status === 200) {
        setListCategory(e?.data);
      } else {
        setErrorMessage(e.message || "Fetching data failed. Please try again.");
      }

      clearInterval(progressInterval);
      setLoading(false);
      setProgress(100); // Ensure it reaches 100%
    };

    fetchData();
  }, []);
  const handleEdit = (id: string) => {
    router.push(`/edit-notes/${id}`);
  };
  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Progress
            value={progress}
            className="w-[60%] flex items-center justify-center "
          />{" "}
        </div>
      ) : (
        <div className="w-full">
          <div className="text-center max-w-[200px] my-3">
            {errorMessage && (
              <div className="text-red-500 text-center mb-4">
                {errorMessage}
              </div>
            )}
            {/* <Select
              onValueChange={setSelectedSubject}
              defaultValue={selectedSubject}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent position="popper">
                {listCategory &&
                  listCategory?.map((subject: any, index: number) => (
                    <SelectItem key={index} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select> */}
          </div>
          <Table className="p-5">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]  md:text-2xl">Sl No</TableHead>
                <TableHead className="md:text-2xl">Question</TableHead>
                <TableHead className="text-right md:text-2xl">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {individualSubjectDataList?.map((val: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium md:text-2xl">
                    {val?.serialNumber?.SlNumber}
                  </TableCell>
                  <TableCell className="font-medium  w-full">
                    <SummaryDetail individualSubjectDataList={val} />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant={"outline"}
                      className="text-right"
                      onClick={() => {
                        handleEdit(val._id);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {info && (
            <PaginationPage
              info={info}
              setLimitValue={setLimitValue}
              setPageValue={setPageValue}
              setInfo={setInfo}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Page;
