import styled from "styled-components";

export const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
