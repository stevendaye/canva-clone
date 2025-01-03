import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

import { ActiveTool, Editor } from "../types";

import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { useEffect, useMemo, useState } from "react";

interface OpacitySidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar: React.FC<OpacitySidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const initialvalue = editor?.getActiveOpacity() ?? 1;

  const [opacity, setOpacity] = useState<number>(initialvalue);

  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects]
  );

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };

  // When a new shape is selected, get its new opacity
  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") ?? 1);
    }
  }, [selectedObject]);

  return (
    <aside
      className={cn(
        "flex flex-col h-full relative border-r z-[40] w-[360px] bg-white",
        activeTool === "opacity" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Modify the opacity of the selected object"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Slider
            value={[opacity]}
            onValueChange={(values) => onChange(values[0])}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
