import React, { useEffect } from "react";
import Image from "next/image";

import KakaoImage from "@/public/images/share/kakao.png";
import GoogleImage from "@/public/images/share/google.png";
import FacebookImage from "@/public/images/share/facebook.png";
import NaverImage from "@/public/images/share/naver.png";
import * as S from "./style";

const KakaoShareButton = ({ description }) => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    useEffect(() => {
        if (typeof window !== "undefined") {
            const { Kakao } = window;

            if (!Kakao.isInitialized()) {
                Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
            }
        }
    }, []);

    const handleShare = () => {
        const { Kakao } = window;

        Kakao.Share.sendDefault({
            objectType: "feed",
            content: {
                title: "스와이핑 제주",
                description: "스와이핑 해서 만드는 나만의 제주도를 만들어봐요!",
                imageUrl:
                    "https://velog.velcdn.com/images/seochan99/post/d0181e19-d4bf-4e1b-bafa-9948e1ccc067/image.png",
                link: {
                    mobileWebUrl: shareUrl,
                    webUrl: shareUrl,
                },
            },
            buttons: [
                {
                    title: "나도 하러가기",
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                },
            ],
        });
    };

    return (
        <S.ShareContainer>
            <S.ShareButton onClick={handleShare}>
                <Image
                    className="w-10 h-10 cursor-pointer"
                    src={KakaoImage}
                    width={40}
                    alt="카카오톡 공유 이미지"
                />
            </S.ShareButton>
            <S.ShareButton onClick={handleShare}>
                <Image
                    className="w-10 h-10 cursor-pointer"
                    src={NaverImage}
                    width={40}
                    alt="카카오톡 공유 이미지"
                />
            </S.ShareButton>
            <S.ShareButton onClick={handleShare}>
                <Image
                    className="w-10 h-10 cursor-pointer"
                    src={FacebookImage}
                    width={40}
                    alt="카카오톡 공유 이미지"
                />
            </S.ShareButton>
            <S.ShareButton onClick={handleShare}>
                <Image
                    className="w-10 h-10 cursor-pointer"
                    src={GoogleImage}
                    width={40}
                    alt="카카오톡 공유 이미지"
                />
            </S.ShareButton>
        </S.ShareContainer>
    );
};

export default KakaoShareButton;
