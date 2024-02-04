import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
export function FileUpload() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [processedFileName, setProcessedFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputLanguage, setInputLanguage] = useState("fr");
  const [outputLanguage, setOutputLanguage] = useState("en");
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      setProcessedFileName(""); // Reset processed file name on new file upload
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("source", inputLanguage);
    formData.append("target", outputLanguage);
    formData.append("api_key", "YOUR_ACTUAL_API_KEY");
    try {
      const response = await fetch(`${API_URL}/translate_file`, {
        method: "POST",

        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        console.log("File upload successful:", result.translatedFileUrl);

        // Assuming the API response includes the processed file name or URL
        setProcessedFileName(result.translatedFileUrl);
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsProcessing(false); // Re-enable download button after processing
    }
  };

  const downloadProcessedFile = () => {
    if (!processedFileName) return;
    // Example URL - replace with your actual file URL
    const fileUrl = processedFileName;

    // Creating an anchor element to programmatically click for download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", processedFileName); // Optional: forces download with a specific filename
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <Label className="text-lg font-medium" htmlFor="file-upload">
          Upload File
        </Label>
        <Input
          className="w-full"
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex items-center gap-2">
        Input
        <Select
          defaultValue="fr"
          onValueChange={(e: any) => {
            setInputLanguage(e);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr">French</SelectItem>

            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        Output
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
      </div>
      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-500">
          File uploaded:{" "}
          <span className="font-medium">{fileName || "No file uploaded"}</span>
        </p>
        <Button className="w-full" variant="outline" onClick={handleUpload}>
          Process File
        </Button>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-500">
          File processed:{" "}
          <span className="font-medium">
            {processedFileName || "No file processed"}
          </span>
        </p>
        <Button
          className="w-full"
          disabled={!processedFileName || isProcessing}
          variant="outline"
          onClick={downloadProcessedFile}
        >
          Download Processed File
        </Button>
      </div>
    </div>
  );
}
