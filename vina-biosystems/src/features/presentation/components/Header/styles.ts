import styled from "styled-components";

export const Container = styled.header`
  background-color: #F1E7DB;
  color: #6B2E2E;
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Text = styled.div`
  /* margin-left: 350px; */
  text-align: start;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 24px; 
  font-weight: normal; 
  margin: 0.125rem 0 0; 
  color: #6B2E2E;
`;

export const Button = styled.button`
  background-color: #6B2E2E;
  position: relative;
  right: 50px;
  margin-right: 50px;
  color: #F1E7DB;
  font-size: 1.5rem;
  font-weight: bold;
  width: 215px; 
  height: 50px;  
  border: none;
  border-radius: 6px; 
  cursor: pointer;
  margin: 8px;

  &:hover {
    background-color: rgb(91, 39, 39);
  }
`;