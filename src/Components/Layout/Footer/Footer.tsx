/* eslint-disable tailwindcss/classnames-order */
import { Footer as FBFooter } from "flowbite-react";
import { useEffect, useState } from 'react';
import Styles from './Footer.module.css';
import { useSelector } from "react-redux";
import { TRootState } from "../../../Store/BigPie";

const Footer = () => {
    const user = useSelector((state: TRootState) => state.UserSlice.user)
    const [thisYear, setThisYear] = useState<Date>();

    useEffect(() => {
        setThisYear(new Date());
    }, [])

    return (
        <footer className={`${Styles.footer} h-12 fixed bottom-0 left-0 z-20 w-full md:flex md:items-center md:justify-between md:p-6 dark:bg-[#1f2937]`}>
            <span className="text-sm text-gray-500 sm:text-center dark:text-white">
                &copy; {thisYear?.getFullYear()} <a href="#" className="hover:underline">Nexaurio</a>. All Rights Reserved.
            </span>

            <FBFooter.LinkGroup className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
                <FBFooter.Link href="/about" className='hover:underline me-4 md:me-6'>About</FBFooter.Link>

                {user &&
                    <FBFooter.Link href="/favorites">Favorites</FBFooter.Link>}

                {user && user.isBusiness &&
                    <FBFooter.Link href="/myCards">My Cards</FBFooter.Link>}
            </FBFooter.LinkGroup>
        </footer>
    );
};

export default Footer;