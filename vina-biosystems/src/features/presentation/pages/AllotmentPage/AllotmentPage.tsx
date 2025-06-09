import React, { useCallback } from "react";
import { Header, SidebarMenu } from "../../components";
import { GlobalStyle} from "./components/AllotmentTable/styles";
import { Users, TableStyle, Content, Container} from "./styles";
import { Table } from "antd";
import AllotmentTable from "./components/AllotmentTable/AllotmentTable";
import { AllotmentColumns } from "./components/AllotmentTable/types";

function AllotmentPage(){
  const getAllotmentData = useCallback(() => {
    //ALTERAR LÓGICA, APENAS UM EXEMPLO PARA NAO TER ERRO.
    const dataSource: AllotmentColumns[] = [
        {
        key: '1',
        rotulo: 'Lote 1',
        situacao: 'Em andamento'
        },
        {
        key: '2',
        rotulo: 'Lote 2',
        situacao: 'Finalizado'
        }
    ];
    return dataSource;
  }, []);

    return(
        <Users>
            <SidebarMenu />
            <Container>
                <Header 
                    showButton={true} 
                    title="Lotes" 
                    buttonName="Novo lote"
                />
                <Content>
                    <TableStyle>
                        <GlobalStyle/>
                        <AllotmentTable dataSource={getAllotmentData()}/>
                    </TableStyle>
                </Content>

            </Container>
                
        </Users>
    )
}

export default AllotmentPage;