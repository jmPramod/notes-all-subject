import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { LiveEditor, LiveProvider, LivePreview } from "react-live";

type PropsType = {
  setHtmlCode: React.Dispatch<
    React.SetStateAction<
      { code: string; language: string; result: string; title: string }[]
    >
  >;
  htmlCode: { code: string; language: string; result: string; title: string }[];
};

const HtmlEditor = (props: PropsType) => {
  const { htmlCode, setHtmlCode } = props;

  useEffect(() => {
    console.log("code", htmlCode);
  }, [htmlCode]);

  const handleEditor = () => {
    setHtmlCode([
      ...htmlCode,
      { code: "", language: "", result: "", title: "" },
    ]);
  };

  const handleCodeChange = (index: number, newCode: string) => {
    const updatedHtmlCode = htmlCode.map((val, i) =>
      i === index ? { ...val, code: newCode } : val
    );
    setHtmlCode(updatedHtmlCode);
  };

  const handleLanguageChange = (index: number, newLanguage: string) => {
    const updatedHtmlCode = htmlCode.map((val, i) =>
      i === index ? { ...val, language: newLanguage } : val
    );
    setHtmlCode(updatedHtmlCode);
  };

  const handleResultChange = (index: number, newResult: string) => {
    const updatedHtmlCode = htmlCode.map((val, i) =>
      i === index ? { ...val, result: newResult } : val
    );
    setHtmlCode(updatedHtmlCode);
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    const updatedHtmlCode = htmlCode.map((val, i) =>
      i === index ? { ...val, title: newTitle } : val
    );
    setHtmlCode(updatedHtmlCode);
  };

  const handleDelete = (index: number) => {
    const updatedHtmlCode = htmlCode.filter((_, i) => i !== index);
    setHtmlCode(updatedHtmlCode);
  };

  return (
    <div>
      <h1 className="text-center text-2xl p-3">LIB/Framework Code</h1>

      <Button type="button" onClick={handleEditor}>
        Add Editor
      </Button>

      {htmlCode &&
        htmlCode.map((val, index) => (
          <div key={index} className="my-5 flex w-full">
            {index + 1}
            {")"}
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

export default HtmlEditor;
