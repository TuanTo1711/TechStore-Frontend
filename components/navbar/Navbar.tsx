"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import BreadCrumb from '../BreadCrumb'

const Navbar = () => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-3 border-b-[1px]">
                <Container>
                    <div
                        className="
              flex flex-row items-center justify-between gap-3
              md:gap-0
            "
                    >
                        <div className="flex gap-x-0 md:gap-x-8 justify-start">
                            <Logo/>
                            <Search/>
                        </div>
                        <UserMenu/>
                    </div>
                </Container>
            </div>
            <Container>
                <BreadCrumb/>
            </Container>
        </div>
    );
};

export default Navbar;
