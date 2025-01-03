import { cn } from "@/lib/utils";

import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface ShapeToolProps {
  icon: LucideIcon | IconType;
  iconClassName?: string;
  onClick: () => void;
}

export const ShapeTool: React.FC<ShapeToolProps> = ({
  icon: Icon,
  iconClassName,
  onClick,
}) => {
  return (
    <button className="aspect-square border p-5 rounded-md" onClick={onClick}>
      <Icon className={cn("h-full w-full", iconClassName)} />
    </button>
  );
};
