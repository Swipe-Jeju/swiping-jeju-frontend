import Home from "./home";
import styled from "styled-components";

export const Container = styled.div``;

export default function Main() {
  return (
    <Container>
      {/* 홈 화면 */}
      <Home />
    </Container>
  );
}
