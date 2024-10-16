import { Editor } from "@monaco-editor/react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Language } from "./Language";
import Output from "./Output";
import { LiveProvider, LiveEditor, LivePreview } from "react-live";
import { Button } from "@/components/ui/button";
import HtmlEditor from "./HtmlEditor";

interface PropsType {
  setCode: React.Dispatch<React.SetStateAction<string>>;
  code: string;
  setLanguageSelected: React.Dispatch<React.SetStateAction<string>>;
  languageSelected: string;
  codeEditors: {
    language: string;
    code: string;
  }[];
  setCodeEditors: Dispatch<
    SetStateAction<
      {
        language: string;
        code: string;
      }[]
    >
  >;
}

export default function CodeEditor(props: PropsType) {
  const editorRef = useRef();
  const {
    code,
    setCode,
    languageSelected,
    setLanguageSelected,
    codeEditors,
    setCodeEditors,
  } = props;
  console.log("props", props);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const mountFn = (editor: any) => {
    editorRef.current = editor;
    // editor.focus();
  };

  useEffect(() => {
    console.log("languageSelected", languageSelected);
  }, [languageSelected]);

  const handleAddAllCode = () => {
    if (languageSelected === "" || code === "") {
      return console.log("empty");
    }
    if (selectedIndex !== null) {
      const updatedCodeEditors = [...codeEditors];
      updatedCodeEditors[selectedIndex] = {
        language: languageSelected,
        code: code,
      };
      setCodeEditors(updatedCodeEditors);
      setLanguageSelected("");
      setCode("");
      setSelectedIndex(null);
    } else {
      const filteredCodeEditors = codeEditors.filter(
        (editor) => editor.language !== "" || editor.code !== ""
      );

      setCodeEditors([
        ...filteredCodeEditors,
        { language: languageSelected, code: code },
      ]);
      setLanguageSelected("");
      setCode("");
    }
  };

  const handleCodeClick = (index: number) => {
    const selectedEditor = codeEditors[index];
    if (selectedEditor) {
      setLanguageSelected(selectedEditor.language);
      setCode(selectedEditor.code);
      setSelectedIndex(index);
    }
  };

  const handleDeleteClick = (index: number) => {
    const updatedCodeEditors = codeEditors.filter((_, i) => i !== index);
    setCodeEditors(updatedCodeEditors);

    // Reset selected index if the deleted editor was selected
    if (selectedIndex === index) {
      setSelectedIndex(null);
      setLanguageSelected("");
      setCode("");
    }
  };

  useEffect(() => {
    console.log("codeEditors", codeEditors);
  }, [codeEditors]);

  return (
    <>
      <div>
        <u className="text-center flex items-center justify-center w-full text-2xl p-2">
          Enter the JS/ts/py/java/#c/php Code
        </u>
        <div className="flex gap-3">
          {codeEditors?.map((v, i: number) => (
            <div className="border p-2 m-1 cursor-pointer flex gap-2" key={i}>
              <div onClick={() => handleCodeClick(i)}>
                {i + 1}
                {i > 0 ? "'nd" : "'st"} code
              </div>
              <div onClick={() => handleDeleteClick(i)}>✖</div>
            </div>
          ))}
        </div>
        <div className="flex md:flex-row flex-col">
          <div className="md:flex flex-col md:w-1/2 w-full bg-[#1E1E1E]">
            <Language
              languageSelected={languageSelected}
              setLanguageSelected={setLanguageSelected}
            />

            <Editor
              height="40vh"
              width={"100%"}
              language={languageSelected}
              theme="vs-dark"
              value={code}
              onMount={mountFn}
              onChange={(value, event) => {
                setCode(value as string);
              }}
            />
          </div>
          <Output editorRef={editorRef} languageSelected={languageSelected} />
        </div>
        <div className="w-full my-3 border"></div>
      </div>
      <Button type="button" onClick={handleAddAllCode}>
        {selectedIndex !== null ? "Update Code" : "Add Code"}
      </Button>
    </>
  );
}
