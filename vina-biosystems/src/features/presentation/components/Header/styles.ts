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
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  position: relative;
  left: 360px;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  font-weight: 400; 
  margin: 2px 0 0;
  color: #6B2E2E;
  position: relative;
  left: 360px;
`;

export const Button = styled.button`
  background-color: #6B2E2E;
  color: #F1E7DB;
  font-size: 1.1rem;
  width: 215px;
  height: 50px; 
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color:rgb(91, 39, 39);
  }
`;
