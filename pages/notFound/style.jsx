import Image from "next/image";
import styled from "styled-components";

export const NotFoundWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 90%;
    margin: 30% 5%;
`;

export const NotFoundText = styled.div`
    color: #04c96b;
    font-weight: 700;
    font-size: 24px;
`;

export const NotFoundImg = styled(Image)`
    width: 30%;
    height: auto;
    margin: 10% 0;
`;

export const NotFoundContent = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
    color: #727272;
`;

export const NotFoundButton = styled.button`
    width: 100%;
    background-color: #04c96b;
    border: none;
    border-radius: 14px;
    padding: 5%;
    color: #fff;
    margin-top: 10%;
    cursor: pointer;
`;
