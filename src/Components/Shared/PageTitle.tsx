/* eslint-disable tailwindcss/classnames-order */
type PageTitleProps = {
    children: React.ReactNode;
}

const PageTitle = (props: PageTitleProps) => {
    const { children } = props;

    return (
        <h1 className="pt-3 m-4 text-4xl text-center">{children}</h1>
    );
}

export default PageTitle;