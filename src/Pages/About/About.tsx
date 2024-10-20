/* eslint-disable tailwindcss/classnames-order */
import InfoHeader from "../../Components/Shared/InfoHeader";
import InfoPar from "../../Components/Shared/InfoPar";
import PageContainer from "../../Components/Shared/PageContainer";
import PageTitle from "../../Components/Shared/PageTitle";

function About() {
    return (
        <PageContainer>
            <PageTitle>About Us</PageTitle>

            <div className="flex flex-row flex-wrap justify-between w-4/6 gap-1 m-auto mt-6 text-center">
                <InfoPar>
                    Welcome to BCard, the ultimate platform for creating, browsing, and managing business cards effortlessly. Whether you're a professional or a business of any size, BCard provides a seamless, efficient solution for all your business card needs.
                </InfoPar>

                <InfoHeader>Our Purpose</InfoHeader>
                <InfoPar>
                    At BCard, we aim to revolutionize how you connect and manage professional relationships. Our goal is to offer a powerful yet easy-to-use solution for crafting standout business cards, organizing your contacts, and boosting your professional presence.
                </InfoPar>

                <InfoHeader>Our Features</InfoHeader>
                <InfoPar>
                    Create eye-catching, professional business cards with ease using our simple design tools. Choose from a diverse range of templates, personalize every aspect, and ensure your card makes a lasting impression.
                </InfoPar>

                <InfoHeader>Discover</InfoHeader>
                <InfoPar>
                    Browse an extensive collection of business cards within our app. Get inspired, find new connections, and network with professionals across various fields.
                </InfoPar>

            </div>
        </PageContainer>
    );
}

export default About;