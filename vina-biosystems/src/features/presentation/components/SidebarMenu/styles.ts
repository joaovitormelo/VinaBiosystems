import styled from "styled-components";
import { Image, Layout } from "antd";

const { Sider } = Layout;

export const Sidebar = styled(Sider)`
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    background-color: #0E3226;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    max-width: 320px !important;
    min-width: 320px !important;
    width: 320px !important;
    
    .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .ant-menu {
        background: transparent;
    }

    .ant-menu-item {
        color: #F1E7DB;
        margin: 0;
        font-size: 24px;
        padding: 30px 0;


        &:hover {
            color: #0E3226;
            background-color: #F1E7DB !important;
            font-weight: 500;
        }
    }
    
    .anticon {
        font-size: 24px !important;
        color: #F1E7DB !important;

        &:hover {
            color: #0E3226 !important;
            z-index: 999;
        }
    }

    .ant-menu-light .ant-menu-item-selected {
        background-color: #F1E7DB !important;
        color: #0E3226 !important;
        font-weight: 500;
    }
`;

export const ExitButton = styled.div`
    text-align: center;
    margin-bottom: 16px;
    a {
        color: #F1E7DB; 
        font-weight: 500;
        font-size: 18px;


        &:hover {
            color: #F1E7DB !important;
        }
    }
`;

export const Logo = styled(Image)`
    width: 318px;
    height: 242px;
    text-align: center;

`;