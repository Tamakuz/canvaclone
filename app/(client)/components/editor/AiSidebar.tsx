"use client";
  
import { Editor } from "@/types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertCircle } from "lucide-react";
import { client } from "../../utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AiSidebarProps {
  editor: Editor | undefined;
}

const AiSidebar = ({ editor }: AiSidebarProps) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.api.ai["generate-image"].$post({
        json: { prompt: value },
      });
      const {data} = await response.json();
      editor?.addImage(data);
    } catch (error) {
      console.error("Failed to generate image:", error);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToolSidebarHeader title="AI" description="Generate images with AI" />
      <form onSubmit={onSubmit} className="p-4 space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Textarea
          placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
          cols={30}
          rows={10}
          required
          minLength={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </form>
    </>
  );
};

export default AiSidebar;