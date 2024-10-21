/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import Styles from '../Home/Home.module.css';
import { useEffect, useState } from "react"
import { TCard } from "../../Types/TCard"
import axios from "axios";
import { Card } from "flowbite-react";
import { FaPhoneAlt } from "react-icons/fa";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import PageTitle from '../../Components/Shared/PageTitle';
import PageContainer from '../../Components/Shared/PageContainer';
import { useSelector } from 'react-redux';
import { TRootState } from '../../Store/BigPie';
import { useNavigate } from 'react-router-dom';
import Title from '../../Components/Shared/Title';
import { toast } from 'react-toastify';
// import { decode } from '../../Services/tokenService';

const Favorites = () => {
    const user = useSelector((state: TRootState) => state.UserSlice);
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const inOut = localStorage.getItem('logged in') ? true : false;
    const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);

    const getData = async () => {
        const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
        setCards(res.data);
    };

    const searchCards = () => {
        // return cards.filter((item: TCard) => item.title.toLowerCase().includes(searchWord) || item.subtitle.toLowerCase().includes(searchWord));
        return cards.filter((card: TCard) => isCardLiked(card)).filter((item: TCard) => item.title.toLowerCase().includes(searchWord) || item.subtitle.toLowerCase().includes(searchWord));
    };

    const isCardLiked = (card: TCard) => {
        if (user && user.user) {
            card.likes.includes(user.user?._id) ?? console.log(true);
            return card.likes.includes(user.user?._id);
        } else {
            return false;
        }
    };

    const navToCard = (id: string) => {
        nav(`/card/${id}`);
    };

    const likeUnlike = async (card: TCard) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const res = await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
                {},
                {
                    headers: {
                        'x-auth-token': token, // Add the token to the headers
                    },
                }
            );
            if (res.status === 200) {
                toast.success("Card updated successfully");

                const index = cards.indexOf(card);
                const newCards = [...cards];

                cards[index].likes.includes(user.user!._id) ?
                    newCards[index].likes.filter(like => like !== user.user!._id) :
                    newCards[index].likes.push(user.user!._id);

                setCards(newCards);
            }
        } catch (err) {
            toast.error("Failed to update card");
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, [cards]);

    return (
        <PageContainer>
            <PageTitle>Favorites</PageTitle>
            <Title className="text-[1.7rem] text-center">Your Handpicked Collection of Standout Business Cards</Title>

            <div className="flex flex-row flex-wrap justify-between w-5/6 gap-1 m-auto mt-6 text-center">
                {searchCards()!.map((item: TCard) => {
                    return (
                        <Card key={item._id}
                            className="xl:w-[24%] lg:w-[32%] md:w-[40%] sm:w-[60%] w-[80%] m-auto mb-3 relative">
                            <div onClick={() => { navToCard(item._id) }}
                            >
                                <img className="w-[95%] h-56 object-cover absolute inset-x-0 top-2 mx-auto p-1"
                                    src={item.image.url}
                                    alt={item.image.alt}
                                />

                                <div className={`${Styles.textBox}flex flex-col justify-start ml-[-10px] mt-56 h-60 w-[107%] dark:text-[var(--background-color)]`}>
                                    <h1 className="mb-3 text-4xl break-words">
                                        {item.title}
                                    </h1>
                                    <h3 className='mb-3 text-xl font-bold'>
                                        {item.subtitle}
                                    </h3>

                                    <hr className='text-black dark:text-white' />

                                    <p className='mt-2 line-clamp-5'>
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <hr className='leading-[1.75] text-black dark:text-white' />

                            <div className={`flex ${inOut ? 'justify-between' : 'justify-center'} flex-row`}>
                                <FaPhoneAlt
                                    className='text-2xl cursor-pointer dark:text-white'
                                    title='Call'
                                />

                                {inOut &&
                                    (isCardLiked(item) ?
                                        <BsSuitHeartFill
                                            className={`text-2xl cursor-pointer text-red-500 fill-current`}
                                            onClick={() => likeUnlike(item)}
                                            title='Unlike'
                                        /> :
                                        <BsSuitHeart
                                            className={`text-2xl cursor-pointer text-black dark:text-white`}
                                            onClick={() => likeUnlike(item)}
                                            title='Like'
                                        />
                                    )}
                            </div>
                            {/* {} */}
                        </Card>
                    );
                })
                }
            </div>
        </PageContainer>
    );
}

export default Favorites;