import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// style

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  min-width: 280px;
  max-width: 90%;

  border-radius: 16px;
  height: 200px;
  background-color: #fff;

  padding: 25px;
  box-shadow: 0px 2px 6px 0px rgba(98, 98, 114, 0.2);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const StyledButton = styled.button`
  width: ${(props) => (props.isAlert ? "100%" : "45%")};
  height: 50px;
  border-radius: 8px;
  color: #fff;
  border: none;
  font-size: 20px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  text-align: center;
  border: ${(props) => (props.border ? props.border : "none")};
`;

const CustomModal = ({
  onConfirm,
  onClose,
  bodyText,
  cancelText,
  confirmText,
  isAlert = false,
}) => {
  return (
    <Overlay onClick={onClose}>
      <Container>
        <p
          style={{
            fontSize: "20px",
            textAlign: "start",
            color: "#000",
            lineHeight: "1.5",
            maxWidth: "90%",
          }}
        >
          {bodyText}
        </p>
        <ButtonContainer>
          {!isAlert && (
            <StyledButton
              onClick={onClose}
              color="black"
              backgroundColor="white"
              border="1px solid #00FF66"
            >
              {cancelText}
            </StyledButton>
          )}
          <StyledButton
            onClick={onConfirm}
            color="black"
            backgroundColor="#80FFB2"
            isAlert={isAlert}
          >
            {confirmText}
          </StyledButton>
        </ButtonContainer>
      </Container>
    </Overlay>
  );
};

export default CustomModal;
