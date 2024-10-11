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
  fetchSingleSubject,
  fetchSubjectCategory,
  updateQuestions,
} from "@/app/utils/Api.services";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import TableDynamic from "../TableDynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  serialNumber: z.object({
    subject: z.string().optional(),
    SlNumber: z.string().optional(),
  }),
});
interface subjType {
  answer: { ans: string[]; format: string };
  ansQuery: { ans: string[]; format?: string };
  table: { heading: string[]; body: string[][] };
  serialNumber: { subject: string; SlNumber: number };
  subject: string;
  question: string;
  favorite: boolean;
  questionNumber: number;
  links: string[];
  important: string;
  screenshort: string[];
}
const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<subjType>();
  const [listCategory, setListCategory] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddingNewSubject, setIsAddingNewSubject] = useState(false);
  let form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: fetchedData?.subject && fetchedData?.subject,
      question: fetchedData?.question && fetchedData?.question,
      answer: {
        ans: fetchedData?.answer.ans && fetchedData?.answer.ans,
        format: fetchedData?.answer.format || "p",
      },
      ansQuery: {
        ans: fetchedData?.ansQuery.ans,
        format: fetchedData?.ansQuery.format || "p",
      },
      serialNumber: {
        subject: fetchedData?.serialNumber?.subject,
        SlNumber: fetchedData?.serialNumber?.SlNumber,
      },
    },
  });

  const [tableInfo, setTableInfo] = useState<TableInfo>({
    heading: fetchedData?.table.heading || [],
    body: fetchedData?.table.body || [[]],
  });
  const [link, setLink] = useState<string[]>([]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    data = { ...data, table: tableInfo, link: link };

    const result = await updateQuestions(data, params.id);

    if (result?.status === 200) {
      toast({
        title: result?.message,
      });
    }
    setLoading(false);
    router.push("/fetch-notes");
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
    const fetchsingleSub = async () => {
      const res = await fetchSingleSubject(params.id);
      setFetchedData(res.data);
      setTableInfo(res.data.table);
      form.reset({
        subject: res.data.subject,
        question: res.data.question,
        answer: {
          ans: res.data.answer.ans[0],
          format: res.data.answer.format || "p",
        },
        ansQuery: {
          ans: res.data.ansQuery.ans,
          format: res.data.ansQuery.format || "p",
        },
        serialNumber: {
          subject: res.data?.serialNumber?.subject,
          SlNumber: res.data?.serialNumber?.SlNumber,
        },
      });
    };
    fetchData();
    fetchsingleSub();
  }, []);

  return (
    <div className="w-[80%] m-auto p-5 flex flex-col gap-9">
      <h1 className="text-2xl font-bold">Create Notes</h1>

      {fetchedData && (
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
                    {!isAddingNewSubject ? (
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
                          onClick={() => setIsAddingNewSubject(true)}
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
                            setIsAddingNewSubject(false);
                            field.onChange(value);
                          } else {
                            field.onChange(""); // Clear value to allow new input
                          }
                        }}
                        defaultValue={
                          fetchedData?.subject && fetchedData?.subject
                        }
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
                          <SelectItem value="new">Change Subject</SelectItem>
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
                      <Select onValueChange={field.onChange}>
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
                      <Select onValueChange={field.onChange}>
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
                name="serialNumber.subject"
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
                name="serialNumber.SlNumber"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Format</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Answer" {...field} />
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
            <Button type="submit">
              {loading ? "Submitting...." : "Submit"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Page;
