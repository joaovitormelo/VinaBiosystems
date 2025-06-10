import { DatePicker, Form, Input, Select } from "antd";
import styled from "styled-components";

export const NewAllotment = styled.div`
    background-color: #F1E7DB;
    min-height: 100vh;
    position: relative;
    left: 3.125rem;
    margin-right: 3.125rem;

    Header {
      margin-left: 390px;
      margin-top: 30px;
      width: 70%;
    }
`;
export const Content = styled.div `
  margin-left: 390px;
  margin-top: 50px;
  text-align: start;
`;

export const Container = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1500px;
  width: 95%;
`;

export const InfoContainer = styled.div`
    padding: 20px;
    background: #fff;
    border-radius: 8px;
`;

export const InfoItem = styled.div`
    margin-bottom: 16px;
`;

export const Label = styled.div`
    font-weight: bold;
    margin-bottom: 4px;
    color: #6B2E2E;
`;

export const Value = styled.div`
    color: #666;
    padding: 8px;
    background: #f5f5f5;
    border-radius: 4px;
`;

export const InsumosList = styled.div`
    background: #f5f5f5;
    border-radius: 4px;
    padding: 8px;
`;

export const InsumoItem = styled.div`
    padding: 6px 8px;
    margin: 4px 0;
    background: #fff;
    border-radius: 3px;
    border-left: 3px solid #0E3226;
`;