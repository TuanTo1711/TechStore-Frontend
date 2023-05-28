'use client'

import Image from 'next/image';
import React from "react";
import Link from "next/link";
import {Rating} from "@mui/material";
import numeral from 'numeral';

interface ProductCardProps {
    id: number | string;
    name: string;
    img?: string;
    description?: string;
    price: string | number;
    star?: number
}

const ProductCard: React.FC<ProductCardProps> = (
    {
        id,
        name,
        img,
        price,
        star
    }
) => {
    const [value, setValue] = React.useState<number | null>(5);

    return (
        <>
            <div className="
                  w-full max-w-sm
                  bg-white border
                  border-gray-200
                  rounded-lg
                  shadow
            ">
                <Link href="/" className="relative w-full h-[250px]">
                    <Image
                        className="rounded-t-lg object-cover w-full object-center p-4"
                        src={img ?? "/images/image 33.svg"}
                        alt="product image"
                        width={0}
                        height={0}
                        sizes={'100vw'}
                    />
                </Link>
                <div className="px-5 pb-5">
                    <Link href={`/product/${id}`}>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 line-clamp-2">
                            {name}
                        </h5>
                    </Link>
                    <div className="flex items-center mt-2.5 mb-5">
                        {<Rating defaultValue={star || 5}
                                 onChange={(event, newValue) => {
                                     setValue(newValue);
                                 }}/>
                        }
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded ">
                            {value}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          {numeral(price).format('0,0')}
                        </span>
                        <Link
                            href="/"
                            className="
                                text-white
                                bg-rose-700
                                hover:bg-rose-800
                                focus:ring-2
                                focus:outline-none
                                focus:ring-rose-300
                                font-medium
                                rounded-lg
                                text-sm px-4
                                py-2
                                text-center
                            "
                        >
                            Add to cart
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
