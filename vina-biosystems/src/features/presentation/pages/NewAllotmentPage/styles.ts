import { DatePicker, Form, Input, Select, Table } from "antd";
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
`;

export const StyledTable = styled(Table)`
  &.ant-table-wrapper {
    width: 98% !important;
    max-width: 98% !important;
    min-width: 98% !important;
    
    .ant-table {
      background: #ffffff;
      table-layout: fixed !important;
      width: 98% !important;
      
      .ant-table-container {
        border-left: 1px solid #f0f0f0;
        width: 98% !important;
        
        .ant-table-thead > tr > th {
          background: #ffffff;
          color: #333;
          font-weight: 600;
          border-bottom: 2px solid #f0f0f0;
          padding: 16px;
          width: auto !important;
        }
        
        .ant-table-tbody > tr > td {
          background: #ffffff;
          border-bottom: 1px solid #f0f0f0;
          padding: 12px 16px;
          transition: background 0.3s;
          width: auto !important;
        }
        
        .ant-table-tbody > tr:hover > td {
          background: #fafafa;
        }
        
        .ant-table-cell {
          &:first-child {
            border-left: 1px solid #f0f0f0;
          }
        }
      }
    }
    
    .ant-table-pagination.ant-pagination {
      margin: 16px;
      background: white;
      padding: 8px;
      border-radius: 4px;
    }
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  overflow-x: auto;
`;

export const FormStyled = styled(Form)`
    position: relative;
    top: 20px;
    width: 96%;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;

    div {
        width: 500px;
    }
`;

export const SelectStyled = styled(Select)`
  &.ant-select:hover .ant-select-selector {
    border-color: #0E3226 !important;
  }

  &.ant-select-focused .ant-select-selector {
    border-color: #0E3226 !important;
    box-shadow: #0E3226 !important;
  }

  .ant-select-selector {
    min-height: 40px;
    border-radius: 8px !important;
    padding: 4px 8px !important;
  }

  .ant-select-selection-item {
    background-color: #0E3226 !important;
    color: #F1E7DB !important;
    padding: 2px 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  .ant-select-selection-item-remove {
    color: #F1E7DB !important;

    &:hover {
      color: #F1E7DB !important;
    }
  }

  .ant-select-arrow {
    color: #0E3226;
  }

  .ant-select-dropdown {
    border-radius: 8px;
  }
`;

export const InputStyled = styled(Input)`
  &.ant-input:hover,
  &.ant-input:focus {
    border-color: #0E3226 !important;
    color: #0E3226 !important;
    box-shadow: #0E3226 !important;
  }
`;

export const DatePickerStyled = styled(DatePicker)`
    &.ant-picker:hover {
    border-color: #0E3226 !important;
  }

  &.ant-picker-focused {
    border-color: #0E3226 !important;
    box-shadow: #0E3226 !important;
  }
`;