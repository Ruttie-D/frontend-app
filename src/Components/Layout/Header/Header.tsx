/* eslint-disable tailwindcss/classnames-order */
import { BsPersonLinesFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { BsSuitHeartFill } from "react-icons/bs";
import { Navbar, TextInput } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
import Styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { toast } from "react-toastify";
import { searchActions } from "../../../Store/SearchSlice";
import { TRootState } from "../../../Store/BigPie";

const Header = () => {
    const user = useSelector((state: TRootState) => state.UserSlice.user);
    const dispatch = useDispatch();

    const location = useLocation().pathname;

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(searchActions.searchWord(value))
    }

    return (
        <Navbar fluid className='bg-[var(--secondary-color)] py-4 dark:bg-[#1f2937] '>
            <Navbar.Brand >
                <h1
                    className={`${Styles.headline} text-[var(--primary-color)] self-center text-3xl lg:text-4xl font-semibold whitespace-nowrap dark:text-[var(--secondary-color)]`}
                >
                    Business Cards
                </h1>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <div className="flex flex-row justify-around gap-5 pt-2 text-lg">
                    <Navbar.Link
                        as={Link}
                        href="/home"
                        to="/home"
                        active={location === "/home" || location === '/'}
                    >
                        Home
                    </Navbar.Link>
                    <Navbar.Link
                        as={Link}
                        href="/about"
                        to="/about"
                        active={location === '/about'}
                    >
                        About
                    </Navbar.Link>
                </div>

                <div className="flex flex-row justify-between gap-3"><Navbar.Brand>
                    <DarkThemeToggle />
                </Navbar.Brand>

                    <Navbar.Brand className="md:w-11 lg:w-56">
                        <TextInput rightIcon={CiSearch} onChange={search} />
                    </Navbar.Brand>
                </div>

                <div className="flex flex-row justify-around gap-5 pt-2 pr-3 text-lg">
                    {!user && <Navbar.Link
                        as={Link}
                        href="/login"
                        to="/login"
                        active={location === '/login'}
                    >
                        Login
                    </Navbar.Link>}

                    {!user && <Navbar.Link
                        as={Link}
                        href="/register"
                        to="/register"
                        active={location === '/register'}
                    >
                        Register
                    </Navbar.Link>}

                    {user?.isBusiness && <Navbar.Link
                        as={Link}
                        href="/myCards"
                        to="/myCards"
                        active={location === '/myCards'}
                    >
                        My Cards
                    </Navbar.Link>}

                    {user && < Navbar.Link
                        as={Link}
                        href="/favorites"
                        to="/favorites"
                        active={location === '/favorites'}
                    >
                        <BsSuitHeartFill className="size-6" title="Favorites" />
                    </Navbar.Link>}

                    {user && < Navbar.Link
                        as={Link}
                        href="/profile"
                        to="/profile"
                        active={location === '/profile'}
                    >
                        <BsPersonLinesFill className="size-6" title="Profile" />
                    </Navbar.Link>}

                    {user && <Navbar.Link
                        as={Link}
                        href="/home"
                        to="/home"
                        onClick={() => {
                            toast.success("Logout Successful");
                            dispatch(userActions.logout());
                            localStorage.removeItem("token");
                        }}
                    >
                        <FiLogOut className="size-6" title="Logout" />
                    </Navbar.Link>}
                </div>
            </Navbar.Collapse>
        </Navbar >
    );
};

export default Header;