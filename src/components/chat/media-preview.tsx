import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type MediaPreviewProps = {
  file: {
    file: File;
    preview: string | null;
    type: string;
    name: string;
  };
  onCancel: () => void;
};

export function MediaPreview({ file, onCancel }: MediaPreviewProps) {
  return (
    <div className="relative inline-block">
      <div className="bg-secondary rounded-md p-2 flex items-center max-w-xs">
        {file.type === "image" && file.preview ? (
          <div className="relative">
            <img
              src={file.preview}
              alt={file.name}
              className="max-h-32 rounded-md"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 rounded-md p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate max-w-[180px]">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round(file.file.size / 1024)} KB
              </p>
            </div>
          </div>
        )}
        
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-6 w-6 ml-2"
          onClick={onCancel}
        >
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}