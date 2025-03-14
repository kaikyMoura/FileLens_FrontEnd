import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import { InputProps } from "../Input";
import { ChangeEventHandler, useEffect, useState } from "react";

interface CheckBoxProps {
    value: boolean;
    onChange?: (value: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ value, onChange }: CheckBoxProps) => {
    return (
      <button onClick={() => onChange!(!value)} className="">
        {value ? (
          <FaCheckSquare fontSize={22} color="gold" />
        ) : (
          <FaRegCheckSquare fontSize={22} color="gold" />
        )}
      </button>
    );
  };

export default CheckBox;