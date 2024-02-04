"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TextInput from "../text-input";
import FileInput from "../file-input";
export function TranslatorMain() {
  return (
    <>
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="w-full flex justify-center">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="file">file</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <TextInput />
        </TabsContent>
        <TabsContent value="file">
          <FileInput />
        </TabsContent>
      </Tabs>
    </>
  );
}
