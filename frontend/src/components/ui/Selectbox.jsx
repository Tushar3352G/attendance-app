import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectBox = ({ value, name }) => {
  return (
    <Select name={name} className="cursor-pointer">
      <SelectTrigger className="w-full cursor-pointer">
        <SelectValue placeholder="Select Option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {value.map((item, key) => (
            <SelectItem className="cursor-pointer" key={key} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
