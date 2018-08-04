import Head from 'next/head';
import Colors from '../constants/colors';

const Meta = () => (
    <div className="meta-info">
        <Head>
            <title>Default title</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <style jsx global>{`
            html,
            body {
                font-family: HelveticaNueue, Helvetica, Arial, sans-sarif;
                padding: 0;
                margin: 0;
                color: ${Colors.font.dark};
                background-color: ${Colors.siteBackgroundColor};
            }
        `}</style>
    </div>
);

export default Meta;
