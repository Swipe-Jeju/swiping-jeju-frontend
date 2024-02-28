/** @type {import('next').NextConfig} */

const APIURL = "www.dgu-bamboo.com";

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // image url test로 추가 나중에 삭제해주세요
    images: {
        domains: ["https://www.test.com/"],
    },

    async redirects() {
        return [
            // 외부 링크 - 인스타그램
            {
                source: "/swping-jeju-instagram",
                destination: "https://www.instagram.com/swping_jeju",
                permanent: false,
            },
        ];
    },
    async rewrites() {
        return [
            // 홈 지도 GET
            {
                source: "/home/map",
                destination: `https://${APIURL}/api/v1/home/map`,
            },
            // 키워드 , 자연어 POST
            {
                source: "/home/search",
                destination: `https://${APIURL}/api/v1/home/search`,
            },
            // 앨범 생성 UPDATE
            {
                source: "/album",
                destination: `https://${APIURL}/api/v1/album`,
            },
            // 앨범 디테일 아이디값 토대로 GET
            {
                source: "/album/:id",
                destination: `https://${APIURL}/api/v1/album/:id`,
            },
        ];
    },
};

module.exports = nextConfig;
