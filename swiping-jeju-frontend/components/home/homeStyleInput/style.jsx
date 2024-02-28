import styled from "styled-components";

export const StyleInputContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-left: 2.75rem;
    padding-right: 2.75rem;
`;

export const StyleInputTitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    /* border: 1px solid #ffffff; */
`;
export const StyleInputTitle = styled.h1`
    font-size: 39px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.25;
    // sapcing gap
    margin-bottom: 3rem;
    margin-top: 1rem;

    letter-spacing: 0.1rem;
`;

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    font-size: 1rem;
`;

export const StyledInput = styled.input`
    width: 100%;
    border-radius: 10px;
    height: 100%;
    border: none;
    background: none;
    padding-left: 1rem;
    font-weight: 500;
    border: 1px solid #00ff66;
    background-color: #ffffff;
    color: #333;
    padding: 1rem 0.7rem;
    &:focus {
        outline: none;
    }
`;
export const StyledInputCounter = styled.p`
    display: flex;
    justify-content: flex-end;
    font-size: 0.8rem;
    color: #ffffff;
    margin-top: 0.5rem;
    margin-left: 1rem;
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
    cursor: pointer;
    background-color: white;
    color: #333;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
`;

export const ResetKeywordBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
    font-size: 0.8rem;
    background-color: transparent;
    border: 1px solid #04c96b;
    color: #ffffff;
`;

export const ResetKeywordBtnContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 1rem;
`;

export const NextButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 13.5rem;
`;
