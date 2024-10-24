/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */

import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Checkbox, FloatingLabel, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "../../Validations/RegisterSchema";
import axios from "axios";
import Title from "../../Components/Shared/Title";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PageFormContainer from "../../Components/Shared/PageFormContainer";
import FormWrapper from "../../Components/Shared/FormWrapper";

function Register() {
    const nav = useNavigate();

    const initialData = {
        name: {
            first: "",
            middle: "",
            last: "",
        },
        phone: "",
        email: "",
        password: "",
        image: {
            url: "",
            alt: "",
        },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0,
        },
        isBusiness: false,
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialData,
        mode: "onChange",
        resolver: joiResolver(RegisterSchema)
    });

    const onSubmit = async (form: typeof initialData) => {
        console.log(form);

        try {
            const token = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
                form,
            );
            console.log(token);
            toast.success("Register Successful");
            nav('/login');
        } catch (error) {
            console.log(error);
            toast.error("Register Failed");
        }
    }

    return (
        <PageFormContainer>
            <FormWrapper
                className="md:w-2/3 sm:w-3/4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Title>Register</Title>

                <div className="flex flex-row justify-between gap-8 text-left">
                    <div className="flex flex-col w-full">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="text"
                            variant="standard"
                            label="First Name *"
                            {...register("name.first")}
                            color={errors.name?.first ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.name?.first?.message}</span>
                    </div>
                    <div className="flex flex-col w-full">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="text"
                            variant="standard"
                            label="Middle Name"
                            {...register("name.middle")}
                            color={errors.name?.middle ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.name?.middle?.message}</span>
                    </div>

                    <div className="flex flex-col w-full">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="text"
                            variant="standard"
                            label="Last Name *"
                            {...register("name.last")}
                            color={errors.name?.last ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.name?.last?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-8 text-left">
                    <div className="flex flex-col w-3/5">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="tel"
                            variant="standard"
                            label="Phone Number *"
                            {...register("phone")}
                            color={errors.phone ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.phone?.message}</span>
                    </div>

                    <div className="flex flex-col w-full">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="email"
                            variant="standard"
                            label="Email *"
                            {...register("email")}
                            color={errors.email ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.email?.message}</span>
                    </div>

                    <div className="flex flex-col w-full">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="password"
                            variant="standard"
                            label="Password *"
                            {...register("password")}
                            color={errors.password ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.password?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-around gap-12 text-left">
                    <h2 className="font-bold text-[var(--primary-color)] dark:text-[var(--background-color)] pt-2">Image:</h2>
                    <div className="flex flex-col w-full">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="url"
                            variant="standard"
                            label="Image URL"
                            {...register("image.url")}
                            color={errors.image?.url ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.image?.url?.message}</span>
                    </div>

                    <div className="flex flex-col w-full">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="text"
                            variant="standard"
                            label="Image Alt"
                            {...register("image.alt")}
                            color={errors.image?.alt ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.image?.alt?.message}</span>
                    </div>
                </div>

                <h2
                    className="font-bold text-[var(--primary-color)] dark:text-[var(--background-color)] pt-2">
                    Address:
                </h2>

                <div className="flex flex-row flex-wrap justify-around gap-2 text-left">
                    <div className="flex flex-col w-1/5">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="text"
                            variant="standard"
                            label="State *"
                            {...register("address.state")}
                            color={errors.address?.state ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.address?.state?.message}</span>
                    </div>

                    <div className="flex flex-col w-1/3">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="text"
                            variant="standard"
                            label="Country *"
                            {...register("address.country")}
                            color={errors.address?.country ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.address?.country?.message}</span>
                    </div>

                    <div className="flex flex-col w-1/3">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="text"
                            variant="standard"
                            label="City *"
                            {...register("address.city")}
                            color={errors.address?.city ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.address?.city?.message}</span>
                    </div>

                    <div className="flex flex-col w-1/3">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="text"
                            variant="standard"
                            label="Street *"
                            {...register("address.street")}
                            color={errors.address?.street ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.address?.street?.message}</span>
                    </div>

                    <div className="flex flex-col w-1/5">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="number"
                            variant="standard"
                            label="Num *"
                            {...register("address.houseNumber")}
                            color={errors.address?.houseNumber ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.address?.houseNumber?.message}</span>
                    </div>

                    <div className="flex flex-col w-1/5">
                        <FloatingLabel
                            className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                            type="number"
                            variant="standard"
                            label="Zip *"
                            {...register("address.zip")}
                            color={errors.address?.zip ? "error" : "success"}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.address?.zip?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-4 mb-4">
                    <Checkbox {...register("isBusiness")} />
                    <Label htmlFor="isBusiness" className="-mt-[0.2rem]">Is Business</Label>
                </div>

                <Button
                    className="btn dark:bg-[var(--primary-color)] dark:text-white w-1/4 m-auto"
                    type="submit"
                    disabled={!isValid}
                >
                    Register
                </Button>
            </FormWrapper>
        </PageFormContainer>

    );
}

export default Register;