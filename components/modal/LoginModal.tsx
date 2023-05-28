"use client";

import {ToastOptions, toast} from "react-toastify";
import {useCallback, useState} from "react";
import {signIn} from "next-auth/react";

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import {useRouter} from "next/navigation";

import useRegisterModal from "~/hooks/useRegisterModal";
import useLoginModal from "~/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4001/api/v1/auth";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastOptions: ToastOptions = {
            isLoading: false,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
        };

        setIsLoading(true);
        const id = toast.loading("Please waiting...");

        // server
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then(callback => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.update(id, {
                    ...toastOptions,
                    render: "Login Successfully",
                    type: "success",
                })
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.update(id, {
                    ...toastOptions,
                    render: callback.status + " Login Failed! ",
                    type: "error",
                })
            }
        })
    };

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
        reset();
    }, [loginModal, registerModal, reset]);

    const handleClose = useCallback(() => {
        loginModal.onClose();
        reset();
    }, [loginModal, reset]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account!"/>
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Email format is invalid",
                    },
                }}
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                rules={{
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                        value: 12,
                        message: "Password up to 12 characters",
                    },
                }}
            />
        </div>
    );

    const footerContent = (
        <div className="mt-3 flex flex-col gap-4">
            <hr/>
            <div
                className="
                  flex flex-col gap-4
                  lg:flex-row
                "
            >
                <Button
                    outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={() => signIn("google")}
                />
                <Button
                    outline
                    label="Continue with Github"
                    icon={AiFillGithub}
                    onClick={() => signIn("github")}
                />
            </div>
            <div
                className="
                  mt-4 text-center font-light text-neutral-500
                "
            >
                <p>
                    Don{"'"}t any have Account?
                    <span
                        onClick={onToggle}
                        className="
                          cursor-pointer
                          text-neutral-800
                          hover:underline
                        "
                    >
                        {" "}
                        Create an account
                    </span>
                </p>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
