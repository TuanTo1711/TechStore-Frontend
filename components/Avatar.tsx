"use client";

import Image from "next/image";
import React from "react";

interface AvatarProps {
    src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
    return (
        <Image
            className="rounded-full"
            height="35"
            width="35"
            alt="Avatar"
            src={src || "/images/placeholder-avatar.jpg"}
        />
    );
};

export default Avatar;
