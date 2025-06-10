import { Table } from 'antd';
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  padding: 1.5rem; 
  background-color: #f9f9f9;
  border-radius: 0.75rem; 
  overflow-x: auto; 
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem; 
  color: #0E3226;
  font-size: 1.5rem; 

  &:hover {
    color: #0E3226;
  }

`;

export const GlobalStyle = createGlobalStyle`
  .ant-table thead > tr > th.ant-table-cell::before {
    display: none !important;
  }
`;

export const CustomTable = styled(Table)`
  .ant-table {
    background-color: #FFFFFF;
    color: #000000;
    font-size: 1rem; 
  }

  .ant-table-thead > tr > th {
    background-color: #6B2E2E;
    color: #F1E7DB;
    font-weight: bold;
    font-size: 1rem;
    text-align: center !important;
    justify-content: center !important;
    white-space: nowrap; 
    border-right: 1px solid rgba(255, 255, 255, 0.3) !important;
  }

  .ant-table-tbody > tr > td {
    background-color: #fffaf5;
    color: #6B2E2E;
    text-align: center !important;
    word-break: break-word; 
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #e9e9e9;
  }

`;