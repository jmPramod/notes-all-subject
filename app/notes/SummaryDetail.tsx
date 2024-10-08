"use client";
import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
const SummaryDetail = (props: any) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <TableRow key={props.index}>
        <TableCell className="font-medium border">
          {props.val.questionNumber}
        </TableCell>
        <TableCell className="font-medium border w-full">
          {props.val.question}
          {/* <p onClick={() => setExpand(!expand)}>hai</p> */}
        </TableCell>

        <TableCell onClick={() => setExpand(!expand)}>arrow</TableCell>
        {/* <TableCell className="text-right"> */}
        {/* {invoice.totalAmount} */}
        {/* </TableCell> */}
        <TableCell className=" text-right">Edit</TableCell>
      </TableRow>

      {expand && (
        <TableRow>
          <TableCell>{props.val.answer.ans}</TableCell>
        </TableRow>
      )}
    </>
  );
};

export default SummaryDetail;
