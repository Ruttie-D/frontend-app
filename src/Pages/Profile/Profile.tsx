/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/classnames-order */
// import { useSelector } from "react-redux";
import PageContainer from "../../Components/Shared/PageContainer";
import PageTitle from "../../Components/Shared/PageTitle";
import { TRootState } from "../../Store/BigPie";
import Title from "../../Components/Shared/Title";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdEmail, MdPhonelinkRing } from "react-icons/md";
import { PiSignature } from "react-icons/pi";
import { GrMapLocation, GrUserAdmin } from "react-icons/gr";
import { ImBriefcase } from "react-icons/im";
import { Button } from "flowbite-react";
import EditProfileModal from "../../Components/Layout/Modals/EditProfile/EditProfileModal.tsx";
import { userActions } from "../../Store/UserSlice.ts";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: TRootState) => state.UserSlice);
    const userInfo = user.user;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [triggerRender, setTriggerRender] = useState(true);

    const editProfile = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setTriggerRender((prev) => !prev); // Toggle the trigger to force re-render
        setIsModalOpen(false); // Close the modal
    };

    useEffect(() => {

        if (userInfo) {
            dispatch(userActions.updateUser(userInfo)); // Dispatch with userInfo
        }
    }, [dispatch, triggerRender, userInfo]);

    return (
        <PageContainer>

            <PageTitle>Profile Page</PageTitle>

            <div
                className="size-28 m-auto rounded-full mb-5 mt-8 bg-[var(--background-color)]"
            >
                <img
                    className="object-fill rounded-full size-full"
                    src={user.user?.image.url} />
            </div>

            <Title
                className="text-[1.8rem] text-center"
            >
                Welcome {(userInfo?.name.first)
                    ? userInfo?.name.first?.charAt(0).toUpperCase() + userInfo?.name.first?.slice(1)
                    : 'Guest'}
            </Title>

            <div
                className="flex h-full flex-col gap-2 pb-4 mx-auto text-center rounded-lg shadow-lg md:w-2/3 xs:w-3/4 dark:bg-[#1f2937] dark:text-[var(--background-color)]"
            >

                <div className='flex flex-col gap-6 m-auto text-xl'>
                    <h1 className="mb-2 ml-4 text-2xl text-center pt-7 text-[#708090]">
                        Your Info
                    </h1>

                    <span className="flex flex-row gap-3">
                        <PiSignature className="size-8" />
                        <h1 className="inline text-2xl underline">
                            Full Name:
                        </h1>
                        <p className="pt-1">
                            {user.user && (`
                                ${user.user.name.first.replace(/\b\w/g, (char) => char.toUpperCase())}
                                ${user.user.name.middle.replace(/\b\w/g, (char) => char.toUpperCase())} 
                                ${user.user.name.last.replace(/\b\w/g, (char) => char.toUpperCase())}
                                `)}
                        </p>
                    </span>

                    <span className="flex flex-row gap-3">
                        <MdPhonelinkRing className="size-8" />
                        <h1 className="inline text-2xl underline">
                            Phone:
                        </h1>
                        <p className="pt-1">
                            {user.user && user.user.phone}
                        </p>
                    </span>

                    <span className="flex flex-row gap-3">
                        <MdEmail className="size-8" />
                        <h1 className="inline text-2xl underline">
                            Email:
                        </h1>
                        <p className="pt-1">
                            {user.user && user.user.email}
                        </p>
                    </span>

                    <span className="flex flex-row gap-3">
                        <GrMapLocation className="size-8" />
                        <h1 className="inline text-2xl underline">
                            Address:
                        </h1>
                        <p className="pt-1">
                            {user.user && (`
                            ${user.user.address.state.toUpperCase()} 
                            ${user.user.address.country.replace(/\b\w/g, (char) => char.toUpperCase())} 
                            ${user.user.address.city.replace(/\b\w/g, (char) => char.toUpperCase())}                            
                            ${user.user.address.street.replace(/\b\w/g, (char) => char.toUpperCase())} 
                            ${user.user.address.houseNumber} ${user.user.address.zip}`)}
                        </p>
                    </span>

                    <span className="flex flex-row gap-3">
                        <ImBriefcase className="size-8" />
                        <h1 className="inline text-2xl underline">
                            Account:
                        </h1>
                        <p className="pt-1">
                            {user.user && (user.user.isBusiness ? "Business" : "Regular")}
                        </p>
                    </span>

                    {user.user && user.user.isAdmin && (
                        <span className="flex flex-row gap-3">
                            <GrUserAdmin className="size-8" />
                            <h1 className="inline text-2xl underline">
                                You Are The Admin!
                            </h1>
                        </span>
                    )}

                    <Button
                        className="w-1/3 m-auto mt-5 btn dark:bg-[var(--primary-color)] dark:text-white"
                        onClick={editProfile}
                    >
                        Edit Your Profile
                    </Button>
                </div>
            </div>

            {isModalOpen && user.user && (
                <EditProfileModal
                    user={user.user}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </PageContainer>
    );
}

export default Profile;