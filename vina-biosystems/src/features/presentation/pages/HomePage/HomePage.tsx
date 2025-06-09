import React from "react";
import { Header, SidebarMenu } from "../../components";
import { Home, Content, ImgContainer } from "./styles";
import { Image } from "antd";
import cafeBordoIniciar from "../../utils/cafeBordoIniciar.png"
import { useNavigate } from "react-router-dom";
function HomePage(){

    return(
        <Home>
            <SidebarMenu />
            <Content> 
                <Header 
                    showButton={false} 
                    title="Seja bem-vindo!" 
                    subtitle="Acesse o menu lateral para navegação" 
                />
                <ImgContainer>
                    <Image 
                        src={cafeBordoIniciar}
                        alt="Grãos de café espalhados pela página"
                        preview={false}
                    />
                </ImgContainer>
            </Content>
        </Home>
    )
}

export default HomePage;