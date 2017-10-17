import Meta from '../components/Meta';
import ProgressBar from '../components/ProgressBar';

const DefaultLayout = ({
    children,
} : {
    children: any,
}) => (
    <div>
        <Meta />
        <ProgressBar />
        { children }
    </div>
);

export default DefaultLayout;