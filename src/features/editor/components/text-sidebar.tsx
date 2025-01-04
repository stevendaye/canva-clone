import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ActiveTool, Editor } from "../types";

import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { Button } from "@/components/ui/button";

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TextSidebar: React.FC<TextSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full relative border-r z-[40] w-[360px] bg-white",
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Text Insertion"
        description="Insert text to your elements"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button className="w-full" onClick={() => editor?.insertText("Text")}>
            Add a textbox
          </Button>
          <Button
            className="w-full h-12"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.insertText("Heading", {
                fontSize: 80,
                fontWeight: 700,
              })
            }
          >
            <span className="text-3xl font-bold"> Add a heading </span>
          </Button>
          <Button
            className="w-full h-12"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.insertText("Subheading", {
                fontSize: 44,
                fontWeight: 500,
              })
            }
          >
            <span className="text-xl font-semibold"> Add a subheading </span>
          </Button>
          <Button
            className="w-full h-12"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.insertText("Paragraph", {
                fontSize: 32,
              })
            }
          >
            <span className="text-[16px] font-normal"> Paragraph </span>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
