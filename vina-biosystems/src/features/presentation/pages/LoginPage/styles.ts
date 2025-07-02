import { Button } from "antd";
import styled from "styled-components";

export const LoginArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F1E7DB;
    
`;

export const FormArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #F1E7DB;
    background-color: #0E3226;
    min-height: 100vh;
    font-size: 24px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);

    p {
        margin: 0;
    }

    #loginForm {
        margin: 100px 0 0;
        width: 400px;
    }

    a {
        color: #F1E7DB;
        padding: 0 130px;

        &:hover {
            color: #F1E7DB !important;
        }
    }
    
    #loginForm_submitButton {
        width: 280px;
        height: 60px;
        margin-top: 10px;
    }
    
`;

export const StyledButton = styled(Button)`
    background-color: #F1E7DB;
    width: 100px;

    &:hover {
        background-color: #F1E7DB !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    span {
        color: #0E3226;
        font-weight: 500;
        font-size: 24px;
    }
`;
