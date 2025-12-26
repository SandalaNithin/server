import { Helmet } from 'react-helmet-async';

export default function SEOWrapper({ title, description, keywords }) {
    return (
        <Helmet>
            <title>{title} | Lakshmi Function Hall</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
}
