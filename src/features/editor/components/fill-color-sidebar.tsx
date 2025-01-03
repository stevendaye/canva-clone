import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

import { ActiveTool, Editor, FILL_COLOR } from "../types";

import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FillColorSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const ColorPicker = dynamic(
  () => import("./color-picker").then((mod) => mod.ColorPicker),
  { ssr: false }
);

export const FillColorSidebar: React.FC<FillColorSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const value = editor?.getActiveFillColor() ?? FILL_COLOR;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full relative border-r z-[40] w-[360px] bg-white",
        activeTool === "fill" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Fill Color"
        description="Add fill color to your elements"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
