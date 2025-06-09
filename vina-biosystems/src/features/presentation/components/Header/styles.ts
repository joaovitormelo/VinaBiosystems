import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #F1E7DB;
  color: #6B2E2E;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 0;
  position: relative;
`;

export const Subtitle = styled.p`
  font-size: 24px;
  font-weight: normal; 
  margin: 2px 0 0;
  color: #6B2E2E;
  position: relative;
`;

export const Button = styled.button`
  background-color: #6B2E2E;
  position: relative;
  right: 50px;
  color: #F1E7DB;
  font-size: 24px;
  font-weight: bold;
  width: 215px;
  height: 50px; 
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color:rgb(91, 39, 39);
  }
`;

export const PageWrapper = styled.div`
  margin-left: 420px;
  display: flex;
  flex-direction: column;
`;