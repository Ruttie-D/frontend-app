/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import Styles from '../Home/Home.module.css';
import { useEffect, useState } from "react"
import { TCard } from "../../Types/TCard"
import axios from "axios";
import { Card } from "flowbite-react";
import { TbSquarePlus2, TbEdit, TbTrash } from "react-icons/tb";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import PageTitle from '../../Components/Shared/PageTitle';
import PageContainer from '../../Components/Shared/PageContainer';
import { useSelector } from 'react-redux';
import { TRootState } from '../../Store/BigPie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditCardModal from '../../Components/Layout/Modals/EditCard/EditCardModal';
import Title from '../../Components/Shared/Title';

const MyCards = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const user = useSelector((state: TRootState) => state.UserSlice);
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);

    const [selectedCard, setSelectedCard] = useState<TCard | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getData = async () => {
        const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
        setCards(res.data);
    };

    const searchCards = () => {
        return cards.filter((card: TCard) => isCardMine(card)).filter((item: TCard) => item.title.toLowerCase().includes(searchWord) || item.subtitle.toLowerCase().includes(searchWord));
    };

    const isCardLiked = (card: TCard) => {
        if (user && user.user) {
            card.likes.includes(user.user?._id) ?? console.log(true);
            return card.likes.includes(user.user?._id);
        } else {
            return false;
        }
    };
    const isCardMine = (card: TCard) => {
        if (user && user.user) {
            card.user_id.includes(user.user?._id) ?? console.log(user.user._id, card.user_id);
            return card.user_id.includes(user.user?._id);
        } else {
            return false;
        }
    };

    const navToCard = (id: string) => {
        nav(`/card/${id}`);
    };

    const likeUnlike = async (card: TCard) => {
        try {
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

    const editCard = (card: TCard) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedCard(null); // Clear selected card
    };

    const deleteCard = async (card: TCard) => {
        try {
            await axios.delete(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
                {
                    headers: {
                        'x-auth-token': token
                    },
                    data: { // Use 'data' for the body of the DELETE request
                        bizNumber: card.bizNumber
                    }
                }
            );
            toast.success('Card deleted successfully');
        } catch (error) {
            toast.error('Error deleting card');
        }
    }

    useEffect(() => {
        getData();
    }, [cards]);

    return (
        <PageContainer>
            <PageTitle>My Cards</PageTitle>
            <Title className='text-[1.7rem] pb-3 text-center'>Take Control of Your Business Cards: Create, Modify, and Remove as You Wish</Title>

            <div className="flex flex-row flex-wrap justify-between w-5/6 gap-1 m-auto mt-6 text-center">
                {searchCards()!.map((item: TCard) => {
                    return (
                        <Card key={item._id}
                            className="xl:w-[24%] lg:w-[32%] md:w-[40%] sm:w-[60%] w-[80%] m-auto mb-3 relative"
                        >
                            <div onClick={() => { navToCard(item._id) }}>
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

                            <div className={`flex justify-between flex-row`}>

                                {(isCardLiked(item) ?
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

                                <TbEdit
                                    className='text-2xl cursor-pointer dark:text-white'
                                    onClick={() => editCard(item)}
                                    title='Edit'
                                />

                                <TbTrash
                                    className='text-2xl cursor-pointer dark:text-white'
                                    onClick={() => deleteCard(item)}
                                    title='Delete'
                                />
                            </div>
                            {/* {} */}
                        </Card>
                    );
                })
                }
            </div>
            <div className='fixed bottom-20 right-5'>
                <TbSquarePlus2
                    className='sticky text-5xl cursor-pointer dark:text-white'
                    onClick={() => nav('/CreateCard')}
                    title='Add Card'
                />
            </div>

            {isModalOpen && (
                <EditCardModal
                    isOpen={isModalOpen}
                    card={selectedCard}
                    onClose={handleCloseModal}
                />
            )}
        </PageContainer>
    );
}

export default MyCards;