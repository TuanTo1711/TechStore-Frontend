"use client";

import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <button
      className="
        text-start
        px-4
        py-3
        hover:bg-neutral-100
        transition-colors
        font-semibold
      "
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MenuItem;
