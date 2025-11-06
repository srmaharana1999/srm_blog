import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface IProps {
  id: string;
  isChecked?: boolean;
  title: string;
  description?: string;
  onChange: (checked: boolean) => void;
}
const CheckBoxWithLabel = ({
  isChecked = false,
  title,
  description,
  id,
  onChange,
}: IProps) => {
  return (
    <Label className="flex items-start gap-3 border-shadow p-3 has-[[aria-checked=true]]:border-main has-[[aria-checked=true]]:bg-background dark:has-[[aria-checked=true]]:border-main dark:has-[[aria-checked=true]]:bg-background">
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={(checked) => onChange(Boolean(checked))}
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Label>
  );
};

export default CheckBoxWithLabel;
