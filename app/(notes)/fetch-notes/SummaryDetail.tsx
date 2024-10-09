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
  console.log("props,props", props.listData.table);

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
            {props && props.listData.table?.heading.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    {props &&
                      props.listData.table?.heading?.map(
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
                  {props &&
                    props.listData.table?.body.map(
                      (val: any, index: number) => (
                        <TableRow key={index}>
                          {val.map((v: any, i: number) => (
                            <TableCell className="font-medium">{v}</TableCell>
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
