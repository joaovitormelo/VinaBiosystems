import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import styled from "styled-components";

export const FinishAllotment = styled.div`
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

export const FormStyled = styled(Form)`
    position: relative;
    top: 20px;
    width: 96%;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;

    div {
        width: 600px;
    }
`;

export const SelectStyled = styled(Select)`
  &.ant-select:hover .ant-select-selector {
    border-color: #0E3226 !important;
  }

  &.ant-select-focused .ant-select-selector {
    border-color: #0E3226 !important;
    box-shadow: #0E3226;
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

export const Line = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  width: 150px;
  font-weight: 600;
  color: #6B2E2E;
`;

export const InputNumberStyled = styled(InputNumber)`
  flex: 1;
  border-radius: 8px !important;
  padding: 6px 12px;

  &.ant-input-number {
    border: 1px solid transparent;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      border-color: #0E3226 !important;
    }

    &:focus-within {
      border-color: #0E3226 !important;
    }
  }

  input {
    color: #0E3226 !important;
    font-weight: 500;
    border: none;
    outline: none;
  }

  .ant-input-number-handler-wrap {
    display: none;
  }
`;