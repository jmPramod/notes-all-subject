"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const SummaryDetail = (props: any) => {
  console.log("props,props", props.listData.question);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-[90%] border-none overflow-y-hidden"
    >
      <AccordionItem value="item-1 " className="border-none overflow-y-hidden">
        <AccordionTrigger>{props && props.listData.question}</AccordionTrigger>
        <AccordionContent>
          {props &&
            props.listData.answer.ans.map((v: any, i: number) => (
              <div>{v}</div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SummaryDetail;
