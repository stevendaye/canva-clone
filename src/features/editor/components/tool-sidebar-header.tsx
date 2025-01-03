interface ToolSidebarHeaderProps {
  title: string;
  description?: string;
}

export const ToolSidebarHeader: React.FC<ToolSidebarHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="p-4 border-b space-y-1 h-[68px]">
      <p className="text-sm font-medium ">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
