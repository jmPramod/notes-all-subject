import { editorApi } from "@/app/utils/Api.services";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import React, { MutableRefObject, useState } from "react";
interface PropsType {
  editorRef: any;
  languageSelected: string;
}
const Output = (props: PropsType) => {
  const { editorRef, languageSelected } = props;
  const [outputRes, setOutputRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const runCode = async () => {
    setLoading(true);
    if (languageSelected === "") {
      setLoading(false);
      return toast({
        title: "Please select Language",
      });
    }
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    const res = await editorApi(languageSelected, sourceCode);
    const { run } = res;
    const { stdout, stderr, code, signal, output } = run;
    if (stderr) {
      toast({
        title: "Error in Executing Code",
        description: stderr,
      });
    }
    setOutputRes(output);
    try {
    } catch (error) {}
    setLoading(false);
  };
  return (
    <div className="  md:w-1/2 w-full border  mx-3 p-2 text-center ">
      <Button onClick={() => runCode()} variant={"success"}>
        {loading ? "Executing...." : "Run"}{" "}
      </Button>
      <hr className="my-3" />
      <div className="">
        {outputRes ? outputRes : "Click on 'Run' to get output "}
      </div>
    </div>
  );
};

export default Output;
