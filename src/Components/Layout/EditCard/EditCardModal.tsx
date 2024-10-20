/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/classnames-order */
import { TCard } from "../../../Types/TCard";
import { Controller, useForm } from "react-hook-form";
import { Button, Modal } from "flowbite-react";
import { FloatingLabel } from "flowbite-react";
import { joiResolver } from "@hookform/resolvers/joi";
import { CreateCardSchema } from "../../../Validations/CreateCardSchema";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Title from "../../Shared/Title";


interface EditCardModalProps {
    card: TCard | null;
    isOpen: boolean;
    onClose: () => void; // Close the modal when the user clicks the close button or presses the escape key.
}

const EditCardModal = ({ card, isOpen, onClose }: EditCardModalProps) => {

    const initialData = {
        _id: card!._id,
        title: card?.title,
        subtitle: card?.subtitle,
        description: card?.description,
        phone: card?.phone,
        email: card?.email,
        web: card?.web,
        image: {
            url: card?.image.url,
            alt: card?.image.alt
        },
        address: {
            state: card?.address.state,
            country: card?.address.country,
            city: card?.address.city,
            street: card?.address.street,
            houseNumber: card?.address.houseNumber,
            zip: card?.address.zip,
        },
        bizNumber: card!.bizNumber,
        likes: card!.likes,
        user_id: card!.user_id
    };

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialData,
        mode: "onChange",
        resolver: joiResolver(CreateCardSchema)
    });
    const nav = useNavigate();

    const onUpdate = async (form: typeof initialData) => {
        console.log("Updating");

        try {
            const token = localStorage.getItem('token');

            await axios.put(
                'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/' + card!._id,
                form,
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            );
            toast.success('Card Update Successfully');
            nav('/myCards');
        } catch (err) {
            console.log(err);
            toast.error("Card Update Failed");
        }
    }
    // console.log(!isValid, errors);

    useEffect(() => {
        console.log("Form Errors:", errors.valueOf.length === 0);
        console.log("Is Form Valid:", isValid);
    }, [errors, isValid]);

    return (
        <Modal
            show={isOpen}
            onClose={onClose}
        // onSubmit={handleSubmit(onSubmit)}
        >
            <Modal.Header />

            <Modal.Body>
                <Title className="mb-3 text-4xl font-bold text-[var(--primary-color)] dark:text-[var(--background-color)] text-center">Edit Card</Title>
                <form
                    className="flex flex-col gap-2 p-4 mx-auto text-center rounded-lg shadow-lg w-full dark:bg-[#1f2937]"
                    onSubmit={handleSubmit(onUpdate)}
                >

                    <div className="flex flex-row justify-between gap-8 text-left">
                        <div className="flex flex-col w-full">

                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="text"
                                        variant="standard"
                                        label="Title *"
                                        {...field}
                                        color={errors.title ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.title?.message}</span>
                        </div>

                        <div className="flex flex-col w-full">

                            <Controller
                                name="subtitle"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="text"
                                        variant="standard"
                                        label="Subtitle *"
                                        {...field}
                                        color={errors.subtitle ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.subtitle?.message}</span>
                        </div>
                    </div>

                    <div className="flex flex-col w-full text-left">

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (

                                <FloatingLabel
                                    className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                    type="text"
                                    variant="standard"
                                    label="Description *"
                                    {...field}
                                    color={errors.description ? "error" : "success"}
                                />
                            )}
                        />
                        <span className="mb-5 text-xs text-red-500">{errors.description?.message}</span>
                    </div>

                    <div className="flex flex-row justify-between gap-8 text-left">
                        <div className="flex flex-col w-3/5">

                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="tel"
                                        variant="standard"
                                        label="Phone Number *"
                                        {...field}
                                        color={errors.phone ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.phone?.message}</span>
                        </div>

                        <div className="flex flex-col w-full">

                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="email"
                                        variant="standard"
                                        label="Email *"
                                        {...field}
                                        color={errors.email ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.email?.message}</span>
                        </div>

                        <div className="flex flex-col w-full">

                            <Controller
                                name="web"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="text"
                                        variant="standard"
                                        label="Web"
                                        {...field}
                                        color={errors.web ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.web?.message}</span>
                        </div>
                    </div>

                    <div className="flex flex-row justify-around gap-12 text-left">
                        <h2 className="font-bold text-[var(--primary-color)] dark:text-[var(--background-color)] pt-2">Image:</h2>
                        <div className="flex flex-col w-full">

                            <Controller
                                name="image.url"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="url"
                                        variant="standard"
                                        label="Image URL *"
                                        {...field}
                                        color={errors.image?.url ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.image?.url?.message}</span>
                        </div>

                        <div className="flex flex-col w-full">

                            <Controller
                                name="image.alt"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="text"
                                        variant="standard"
                                        label="Image Alt *"
                                        {...field}
                                        color={errors.image?.alt ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.image?.alt?.message}</span>
                        </div>
                    </div>

                    <h2 className="font-bold text-[var(--primary-color)] dark:text-[var(--background-color)] pt-2 mb-4">Address:</h2>
                    <div className="flex flex-row justify-around gap-5 mb-4 text-left">
                        <div className="flex flex-col w-1/3">

                            <Controller
                                name="address.state"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="text"
                                        variant="standard"
                                        label="State *"
                                        {...field}
                                        color={errors.address?.state ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.address?.state?.message}</span>
                        </div>

                        <div className="flex flex-col w-1/2">

                            <Controller
                                name="address.country"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="text"
                                        variant="standard"
                                        label="Country *"
                                        {...field}
                                        color={errors.address?.country ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.address?.country?.message}</span>
                        </div>

                        <div className="flex flex-col w-2/3">

                            <Controller
                                name="address.city"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="text"
                                        variant="standard"
                                        label="City *"
                                        {...field}
                                        color={errors.address?.city ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.address?.city?.message}</span>
                        </div>

                        <div className="flex flex-col w-1/2">

                            <Controller
                                name="address.street"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="text"
                                        variant="standard"
                                        label="Street *"
                                        {...field}
                                        color={errors.address?.street ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.address?.street?.message}</span>
                        </div>

                        <div className="flex flex-col w-1/4">

                            <Controller
                                name="address.houseNumber"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="number"
                                        variant="standard"
                                        label="Num *"
                                        {...field}
                                        color={errors.address?.houseNumber ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.address?.houseNumber?.message}</span>
                        </div>

                        <div className="flex flex-col w-[35%]">

                            <Controller
                                name="address.zip"
                                control={control}
                                render={({ field }) => (

                                    <FloatingLabel
                                        className="dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                                        type="number"
                                        variant="standard"
                                        label="Zip *"
                                        {...field}
                                        color={errors.address?.zip ? "error" : "success"}
                                    />
                                )}
                            />
                            <span className="mb-5 text-xs text-red-500">{errors.address?.zip?.message}</span>
                        </div>
                    </div>

                    <Button
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

export default EditCardModal;