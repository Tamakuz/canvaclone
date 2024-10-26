import { HintButton } from '@/components/HintButton';
import { Button } from '@/components/ui/button';
import { Editor } from '@/types';
import { Minimize, ZoomIn, ZoomOut } from 'lucide-react';

interface FooterEditorProps {
  editor: Editor | undefined
}

const FooterEditor = ({ editor }: FooterEditorProps) => {
  return (
    <footer className="h-[60px] bg-background border-t flex items-center justify-end p-2 gap-x-1 shrink-0 px-4">
      <HintButton label="Zoom in" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomIn()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomIn className="size-4" />
        </Button>
      </HintButton>
      <HintButton label="Zoom out" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomOut()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomOut className="size-4" />
        </Button>
      </HintButton>
      <HintButton label="Reset" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.autoZoom()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <Minimize className="size-4" />
        </Button>
      </HintButton>
    </footer>
  );
};

export default FooterEditor