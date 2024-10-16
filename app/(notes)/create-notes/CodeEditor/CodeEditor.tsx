import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { Language } from "./Language";
import Output from "./Output";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language_version } from "@/app/utils/Api.services";
import { Input } from "@/components/ui/input";

interface CodeSnippet {
  language: string;
  code: string;
  title: string;
  result: string;
}

interface PropsType {
  setProgramingLanguage: React.Dispatch<React.SetStateAction<CodeSnippet[]>>;
  programingLanguage: CodeSnippet[];
}

export default function CreateCodeEditor(props: PropsType) {
  const editorRef = useRef();
  const { setProgramingLanguage, programingLanguage } = props;
  const mountFn = (editor: any) => {
    editorRef.current = editor;
    // editor.focus();
  };

  const [languageSelected, setLanguageSelected] = useState("");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(""); // New state for result

  const languageEntries = Object.entries(Language_version);

  const handleCodeClick = (index: number) => {
    const snippet = programingLanguage[index];
    setLanguageSelected(snippet.language);
    setCode(snippet.code);
    setTitle(snippet.title);
    setResult(snippet.result); // Set result when editing a snippet
  };

  const handleDeleteClick = (index: number) => {
    const updatedSnippets = programingLanguage.filter((_, i) => i !== index);
    setProgramingLanguage(updatedSnippets);
  };

  const handleAddAllCode = () => {
    if (languageSelected && code && title && result) {
      const newSnippet: CodeSnippet = {
        language: languageSelected,
        code: code,
        title: title,
        result: result, // Include result in the new snippet
      };

      setProgramingLanguage([...programingLanguage, newSnippet]);
      setCode("");
      setTitle("");
      setResult(""); // Clear result after adding
      setLanguageSelected("");
    }
  };

  useEffect(() => {
    console.log("1111", programingLanguage);
  }, [programingLanguage]);
  return (
    <>
      <div>
        <u className="text-center flex items-center justify-center w-full text-2xl p-2">
          Enter the Programming Code
        </u>
        <div className="flex gap-3">
          {programingLanguage.map((snippet, i) => (
            <div className="border p-2 m-1 cursor-pointer flex gap-2" key={i}>
              <div onClick={() => handleCodeClick(i)}>{`Code ${i + 1}`}</div>
              <div onClick={() => handleDeleteClick(i)}>✖</div>
            </div>
          ))}
        </div>
        <div className="flex md:flex-row flex-col">
          <div className="md:flex flex-col md:w-1/2 w-full bg-[#1E1E1E] mx-3 ">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="p-2 m-2 bg-white border"
            />
            <Select
              value={languageSelected}
              onValueChange={setLanguageSelected}
            >
              <SelectTrigger className="flex w-1/2 m-3 bg-gray-400">
                <SelectValue placeholder="Select a Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Language</SelectLabel>
                  {languageEntries.map(([language, version], i) => (
                    <SelectItem
                      value={language}
                      key={i}
                      className="flex flex-row w-full"
                    >
                      <div className="flex items-center">
                        {language}
                        &nbsp;(<sub>{version}</sub>)
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Editor
              height="40vh"
              width={"100%"}
              language={languageSelected}
              theme="vs-dark"
              value={code}
              onMount={mountFn}
              onChange={(value) => {
                setCode(value || "");
              }}
            />
          </div>
          <Output editorRef={editorRef} languageSelected={languageSelected} />
        </div>
        <Input
          type="text"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder="Enter result"
          className="m-3 p-2"
        />
      </div>

      <Button type="button" onClick={handleAddAllCode}>
        Add Code
      </Button>
    </>
  );
}
