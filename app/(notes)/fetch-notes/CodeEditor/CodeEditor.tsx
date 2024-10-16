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
  individualSubjectDataList: any;
}

export default function FetchCodeEditor(props: PropsType) {
  const editorRef = useRef();
  const {
    setProgramingLanguage,
    programingLanguage,
    individualSubjectDataList,
  } = props;

  const mountFn = (editor: any) => {
    editorRef.current = editor;
  };

  const [languageSelected, setLanguageSelected] = useState("");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");

  const languageEntries = Object.entries(Language_version);

  const handleCodeClick = (index: number) => {
    const snippet = programingLanguage[index];
    setLanguageSelected(snippet.language);
    setCode(snippet.code);
    setTitle(snippet.title);
    setResult(snippet.result);
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
        result: result,
      };

      setProgramingLanguage([...programingLanguage, newSnippet]);
      setCode("");
      setTitle("");
      setResult("");
      setLanguageSelected("");
    }
  };

  useEffect(() => {
    setProgramingLanguage(individualSubjectDataList?.programingLanguage);
  }, [individualSubjectDataList]);

  return (
    <>
      {programingLanguage.length > 0 && (
        <div>
          <u className="text-center flex items-center justify-center w-full text-2xl p-2">
            Enter the Programming Code
          </u>
          <div className="flex gap-3">
            {programingLanguage
              .filter((snippet) => snippet.title && snippet.code)
              .map((snippet, i) => (
                <div
                  className="border-2 border-black p-2 m-1 cursor-pointer flex gap-2 hover:bg-black hover:text-white"
                  key={i}
                >
                  <div
                    onClick={() => handleCodeClick(i)}
                  >{`${snippet.title}`}</div>
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
                          {language} <sub>({version})</sub>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Editor
                className="min-h-[20vh]"
                width={"100%"}
                language={languageSelected}
                theme="vs-dark"
                value={code}
                onMount={mountFn}
                onChange={(value) => setCode(value || "")}
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
          {/* <Button type="button" onClick={handleAddAllCode}>
          Add Code
        </Button> */}
        </div>
      )}
    </>
  );
}
