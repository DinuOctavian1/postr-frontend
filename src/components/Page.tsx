import { Topbar } from '../layouts/Topbar';

interface IProps {
    children: React.ReactNode;
}

const Page = ({ children }: IProps) => {
    return (
        <>
            <Topbar />
            {children}
        </>
    );
};

export default Page;
