"use client";

import axios from "axios";
import {AiFillGithub} from "react-icons/ai";
import {signIn} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {useCallback, useState} from "react";
import {ToastOptions, toast} from "react-toastify";

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";

import useLoginModal from "~/hooks/useLoginModal";
import useRegisterModal from "~/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

axios.defaults.baseURL = "http://localhost:4001/api/v1/auth";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm: "",
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

        try {
            await axios.post("/sign-up", data);

            setIsLoading(false);
            toast.update(id, {
                type: "success",
                render: (
                    <div className="
                        flex flex-col gap-y-2
                    ">
                        <span className="font-bold text-lg text-green-500">Sign up successfully</span>
                        <span
                            className="text-sm text-neutral-700"
                        >
                            Please check your email and verify your account !
                        </span>
                    </div>
                ),
                ...toastOptions
            });

            registerModal.onClose();
            loginModal.onOpen();
            reset();
        } catch (error: any) {
            // if (error.response.status === HttpStatusCode.SeeOther) {
            //     toast.update(id, {
            //         type: "error",
            //         render: error.message,
            //         ...toastOptions
            //     })
            // }
            console.log(error.response.data?.errors[0]?.message);
            toast.update(id, {
                type: "error",
                render: "Sign up failed!" + error.response.message,
                ...toastOptions
            });
            reset();
        }
    };

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
        reset();
    }, [registerModal, loginModal, reset]);

    const passwordMatcher = (value: string) => {
        const password = getValues("password");
        return password === value || "Confirm password not matches";
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account!"/>
            <div className="flex flex-row gap-x-3">
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
                    id="name"
                    label="Name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Your name is required",
                        pattern: {
                            value: /^[\p{L}\s]+$/u,
                            message: "Your name must be not contains number or special characters",
                        }
                    }}
                />
            </div>
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                rules={{
                    required: "Password is required",
                }}
            />

            <Input
                id="confirm"
                label="Confirm your password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                rules={{
                    required: "You must be confirm your password",
                    validate: passwordMatcher,
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
                  mt-4
                  text-center
                  font-light
                  text-neutral-500
                "
            >
                <p>
                    Already have an account?
                    <span
                        onClick={onToggle}
                        className="
                          cursor-pointer
                          pl-1
                          text-neutral-800
                          hover:underline
                        "
                    >
                    Log in
                  </span>
                </p>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
