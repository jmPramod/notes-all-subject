import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
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
}

const EditHtmlEditor = (props: PropsType) => {
  const { LibOrFramework, setLibOrFramework } = props;

  const [htmlCode, setHtmlCode] = useState<CodeSnippet[]>(LibOrFramework);

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

  return (
    <div>
      <h1 className="text-center text-2xl p-3">LIB/Framework Code</h1>

      <Button type="button" onClick={handleAddSnippet}>
        Add Editor
      </Button>

      {htmlCode.map((val, index) => (
        <div key={index} className="my-5 flex w-full">
          {index + 1})
          <div className="flex items-center justify-between w-full gap-8 px-3">
            <div className="w-1/2 flex flex-col gap-3">
              <Input
                placeholder="Please enter language"
                value={val.language}
                onChange={(e) => handleLanguageChange(index, e.target.value)}
              />
              <Input
                placeholder="Title"
                value={val.title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
              />
              <Input
                placeholder="Result"
                value={val.result}
                onChange={(e) => handleResultChange(index, e.target.value)}
              />
              <div className="flex gap-3">
                <Button type="button" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-3 justify-start">
              <LiveProvider code={val.code}>
                <div className="flex flex-col gap-3">
                  <LiveEditor
                    className="font-mono"
                    onChange={(newCode) => handleCodeChange(index, newCode)}
                  />
                </div>
                <LivePreview />
              </LiveProvider>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditHtmlEditor;
