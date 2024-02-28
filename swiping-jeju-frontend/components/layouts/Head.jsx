import Head from "next/head";
import Script from "next/script";

export default function HeadTitle() {
    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            ></meta>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <title>스와이핑 제주!</title>
            <meta name="description" content="나만의 제주도, 스와이핑 제주" />
        </Head>
    );
}
