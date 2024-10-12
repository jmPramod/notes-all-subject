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
  console.log("props", props);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-[90%] border-none overflow-y-hidden"
    >
      <AccordionItem value="item-1 " className="border-none overflow-y-hidden">
        <AccordionTrigger className="md:text-2xl">
          {props.individualSubjectDataList.question &&
            props.individualSubjectDataList.question}
        </AccordionTrigger>
        {props && props?.individualSubjectDataList?.answer !== "" && (
          <AccordionContent>
            {props &&
              props.individualSubjectDataList?.answer.ans.map(
                (v: any, i: number) => <div>{v}</div>
              )}
            {props &&
              props.individualSubjectDataList?.table?.heading.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {props &&
                        props.individualSubjectDataList?.table?.heading?.map(
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
                      props.individualSubjectDataList?.table?.body.map(
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
