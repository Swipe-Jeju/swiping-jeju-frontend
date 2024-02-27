import { useRouter } from "next/router";
import * as S from "./style";
import React from "react";
// import logo from "../components/image/logo.png";

export default function NotFound404() {
    const router = useRouter();

    return (
        <S.NotFoundWrap>
            <S.NotFoundText>NOT FOUND!</S.NotFoundText>
            <S.NotFoundImg src={logo} alt="logo" />
            <S.NotFoundContent>
                요청하신 페이지를 찾을 수 없습니다.
                <br />
                입력하신 주소가 정확한지 확인해주세요.
            </S.NotFoundContent>
            <S.NotFoundButton
                onClick={() => {
                    router.push(`/`);
                }}
            >
                홈으로
            </S.NotFoundButton>
        </S.NotFoundWrap>
    );
}
