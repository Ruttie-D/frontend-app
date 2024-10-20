/* eslint-disable tailwindcss/classnames-order */
type InfoParProps = {
    children: React.ReactNode;
}

const InfoPar = (props: InfoParProps) => {
    const { children } = props;

    return (
        <p className='mb-3 text-xl text-justify'>{children}</p>
    )
}

export default InfoPar;