import * as React from "react";
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

interface PropsType {
  languageSelected: string;
  setLanguageSelected: React.Dispatch<React.SetStateAction<string>>;
}

export function Language({ languageSelected, setLanguageSelected }: PropsType) {
  const languageEntries = Object.entries(Language_version);

  return (
    <Select value={languageSelected} onValueChange={setLanguageSelected}>
      <SelectTrigger className="flex w-1/2 m-3 bg-gray-400">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Language</SelectLabel>
          {languageEntries.map(
            ([language, version]: [string, string], i: number) => (
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
            )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
