/* eslint-disable tailwindcss/classnames-order */
type PageFormContainerProps = {
    children: React.ReactNode;
}

const PageFormContainer = (props: PageFormContainerProps) => {
    const { children } = props;

    return (
        <div className="h-[85vh] dark:bg-[var(--secondary-color)] flex justify-center items-center">
            {children}
        </div>
    );
}

export default PageFormContainer;