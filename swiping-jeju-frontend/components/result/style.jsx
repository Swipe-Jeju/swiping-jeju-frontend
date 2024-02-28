import styled from "styled-components";

export const HotPlaceListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    color: #333;
    grid-gap: 0.7rem;
`;

export const HotPlaceBox = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 10px;
    background-color: #fff;
    padding: 0.5rem;
    align-items: center;
    border-radius: 20px;
    cursor: pointer;
`;

export const ShareContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 2rem 0 1rem 0;
    gap: 1rem;
`;

export const ShareButton = styled.div``;
