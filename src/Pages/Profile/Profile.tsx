/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/classnames-order */
// import { useSelector } from "react-redux";
import PageContainer from "../../Components/Shared/PageContainer";
import PageTitle from "../../Components/Shared/PageTitle";
import { TRootState } from "../../Store/BigPie";
import Title from "../../Components/Shared/Title";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state: TRootState) => state.UserSlice);
    // const [userName, setUserName] = useState<string>();

    // useEffect(() => {
    //     setUserName(localStorage.getItem('userName') ?? "");
    //     console.log(user.user);

    // }, []);

    console.log(user.user?.name.first);
    return (
        <PageContainer>
            <PageTitle>Profile Page</PageTitle>
            <Title className="text-[2rem] text-center">Welcome {(user.user?.name.first)
                ? user.user?.name.first?.charAt(0).toUpperCase() + user.user?.name.first?.slice(1)
                : 'Guest'}</Title>
        </PageContainer>
    );
}

export default Profile;