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
import SummaryDetail from "./SummaryDetail";
import {
  fetchSubjectCategory,
  fetchSubjectList,
} from "../../utils/Api.services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// {
//     "subject":"test",
//     "question":"name plese",
//     "answer": { "ans": "pj", "format": "list" },
//     "query": "",

//     "questionNumber":1,
//     "links":[]

// }
const page = () => {
  const Text = "React";
  const [listData, setListData] = useState<any>([]);
  const [listCategory, setListCategory] = useState<any>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const handleOptionChange = async () => {
    const payload = {
      subject: selectedSubject,
      page: 0,
      limit: 10,
    };
    let d = await fetchSubjectList(payload);
    if (d?.status === 200) {
      setListData(d.data);
      console.log(d.data);
    }
  };
  useEffect(() => {
    console.log("selectedSubject", selectedSubject);

    if (selectedSubject !== "") {
      handleOptionChange();
    }
  }, [selectedSubject]);
  useEffect(() => {
    const fetchData = async () => {
      // const payload = {
      //   subject: Text,
      //   page: 0,
      //   limit: 10,
      // };
      let e = await fetchSubjectCategory();

      // let d = await fetchSubjectList(payload);
      if (e?.status === 200) {
        // setListData(d.data);
        setListCategory(e?.data);
        // console.log(d.data);
      }
    };
    fetchData();
  }, []);
  const comparisonData = [
    { personName: "Alice", personAge: 25, location: "New York" },
    { userName: "Bob", userAge: 30, city: "San Francisco" },
    { fullName: "Charlie", age: 35, place: "Los Angeles" },
  ];
  return (
    <div className="w-[95%] overflow-hidden">
      <div className="text-center max-w-[200px]">
        {" "}
        <Select
          onValueChange={setSelectedSubject} // defaultValue={field.value || "p"}
          defaultValue={selectedSubject}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent position="popper">
            {listCategory.map((subject: any, index: number) => (
              <SelectItem key={index} value={subject}>
                {subject}
              </SelectItem>
            ))}{" "}
          </SelectContent>
        </Select>{" "}
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Sl No</TableHead>
            {/* <TableHead>Status</TableHead> */}
            <TableHead>Question</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listData.map((val: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium ">
                {val.questionNumber}
              </TableCell>
              <TableCell className="font-medium  w-full">
                {/* {val.question} */}
                {/* <p onClick={() => setExpand(!expand)}>hai</p> */}
                <SummaryDetail listData={val} />
              </TableCell>
              {/* <TableCell
              //  onClick={() => setExpand(!expand)}
              >
                arrow
              </TableCell> */}
              {/* <TableCell className="text-right"> */}
              {/* {invoice.totalAmount} */}
              {/* </TableCell> */}
              <TableCell className=" text-right">Edit</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Pagination</TableCell>
            {/* <TableCell className="text-right">Edit</TableCell> */}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default page;
