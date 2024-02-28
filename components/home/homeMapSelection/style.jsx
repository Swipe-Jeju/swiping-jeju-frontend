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
    width: 40%;
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
`;

export const SelectionButton = styled.button`
    width: 100%;
    height: 3rem;
    margin-top: 1rem;
    font-size: 1.5rem;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #e0e0e0;
    }
`;

export const MapOption = styled.div`
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    background-color: ${(props) => (props.selected ? "lightblue" : "white")};
    color: ${(props) => (props.disabled ? "grey" : "black")};
`;
