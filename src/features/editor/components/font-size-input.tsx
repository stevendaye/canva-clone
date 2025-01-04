import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Minus, Plus } from "lucide-react";

interface FontSizeInputProps {
  value: number;
  onChange: (val: number) => void;
}

export const FontSizeInput: React.FC<FontSizeInputProps> = ({
  value,
  onChange,
}) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  const handleChnange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange(value);
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        className="p-2 rounded-r-none border-r-0"
        size="icon"
        onClick={decrement}
      >
        <Minus className="size-4" />
      </Button>
      <Input
        className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
        value={value}
        onChange={handleChnange}
      />
      <Button
        variant="outline"
        className="p-2 rounded-l-none border-l-0"
        size="icon"
        onClick={increment}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
