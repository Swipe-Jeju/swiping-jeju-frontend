import Script from "next/script";
import Footer from "./Footer";
import HeadTitle from "./Head";
import styled from "styled-components";

const Wrapper = styled.div`
    max-width: 430px;
    width: 100%;
    min-height: 100vh;
    background-color: #000000;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    flex: 1 0 auto;
`;

export default function Layout({ children }) {
    return (
        <Wrapper>
            <HeadTitle />
            <Content>{children}</Content>
            <Script
                src="//dapi.kakao.com/v2/maps/sdk.js?appkey=12bb258e4a7f082b0fd557f62e2f109a&libraries=services,clusterer&autoload=false"
                strategy="beforeInteractive"
            />
            <Script
                src="https://developers.kakao.com/sdk/js/kakao.js"
                strategy="afterInteractive"
            />
            <Footer />
        </Wrapper>
    );
}
