import styled from "styled-components";

export const Home = styled.div`
    background-color: #F1E7DB;
    display: flex;
    justify-content: flex-end;
    min-height: 100vh;
`;

export const Content = styled.div`
    margin-left: 350px;

    Header {
        margin-left: 390px;
        margin-top: 50px;
        width: 70%;
    }


    img {
        max-width: 600px;
        max-height: 550px;
        height: auto;
        width: auto;
    }
`;

export const ImgContainer = styled.div `
    width: 100vw;
    text-align: end;
`