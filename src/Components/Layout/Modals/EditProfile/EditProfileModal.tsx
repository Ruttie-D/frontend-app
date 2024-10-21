/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/classnames-order */
import { useForm } from "react-hook-form";
import { Button, Modal } from "flowbite-react";
import { FloatingLabel } from "flowbite-react";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../../../Shared/Title";
import { TUser } from "../../../../Types/TUser";
import { EditProfileSchema } from "../../../../Validations/EditProfileSchema";

interface EditProfileModalProps {
    user: TUser | null;
    isOpen: boolean;
    onClose: () => void; // Close the modal when the user clicks the close button or presses the escape key.
}

const EditProfileModal = ({ user, isOpen, onClose }: EditProfileModalProps) => {
    const selectedUser = user;

    const initialData = {
        name: {
            first: selectedUser?.name.first || "",
            middle: selectedUser?.name.middle || "",
            last: selectedUser?.name.last || "",
        },
        phone: selectedUser?.phone || "",
        email: selectedUser?.email || "",
        image: {
            url: selectedUser?.image.url,
            alt: selectedUser?.image.alt,
        },
        address: {
            state: selectedUser?.address.state || "",
            country: selectedUser?.address.country || "",
            city: selectedUser?.address.city || "",
            street: selectedUser?.address.street || "",
            houseNumber: selectedUser?.address.houseNumber || 0,
            zip: selectedUser?.address.zip || 0
        }
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        values: initialData,
        mode: "onChange",
        resolver: joiResolver(EditProfileSchema)
    });

    const onUpdate = async (form: typeof initialData) => {

        try {
            const token = localStorage.getItem('token');

            await axios.put(
                'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/' + user!._id,
                form,
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            );

            toast.success('Profile Update Successfully');
            onClose();
        } catch (err: unknown) {
            // Type guard to check if 'err' is an AxiosError
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data); // Log detailed error response
                toast.error("Profile Update Failed: " + (err.response?.data.message || "Unknown error"));
            } else {
                console.error(err); // Handle non-Axios errors
                toast.error("Profile Update Failed: Unknown error");
            }
        }
    }

    return (
        <Modal
            show={isOpen}
            onClose={onClose}
        >
            <Modal.Header />

            <Modal.Body>
                <Title className="mb-3 text-4xl font-bold text-[var(--primary-color)] dark:text-[var(--background-color)] text-center">
                    Edit Profile
                </Title>

                <form
                    className="flex flex-col gap-2 p-4 mx-auto text-center rounded-lg shadow-lg w-full dark:bg-[#1f2937]"
                    onSubmit={handleSubmit(onUpdate)}
                >
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

                        {/* <div className="flex flex-col w-full">
                            <FloatingLabel
                                className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                type="password"
                                variant="standard"
                                label="Password *"
                                {...register("password")}
                                color={errors.password ? "error" : "success"}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.password?.message}</span>
                        </div> */}
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

                    <h2 className="font-bold text-[var(--primary-color)] dark:text-[var(--background-color)] pt-2">Address:</h2>
                    <div className="flex flex-row justify-around gap-5 mb-4 text-left">
                        <div className="flex flex-col w-2/5">
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

                        <div className="flex flex-col w-3/5">
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

                        <div className="flex flex-col w-2/3">
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

                        <div className="flex flex-col w-3/5">
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

                        <div className="flex flex-col w-1/4">
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

                        <div className="flex flex-col w-[35%]">
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

                    <Button
                        className="btn dark:bg-[var(--primary-color)] dark:text-white"
                        type="submit"
                        disabled={!isValid}
                    >
                        Update
                    </Button>

                </form>

            </Modal.Body>
        </Modal>
    );
}

export default EditProfileModal;