import { ChevronsLeft } from "lucide-react";
import React from "react";

interface ToolSidebarCloseProps {
  onClick: () => void;
}

export const ToolSidebarClose: React.FC<ToolSidebarCloseProps> = ({
  onClick,
}) => (
  <button
    className="flex items-center justify-center absolute -right-[1.80rem] h-[70px] bg-white top-1/2
    transform -translate-y-1/2 rounded-r-xl px-1 pr-2 border-r border-y group:"
    onClick={onClick}
  >
    <ChevronsLeft className="size-4 text-black group-hover:opacity-75 transition" />
  </button>
);
