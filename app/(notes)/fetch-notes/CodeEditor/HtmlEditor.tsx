import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { LiveEditor, LiveProvider, LivePreview } from "react-live";

interface CodeSnippet {
  language: string;
  code: string;
  title: string;
  result: string;
}

interface PropsType {
  setLibOrFramework: React.Dispatch<React.SetStateAction<CodeSnippet[]>>;
  LibOrFramework: CodeSnippet[];
  individualSubjectDataList: any;
}

const FetchHtmlEditor = (props: PropsType) => {
  const { LibOrFramework, setLibOrFramework, individualSubjectDataList } =
    props;

  // Initialize htmlCode based on individualSubjectDataList if it exists
  const [htmlCode, setHtmlCode] = useState<CodeSnippet[]>(() => {
    return individualSubjectDataList?.LibOrFramework || LibOrFramework;
  });

  const handleAddSnippet = () => {
    const newSnippet: CodeSnippet = {
      language: "",
      code: "",
      title: "",
      result: "",
    };
    setHtmlCode((prev) => [...prev, newSnippet]);
    setLibOrFramework((prev) => [...prev, newSnippet]);
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newCode = [...htmlCode];
    newCode[index].language = value;
    setHtmlCode(newCode);
    setLibOrFramework(newCode);
  };

  const handleTitleChange = (index: number, value: string) => {
    const newCode = [...htmlCode];
    newCode[index].title = value;
    setHtmlCode(newCode);
    setLibOrFramework(newCode);
  };

  const handleResultChange = (index: number, value: string) => {
    const newCode = [...htmlCode];
    newCode[index].result = value;
    setHtmlCode(newCode);
    setLibOrFramework(newCode);
  };

  const handleCodeChange = (index: number, newCode: string) => {
    const updatedCode = [...htmlCode];
    updatedCode[index].code = newCode;
    setHtmlCode(updatedCode);
    setLibOrFramework(updatedCode);
  };

  const handleDelete = (index: number) => {
    const newCode = htmlCode.filter((_, i) => i !== index);
    setHtmlCode(newCode);
    setLibOrFramework(newCode);
  };

  useEffect(() => {
    if (individualSubjectDataList?.LibOrFramework) {
      setHtmlCode(individualSubjectDataList.LibOrFramework);
      setLibOrFramework(individualSubjectDataList.LibOrFramework);
    }
  }, [individualSubjectDataList, setLibOrFramework]);

  return (
    <div>
      {htmlCode.length > 0 && (
        <h1 className="text-center text-2xl p-3">LIB/Framework Code</h1>
      )}

      <div className="my-5 flex flex-wrap">
        {htmlCode.map((val, index) => (
          <div key={index} className="flex w-1/2 p-2">
            <div className=" w-full">
              {index + 1})
              <div className="flex items-center justify-between w-full gap-8">
                <div className="flex flex-col gap-3 justify-start w-full">
                  <Input
                    disabled
                    placeholder="Please enter language"
                    value={val.language}
                    onChange={(e) =>
                      handleLanguageChange(index, e.target.value)
                    }
                  />
                  <Input
                    disabled
                    placeholder="Title"
                    value={val.title}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                  />
                  {/* <Input
                    disabled
                    placeholder="Result"
                    value={val.result}
                    onChange={(e) => handleResultChange(index, e.target.value)}
                  /> */}
                  {val.result && (
                    <div>
                      <b>Result:</b>
                      {val.result}
                    </div>
                  )}
                  <LiveProvider code={val.code}>
                    <div className="flex flex-col gap-3">
                      <LiveEditor
                        className="font-mono"
                        key={val.code}
                        onChange={(newCode) => handleCodeChange(index, newCode)}
                      />
                    </div>
                    <LivePreview />
                  </LiveProvider>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchHtmlEditor;
