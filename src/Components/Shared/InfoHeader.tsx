/* eslint-disable tailwindcss/classnames-order */

type InfoHeaderProps = {
    children: React.ReactNode;
    className?: string;
}

const InfoHeader = ({ children, className = "" }: InfoHeaderProps) => {

    return (
        <h1 className={`mb-2 ml-4 text-2xl text-center pt-7 ${className}`}>{children}</h1>
    );
}

export default InfoHeader;