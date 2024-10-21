/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react-hooks/exhaustive-deps */
import { SyntheticEvent, useEffect, useState } from "react";
import { MdEmail, MdPhonelinkRing } from "react-icons/md";
import { FaGlobeAmericas } from "react-icons/fa";
import PageContainer from "../../Components/Shared/PageContainer";
import PageTitle from "../../Components/Shared/PageTitle";
import { TCard } from "../../Types/TCard";
import noPic from "../../assets/noPic.png"
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MapComponent from "../../Components/Layout/OpenStreetMap/OpenStreetMap";
// import { getCode } from 'country-list';

const CardDetails = () => {
    const [card, setCard] = useState<TCard>();
    const { id } = useParams<{ id: string }>();

    const getData = async () => {
        const res = await axios.get(
            'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/' + id
        );
        setCard(res.data);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <PageContainer>
            <PageTitle>Card Details</PageTitle>

            <div
                className="flex h-full flex-col gap-2 p-4 mx-auto text-center rounded-lg shadow-lg md:w-2/3 xs:w-3/4 dark:bg-[#1f2937] mt-9 dark:text-[var(--background-color)]"
            >

                <h1 className="pt-5 mb-2 ml-4 text-6xl text-center text-[#708090]" style={{ WebkitTextStroke: '0.5px white' }}>
                    {card && card?.title}
                </h1>

                <h2 className="pt-3 mb-5 ml-4 text-2xl text-center">
                    {card && card?.subtitle}
                </h2>

                <img className="object-cover p-1 mx-auto h-[40vh]"
                    src={card && card.image?.url}
                    alt={card && card.image?.alt}
                    onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.src = noPic;
                        e.currentTarget.onerror = null;
                    }}
                />

                <Link className="flex flex-row justify-center gap-3 mb-5 text-lg text-center" to={`${card?.web}`}>
                    <FaGlobeAmericas className="mt-1 size-5" />
                    {card && card?.web}
                </Link>

                <div className='mb-3 text-xl text-center text-black bg-[var(--secondary-color)] rounded-lg shadow-lg w-3/4 m-auto p-5'>
                    {card && card?.description}
                </div>

                <h1 className="mb-2 ml-4 text-2xl text-center pt-7 text-[#708090]">
                    Our Contact
                </h1>

                <p className='flex flex-col gap-6 m-auto text-xl lg:flex-row'>
                    <span className="flex flex-row gap-3">
                        <MdEmail className="size-8" />
                        <h1 className="inline text-2xl underline">Email:</h1>
                        <p className="pt-1">{card && card.email}</p>
                    </span>
                    <span className="flex flex-row gap-3">
                        <MdPhonelinkRing className="size-8" />
                        <h1 className="inline text-2xl underline">Phone:</h1>
                        <p className="pt-1">{card && card.phone}</p>
                    </span>
                </p>

                <h1 className="inline mt-10 text-2xl underline">Address:</h1>
                <div
                    className='gap-5 text-xl text-center bg-[var(--secondary-color)] rounded-lg shadow-lg w-3/4 m-auto p-5 flex lg:flex-row justify-around flex-col'
                >
                    <div className="flex flex-col justify-center lg:w-1/3 bold">
                        <p>{card && card.address.state}</p>
                        <p>{card && card.address.country}</p>
                        <p>{card && card.address.city}</p>
                        <p>{card && card.address.street}</p>
                        <p>{card && card.address.houseNumber}</p>
                        <p>{card && card.address.zip}</p>
                    </div>
                    <div className="lg:w-2/3">
                        <MapComponent
                            state={(card && card?.address.state) ?? ""}
                            country={card?.address.country ?? ""}
                            city={card?.address.city ?? ""}
                            street={card?.address.street ?? ""}
                            houseNumber={card?.address.houseNumber ?? 0}
                        />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}

export default CardDetails;