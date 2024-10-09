"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const SummaryDetail = (props: any) => {
  console.log("props,props", props.listData.ansDifference);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-[90%] border-none overflow-y-hidden"
    >
      <AccordionItem value="item-1 " className="border-none overflow-y-hidden">
        <AccordionTrigger>{props && props.listData.question}</AccordionTrigger>
        {props && props.listData.answer !== "" && (
          <AccordionContent>
            {props &&
              props.listData.answer.ans.map((v: any, i: number) => (
                <div>{v}</div>
              ))}
            {props && props.listData.ansDifference?.heading.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    {props &&
                      props.listData.ansDifference?.heading?.map(
                        (val: any, index: number) => (
                          <>
                            <TableHead>{val}</TableHead>
                          </>
                        )
                      )}
                  </TableRow>
                </TableHeader>
                {/* <TableBody> */}
                <TableBody>
                  {props.listData.ansDifference?.ans.map(
                    (val: any, index: number) => (
                      <TableRow key={index}>
                        {Object.keys(val)
                          .filter((key) => key !== "_id") // Exclude _id
                          .map((key, i) => (
                            <TableCell key={i} className="font-medium">
                              {val[key]}
                            </TableCell>
                          ))}
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            )}
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default SummaryDetail;
