import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ActiveTool, Editor, fonts } from "../types";

import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { Button } from "@/components/ui/button";

interface FontSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FontSidebar: React.FC<FontSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const value = editor?.getActiveFontFamily();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full relative border-r z-[40] w-[360px] bg-white",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Fonts" description="Change your texts' fonts" />
      <ScrollArea>
        <div className="p-4 space-y-2">
          {fonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "w-full h-12 justify-start text-left",
                value === font && "border-2 border-sky-600"
              )}
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "8px 12px",
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
