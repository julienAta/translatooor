import React, { useCallback } from "react";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
function TextInput() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("auto");
  const [outputLanguage, setOutputLanguage] = useState("en");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // Debounce function in TypeScript
  const debounce = <F extends (...args: any[]) => void>(
    func: F,
    waitFor: number
  ): ((...args: Parameters<F>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>) => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), waitFor);
    };
  };
  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) return; // Avoid empty queries

    const payload = JSON.stringify({
      q: inputText,
      source: inputLanguage,
      target: outputLanguage,
      format: "text",
      api_key: "", // Placeholder for actual API key
    });

    try {
      const response = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      if (!response.ok) throw new Error("Translation failed");

      const data = await response.json();
      setOutputText(data.translatedText);
    } catch (error) {
      console.error(error);
    }
  }, [inputText, inputLanguage, outputLanguage]);

  // Use useCallback to memorize the debounced version of handleTranslate
  const debouncedHandleTranslate = useCallback(debounce(handleTranslate, 500), [
    handleTranslate,
  ]);

  useEffect(() => {
    if (inputText && inputLanguage && outputLanguage) {
      debouncedHandleTranslate();
    }
  }, [inputText, inputLanguage, outputLanguage, debouncedHandleTranslate]);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-bold"></h1>
        <Button variant="outline">
          <GlobeIcon className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 md:flex-row md:gap-8 md:p-6">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Textarea
              className="min-h-[500px]"
              id="input"
              placeholder="Enter text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              defaultValue="auto"
              onValueChange={(e: any) => {
                setInputLanguage(e);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleTranslate}>
              Translate
            </Button>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="output">Output</Label>
            <Textarea
              className="min-h-[500px]"
              id="output"
              placeholder="Translated text"
              value={outputText}
              readOnly
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              defaultValue="en"
              onValueChange={(e: any) => setOutputLanguage(e)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => navigator.clipboard.writeText(outputText)}
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextInput;
function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
