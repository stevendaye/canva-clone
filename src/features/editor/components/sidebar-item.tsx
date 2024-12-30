import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "w-full h-full aspect-video p-3 py-7 flex flex-col rounded-none",
        isActive && "bg-muted text-primary"
      )}
    >
      <Icon className="size-5 stroke-2 shrink-0" />
      <span className="text-xs mt-1">{label}</span>
    </Button>
  );
};
