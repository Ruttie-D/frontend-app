/* eslint-disable tailwindcss/classnames-order */
import { Link } from "react-router-dom";

import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const nav = useNavigate();

    const navHome = () => {
        nav('/home');
    }

    return (
        <div className="dark:bg-[var(--primary-color)] h-[85vh] dark:text-[#1f2937] text-center flex flex-col gap-7 pt-5 text-[var(--primary-color)]">
            <h1 className="text-9xl ">404</h1>
            <p className="text-5xl"> 🤷🏻‍♀️ Page was not found!!!</p>

            <Button onClick={navHome}
                className="mx-auto mt-5 w-36 dark:bg-[#1f2937] bg-[var(--primary-color)] hover:bg-[(--secondary-color)]">
                Go Home
            </Button>
            <Link to="/about">About</Link>
        </div>
    );
}

export default Error;