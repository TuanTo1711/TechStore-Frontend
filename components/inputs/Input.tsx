"use client";

import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import React from "react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  rules?: RegisterOptions;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  rules,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            absolute
            left-2
            top-5
            text-neutral-700
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { ...rules })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          rounded-md
          border-2 
          bg-white 
          p-4 
          pt-6
          font-light
          outline-none
          transition
          focus:ring-0
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        htmlFor={id}
        className={`
          text-md 
          absolute
          top-5 
          z-10 
          origin-[0] 
          -translate-y-3 
          transform
          duration-150 
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:scale-100 
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
      {errors[id] && (
        <span className="text-rose-500">{errors[id]?.message?.toString()}</span>
      )}
    </div>
  );
};

export default Input;
