import { Editor, filters } from "@/types"
import ToolSidebarHeader from "./ToolSidebarHeader"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FilterSidebardProps {
  editor: Editor | undefined
}

const FilterSidebard = ({ editor }: FilterSidebardProps) => {
  return (
    <>
      <ToolSidebarHeader
        title="Filters"
        description="Adjust the filter of the selected object"
      />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b h-[calc(100vh-140px)]">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="lg"
              className="w-full h-16 justify-start text-left"
              onClick={() => editor?.changeImageFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}

export default FilterSidebard