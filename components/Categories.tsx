"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  AiOutlineCamera,
  AiOutlineLaptop,
  AiOutlineMobile,
} from "react-icons/ai";
import {BsMouse} from "react-icons/bs"
import {GiKeyboard, GiTablet} from "react-icons/gi"

import CategoryBox from "./CategoryBox";

export const categories = [
  {
    label: "Mobile",
    icon: AiOutlineMobile,
    description: "This property is close to the beach!",
  },
  {
    label: "Laptop",
    icon: AiOutlineLaptop,
    description: "This property is has windmills!",
  },
  {
    label: "Camera",
    icon: AiOutlineCamera,
    description: "This property is modern!",
  },
  {
    label: "Keyboard",
    icon: GiKeyboard,
    description: "This property is modern!",
  },
  {
    label: "Tablet",
    icon: GiTablet,
    description: "This property is modern!",
  },
  {
    label: "Mouse",
    icon: BsMouse,
    description: "This property is modern!",
  }
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <div
      className="
        p-0
        grid grid-cols-3
        sm:flex 
        sm:flex-row 
        sm:items-center 
        sm:justify-center
        sm:rounded-l-xl
        sm:p-2
      "
    >
      {categories.map((item: any) => (
        <CategoryBox
          key={item?.label}
          label={item?.label}
          icon={item?.icon}
          selected={category === item?.label}
        />
      ))}
    </div>
  );
};

export default Categories;
