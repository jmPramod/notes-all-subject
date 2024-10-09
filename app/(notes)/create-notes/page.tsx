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

const formSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
  answer: z.object({
    ans: z.string().min(1, {
      message: "At least one answer is required.",
    }),
    format: z.string().optional(),
  }),
});

const page = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      question: "",
      answer: { ans: "", format: "p" },
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);

    const result = await createQuestions(data);
    console.log("send", result);
    if (result?.status === 200) {
      toast({
        title: result?.message,
      });
    }

    // Handle form submission, e.g., send data to an API
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[80%] m-auto p-5 flex flex-col gap-9"
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

          <FormField
            control={form.control}
            name="answer.ans"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answers</FormLabel>
                <FormControl>
                  {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an answer" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="answer1">Answer 1</SelectItem>
                    <SelectItem value="answer2">Answer 2</SelectItem>
                    <SelectItem value="answer3">Answer 3</SelectItem>
                  </SelectContent>
                </Select> */}
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
              <FormItem>
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default page;
