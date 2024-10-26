import { Editor, STROKE_COLOR } from '@/types';
import ToolSidebarHeader from './ToolSidebarHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import ColorPicker from '../feature/ColorPicker';

interface StrokeSidebarProps {
  editor: Editor | undefined;
}

const StrokeSidebar = ({ editor }: StrokeSidebarProps) => {
  const value = editor?.getActiveStrokeColor() || STROKE_COLOR;

  const onChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  return (
    <div>
      <ToolSidebarHeader
        title="Stroke"
        description="Change the stroke color of the selected object"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>
    </div>
  )
}

export default StrokeSidebar