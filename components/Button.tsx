"use client";

import {IconType} from "react-icons";
import React from "react";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           onClick,
                                           disabled,
                                           outline,
                                           small,
                                           icon: Icon,
                                       }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
        flex
        flex-grow
        items-center
        justify-around
        px-4
        rounded-lg
        transition
        group
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${outline ? "bg-white" : "bg-rose-500"}
        ${outline ? "border-black" : "border-rose-500"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-2" : "py-3"}
        ${small ? "font-light" : "font-semibold"}//
        ${small ? "border-[1px]" : "border-2"}
      `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
            group-hover:opacity-100
          "
                />
            )}
            <span className="flex-1 group-hover:opacity-80">{label}</span>
        </button>
    );
};

export default Button;
