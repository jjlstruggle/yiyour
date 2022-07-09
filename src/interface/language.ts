import { Dispatch, SetStateAction } from "react";

export interface Language {
  language: "zh" | "en";
  setLanguage: Dispatch<SetStateAction<"zh" | "en">>;
}
