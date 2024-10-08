"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SummaryDetail from "./SummaryDetail";
import { fetchSubject } from "../utils/Api.services";

// {
//     "subject":"test",
//     "question":"name plese",
//     "answer": { "ans": "pj", "format": "list" },
//     "query": "",

//     "questionNumber":1,
//     "links":[]

// }
const page = () => {
  let Text = "React";
  let data = [
    {
      subject: "test",
      question: "name plese",
      answer: { ans: "pj", format: "list" },
      query: "",

      questionNumber: 1,
      links: [],
    },
    {
      subject: "test",
      question: "name plese",
      answer: { ans: "pj", format: "list" },
      query: "",

      questionNumber: 1,
      links: [],
    },
    {
      subject: "test",
      question: "name plese",
      answer: { ans: "pj", format: "list" },
      query: "",

      questionNumber: 1,
      links: [],
    },
    {
      subject: "test",
      question: "name plese",
      answer: { ans: "pj", format: "list" },
      query: "",

      questionNumber: 1,
      links: [],
    },
    {
      subject: "test",
      question: "name plese",
      answer: { ans: "pj", format: "list" },
      query: "",

      questionNumber: 1,
      links: [],
    },
    {
      subject: "test",
      question: "name plese",
      answer: { ans: "pj", format: "list" },
      query: "",

      questionNumber: 1,
      links: [],
    },
    {
      subject: "test",
      question: "name plese",
      answer: { ans: "pj", format: "list" },
      query: "",

      questionNumber: 1,
      links: [],
    },
    {
      subject: "test",
      question: "name plese",
      answer: { ans: "pj", format: "list" },
      query: "",

      questionNumber: 1,
      links: [],
    },
  ];
  //   const invoices = [
  //     {
  //       invoice: "INV001",
  //       paymentStatus: "Paid",
  //       totalAmount: "$250.00",
  //       paymentMethod: "Credit Card",
  //     },
  //     {
  //       invoice: "INV002",
  //       paymentStatus: "Pending",
  //       totalAmount: "$150.00",
  //       paymentMethod: "PayPal",
  //     },
  //     {
  //       invoice: "INV003",
  //       paymentStatus: "Unpaid",
  //       totalAmount: "$350.00",
  //       paymentMethod: "Bank Transfer",
  //     },
  //     {
  //       invoice: "INV004",
  //       paymentStatus: "Paid",
  //       totalAmount: "$450.00",
  //       paymentMethod: "Credit Card",
  //     },
  //     {
  //       invoice: "INV005",
  //       paymentStatus: "Paid",
  //       totalAmount: "$550.00",
  //       paymentMethod: "PayPal",
  //     },
  //     {
  //       invoice: "INV006",
  //       paymentStatus: "Pending",
  //       totalAmount: "$200.00",
  //       paymentMethod: "Bank Transfer",
  //     },
  //     {
  //       invoice: "INV007",
  //       paymentStatus: "Unpaid",
  //       totalAmount: "$300.00",
  //       paymentMethod: "Credit Card",
  //     },
  //   ];

  useEffect(() => {
    const fetchData = async () => {
      let payload = {
        subject: Text,
        page: 0,
        limit: 10,
      };
      await fetchSubject(payload);
    };
  }, []);
  return (
    <div>
      <div className="text-center">React </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl No</TableHead>
            {/* <TableHead>Status</TableHead> */}
            <TableHead>Question</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((val: any, index: number) => (
            <>
              <SummaryDetail val={val} index={index} />
            </>
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
