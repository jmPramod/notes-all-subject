"use client";
import React, { useEffect, useState } from "react";
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
import CodeEditor from "../CodeEditor/CodeEditor";
import HtmlEditor from "../CodeEditor/HtmlEditor";
import {
  CodeEditorType,
  libEditorType,
  programingLanguageTypes,
} from "@/app/all.types";
import DisabledCodeEditor from "./CodeEditor/CodeEditor";
import DisableHtmlEditor from "./CodeEditor/HtmlEditor";
import FetchCodeEditor from "./CodeEditor/CodeEditor";
import FetchHtmlEditor from "./CodeEditor/HtmlEditor";
const SummaryDetail = (props: any) => {
  // console.log("props", props);
  const [programingLanguage, setProgramingLanguage] = useState<
    programingLanguageTypes[]
  >([]);
  const [LibOrFramework, setLibOrFramework] = useState<
    programingLanguageTypes[]
  >([]);

  const { individualSubjectDataList } = props;
  const [htmlCode, setHtmlCode] = useState<libEditorType[]>([
    { code: "", language: "", result: "", title: "" },
  ]);

  const [codeEditors, setCodeEditors] = useState<CodeEditorType[]>([]);

  const [languageSelected, setLanguageSelected] = useState("");
  const [code, setCode] = useState("");
  useEffect(() => {
    console.log(
      "individualSubjectDataList",
      individualSubjectDataList.LibOrFramework,
      individualSubjectDataList.programingLanguage
    );

    setHtmlCode(
      individualSubjectDataList && individualSubjectDataList.LibOrFramework
    );
    setCodeEditors(
      individualSubjectDataList && individualSubjectDataList.programingLanguage
    );
  }, [individualSubjectDataList]);
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-none overflow-y-hidden"
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

            <FetchCodeEditor
              setProgramingLanguage={setProgramingLanguage}
              programingLanguage={programingLanguage}
              individualSubjectDataList={individualSubjectDataList}
            />

            <FetchHtmlEditor
              setLibOrFramework={setLibOrFramework}
              LibOrFramework={LibOrFramework}
              individualSubjectDataList={individualSubjectDataList}
            />
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default SummaryDetail;
