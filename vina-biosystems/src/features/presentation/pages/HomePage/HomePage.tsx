import { Header, SidebarMenu } from "../../components";
import { Home, Content, ImgContainer } from "./styles";
import { Image } from "antd";
import simboloVinaIniciar from "../../utils/simboloVinaIniciar.png"
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
                        src={simboloVinaIniciar}
                        alt="Símbolo da Vina Biotech verde com opacidade reduzida"
                        preview={false}
                    />
                </ImgContainer>
            </Content>
        </Home>
    )
}

export default HomePage;