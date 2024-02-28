import styled from "styled-components";

export const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-left: 2.75rem;
    padding-right: 2.75rem;
`;

// MapImage
export const MapImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 260px;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    /* border: 1px solid #ffffff; */
`;

export const MapTitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    /* border: 1px solid #ffffff; */
`;
export const MapTitle = styled.h1`
    font-size: 39px;
    font-weight: 700;
    color: #ffffff;

    // sapcing gap
    margin-bottom: 3rem;
    margin-top: 1rem;

    letter-spacing: 0.1rem;
    line-height: 1.25;
`;

export const SelectionButton = styled.button`
    width: 100%;
    height: 3rem;
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: #80ffb2;
    border: 1px solid #00ff66;
    cursor: pointer;
    border-radius: 10px;
`;

export const MapOptionSelectionContainer = styled.div`
    margin-top: 15px;
    width: 100%;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const MapClickPointer1 = styled.div`
    position: absolute;
    top: 35%;
    left: 90%;
    width: 30px;
    height: 30px;
    background-color: transparent;
`;
export const MapClickPointer2 = styled.div`
    position: absolute;
    top: 45%;
    left: 75%;
    width: 30px;
    height: 30px;
    background-color: transparent;
`;

export const MapClickPointer3 = styled.div`
    position: absolute;
    top: 60%;
    left: 67%;
    width: 40px;
    height: 40px;
    background-color: transparent;
`;

export const MapClickPointer4 = styled.div`
    position: absolute;
    top: 64%;
    left: 50%;
    width: 30px;
    height: 40px;
    background-color: transparent;
`;

export const MapOptionContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    margin-top: 50px;
`;
export const MapOption = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 68px;
    border: ${(props) =>
        props.disabled || props.selected
            ? "1px solid #8F8F8F"
            : "1px solid #80FFB2"};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    background-color: ${(props) => (props.selected ? "#8F8F8F" : "white")};
    color: ${(props) => (props.disabled ? "grey" : "#333")};
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
`;

export const MapSelectedOption = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 68px;
    border: 1px solid #00ff66;
    cursor: pointer;
    background-color: #80ffb2;
    color: #333;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
`;
export const NextButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
`;
