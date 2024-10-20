type TitleProps = {
    children: React.ReactNode;
    className?: string;
}

const Title = (props: TitleProps) => {
    const { children, className } = props;

    return (
        <h1 className={`mb-5 text-4xl font-bold text-[var(--primary-color)] dark:text-[var(--background-color)] ${className}`}>{children}</h1>
    );
}

export default Title;