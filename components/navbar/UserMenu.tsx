'use client'

import {AiOutlineMenu} from "react-icons/ai";
import {IoCart, IoNotifications} from "react-icons/io5";
import {useCallback, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import useLoginModal from "~/hooks/useLoginModal";
import useRegisterModal from "~/hooks/useRegisterModal";

import MenuItem from "./MenuItem";
import Button from "~/components/Button";
import Avatar from "~/components/Avatar";

const UserMenu = () => {
    const {data: currentUser} = useSession();
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                {currentUser ? (
                    <>
                        <div
                            className="
                        relative
                        py-1.5 px-2.5
                        rounded-full
                        bg-neutral-200
                        hover:bg-neutral-300
                        transition
                        cursor-pointer
                      "
                            onClick={() => {
                            }}
                        >
                            <div
                                className="
                                  absolute
                                  -top-1.5 -right-1.5
                                  w-5 h-5
                                  inline-flex items-center justify-center
                                  text-xs font-semibold text-white
                                  bg-red-500
                                  rounded-full
                                  overflow-hidden
                                "
                            >
                                <span>99</span>
                            </div>

                            <IoNotifications size={18}/>
                        </div>
                        <div
                            className="
                                py-1.5 px-2.5
                                rounded-full
                                bg-neutral-200
                                hover:bg-neutral-300
                                transition
                                cursor-pointer
                            "
                            onClick={() => {
                            }}
                        >
                            <IoCart size={18}/>
                        </div>
                        <div
                            onClick={toggleOpen}
                            className="
                                p-3
                                md:py-1 md:px-4
                                border-[1px]
                                border-neutral-200
                                flex flex-row items-center gap-3
                                rounded-full
                                cursor-pointer
                                hover:shadow-md
                                transition
                            "
                        >
                            <AiOutlineMenu size={18}/>
                        </div>
                    </>
                ) : (
                    <>
                        <Button label="Sign Up" small outline onClick={registerModal.onOpen}/>
                        <Button label="Login" small onClick={loginModal.onOpen}/>
                    </>
                )}

                {isOpen && (
                    <div
                        className="
                          absolute
                          rounded-xl
                          shadow-md
                          w-[50vw]
                          lg:w-full
                          md:w-full
                          sm:w-full
                          bg-white
                          overflow-hidden
                          right-0
                          top-10
                          text-sm
                        "
                    >
                        <div className='flex flex-start items-center gap-x-2 p-3 w-full'>
                            <Avatar src={null}/>
                            <div className='flex flex-1 flex-col gap-y-1'>
                                <div title={currentUser?.user?.name}
                                     className="font-semibold line-clamp-1 text-neutral-900 cursor-default">
                                    {currentUser?.user?.name}
                                </div>
                                <div className='text-left line-clamp-1 text-neutral-500 cursor-default'>$ 1</div>
                            </div>
                        </div>
                        <hr/>
                        <div className="flex flex-col cursor-pointer">
                            <MenuItem
                                label="Profile"
                                onClick={() => router.push("/")}
                            />
                            <MenuItem
                                label="Cart"
                                onClick={() => router.push("/")}
                            />
                            <MenuItem
                                label="Settings"
                                onClick={() => router.push("/")}
                            />
                            <hr/>
                            <MenuItem label="Logout" onClick={() => signOut()}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMenu;
