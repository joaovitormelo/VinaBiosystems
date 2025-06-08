import React from "react";
import { Header, SidebarMenu } from "../../components";
import { Home } from "./styles";
import { Image } from "antd";
import cafeBordoIniciar from "../../utils/cafeBordoIniciar.png"

function HomePage(){
    return(
        <Home>
            <SidebarMenu />
            <div>
                <Header 
                    showButton={false} 
                    title="Seja bem-vindo!" 
                    subtitle="Acesse o menu lateral para navegação" 
                />

                <Image 
                    src={cafeBordoIniciar}
                    alt="Grãos de café espalhados pela página"
                    preview={false}
                />
            </div>
        </Home>
    )
}

export default HomePage;