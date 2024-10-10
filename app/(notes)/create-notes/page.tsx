"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { createQuestions } from "@/app/utils/Api.services";
import { Textarea } from "@/components/ui/textarea";
import { ToastNotification } from "@/components/ToastMessage/ToastNotification";
import { useToast } from "@/hooks/use-toast";
import TableDynamic from "./TableDynamic";
import { useState } from "react";

interface TableInfo {
  heading: string[];
  body: string[][];
}
const formSchema = z.object({
  subject: z.string().optional(),
  question: z.string().optional(),
  answer: z.object({
    ans: z.string().optional(),
    format: z.string().optional(),
  }),
});

const page = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      question: "",
      answer: { ans: "", format: "p" },
      ansQuery: { ans: "", format: "p" },
      // favorite: false,
      // questionNumber: 0,
      // links: [],
      // important: "white",
      // screenshort:""
    },
  });
  const [tableInfo, setTableInfo] = useState<TableInfo>({
    heading: [],
    body: [[]],
  });
  const [link, setLink] = useState<string[]>([]);
  const onSubmit = async (data: any) => {
    setLoading(true);
    data = { ...data, table: tableInfo, link: link };
    console.log("Form submitted:", data);

    const result = await createQuestions(data);
    console.log("send", result);
    if (result?.status === 200) {
      toast({
        title: result?.message,
      });
    }
    form.reset();
    setLoading(false);
  };

  return (
    <div className="w-[80%] m-auto p-5 flex flex-col gap-9">
      <h1 className="text-2xl font-bold">Create Notes </h1>

      <TableDynamic
        tableInfo={tableInfo}
        setTableInfo={setTableInfo}
        setLink={setLink}
        link={link}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="   flex flex-col gap-9"
        >
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subject" {...field} />
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
          <Button type="submit">{loading ? "Submitting...." : "Submit"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default page;
