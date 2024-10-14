"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createQuestions,
  fetchSubjectCategory,
} from "@/app/utils/Api.services";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import TableDynamic from "./TableDynamic";
import { useEffect, useState } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import HtmlEditor from "../CodeEditor/HtmlEditor";

interface TableInfo {
  heading: string[];
  body: string[][];
}

const formSchema = z.object({
  subject: z.string().nonempty({ message: "Subject is mandatory." }),
  question: z.string().nonempty({ message: "Question is mandatory." }),
  answer: z.object({
    ans: z.string().optional(),
    format: z.string().optional(),
  }),
});
interface CodeEditorType {
  language: string;
  code: string;
}
interface libEditorType {
  language: string;
  code: string;
  result: string;
  title: string;
}

const Page = () => {
  const { toast } = useToast();
  const [htmlCode, setHtmlCode] = useState<libEditorType[]>([
    { code: "", language: "", result: "", title: "" },
  ]);
  const [languageSelected, setLanguageSelected] = useState("");
  const [codeEditors, setCodeEditors] = useState<CodeEditorType[]>([]);
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddingNewSubject, setIsAddingNewSubject] = useState(false);
  const [code, setCode] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      question: "",
      answer: { ans: "", format: "p" },
      ansQuery: { ans: "", format: "p" },
    },
  });

  const [tableInfo, setTableInfo] = useState<TableInfo>({
    heading: [],
    body: [[]],
  });
  // const [programingLanguage, setProgramingLanguage] = useState<any>([
  //   { language: languageSelected },
  //   { code: code },
  // ]);
  const [link, setLink] = useState<string[]>([]);

  const onSubmit = async (data: any) => {
    setLoading(true);

    data = {
      ...data,
      table: tableInfo,
      link: link,
      programingLanguage: codeEditors,
      LibOrFramework: htmlCode,
    };
    console.log("data", data);

    const result = await createQuestions(data);

    if (result?.status === 200) {
      toast({
        title: result?.message,
      });
    }
    form.reset();
    setTableInfo({ heading: [], body: [[]] });
    setLink([]);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      let e = await fetchSubjectCategory();

      if (e?.status === 200) {
        setListCategory(e?.data);
      } else {
        setErrorMessage(e.message || "Fetching data failed. Please try again.");
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("htmlCode", htmlCode);
  }, [htmlCode]);
  return (
    <div className="w-[80%] m-auto p-5 flex flex-col gap-9">
      <h1 className="text-2xl font-bold">Create Notes</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9"
        >
          {/* Subject Field */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  {isAddingNewSubject ? (
                    <div className="flex items-center">
                      <Input
                        placeholder="Enter new subject"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => setIsAddingNewSubject(false)}
                        className="ml-2"
                        variant="outline"
                      >
                        ✖
                      </Button>
                    </div>
                  ) : (
                    <Select
                      onValueChange={(value) => {
                        if (value === "new") {
                          setIsAddingNewSubject(true);
                          field.onChange(""); // Clear value to allow new input
                        } else {
                          field.onChange(value);
                        }
                      }}
                      defaultValue={field.value || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {listCategory?.map((category, index) => (
                          <SelectItem key={index} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                        <SelectItem value="new">Add New Subject</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your question" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full gap-3">
            <FormField
              control={form.control}
              name="answer.ans"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Answers</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your Answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="answer.format"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Format</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || "p"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="li">List</SelectItem>
                        <SelectItem value="p">Paragraph</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full gap-3">
            <FormField
              control={form.control}
              name="ansQuery.ans"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Query</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your Answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ansQuery.format"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Format</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || "p"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="li">List</SelectItem>
                        <SelectItem value="p">Paragraph</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <TableDynamic
            tableInfo={tableInfo}
            setTableInfo={setTableInfo}
            setLink={setLink}
            link={link}
          />

          <CodeEditor
            setLanguageSelected={setLanguageSelected}
            languageSelected={languageSelected}
            code={code}
            setCode={setCode}
            setCodeEditors={setCodeEditors}
            codeEditors={codeEditors}
          />
          <HtmlEditor setHtmlCode={setHtmlCode} htmlCode={htmlCode} />

          <Button type="submit">{loading ? "Submitting...." : "Submit"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
