"use client";

import {Sansita_Swashed} from "next/font/google";
import Image from "next/image";
import {useRouter} from "next/navigation";

const font = Sansita_Swashed({subsets: ["vietnamese"]});

const Logo = () => {
    const router = useRouter();

    return (
        <div
            className="
                flex
                cursor-pointer
                items-center
                justify-start
                gap-x-2
            "
        >
            <Image
                alt="Logo"
                className="hidden h-auto md:block"
                src="/svg/logo.svg"
                width={30}
                height={30}
            />
            <button
                className={`
                  hidden
                  text-xl
                  font-semibold
                  text-rose-500
                  leading-4
                  lg:block
                  ${font.className}
                `}
                onClick={() => router.push('/')}
            >
                Tech Store
            </button>
        </div>
    );
};

export default Logo;
