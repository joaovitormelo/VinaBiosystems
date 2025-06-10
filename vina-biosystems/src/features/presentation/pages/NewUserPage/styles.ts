import { DatePicker, Form, Input, Select } from "antd";
import styled from "styled-components";

export const Profile = styled.div`
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