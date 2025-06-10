import React, { useCallback } from "react";
import { Header, SidebarMenu } from "../../components";
import { GlobalStyle} from "./components/StockTable/styles";
import { Users, TableStyle, Content, Container} from "./styles";
import { Table } from "antd";
import StockTable from "./components/StockTable/StockTable";
import { StockColumns } from "./components/StockTable/types";

function StockPage(){
  const getStockData = useCallback(() => {
    //ALTERAR LÓGICA, APENAS UM EXEMPLO PARA NAO TER ERRO.
    const dataSource: StockColumns[] = [
        {
        key: '1',
        nomeInsumo: 'Insumo 1',
        quantidadeAtual: 10,
        quantidadeMinima: 5
        },
        {
        key: '2',
        nomeInsumo: 'Insumo 2',
        quantidadeAtual: 7,
        quantidadeMinima: 2
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
                        <StockTable dataSource={getStockData()}/>
                    </TableStyle>
                </Content>

            </Container>
                
        </Users>
    )
}

export default StockPage;