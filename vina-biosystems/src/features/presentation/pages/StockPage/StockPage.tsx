import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, SidebarMenu } from "../../components";
import { GlobalStyle } from "./components/StockTable/styles";
import { Users, TableStyle, Content, Container } from "./styles";
import { Table } from "antd";
import StockTable from "./components/StockTable/StockTable";
import { StockColumns } from "./components/StockTable/types";
import { Injector } from "../../../../core/Injector";
import { RawMaterialModel } from "../../../domain/models/rawMaterialModel";

function StockPage() {
    const [stockData, setStockData] = useState<StockColumns[]>([]);
    const navigate = useNavigate();

    const getStockData = useCallback(async () => {
        try {
            const viewRawMaterialInventoryUsecase = Injector.getInstance().getViewRawMaterialInventoryUsecase();
            const rawMaterials = await viewRawMaterialInventoryUsecase.execute();

            if (!Array.isArray(rawMaterials)) {
                console.error("Dados recebidos não são um array:", rawMaterials);
                setStockData([]);
                return;
            }

            const formattedData: StockColumns[] = rawMaterials.map((material: RawMaterialModel) => ({
                key: material.getId().toString(),
                nomeInsumo: material.getName(),
                quantidadeAtual: material.getQuantity(),
                quantidadeMinima: material.getMinQuantity()
            }));

            setStockData(formattedData);
        } catch (error) {
            console.error("Erro ao buscar dados do estoque:", error);
            setStockData([]);
        }
    }, []);

    useEffect(() => {
        getStockData();
    }, [getStockData]);

    const handleNewSupply = () => {
        navigate('/novo-insumo');
    };
    return (
        <Users>
            <SidebarMenu />
            <Container>
                <Header
                    showButton={true}
                    title="Estoque"
                    buttonName="Novo Insumo"
                    actionButton={handleNewSupply}
                />
                <Content>
                    <TableStyle>
                        <GlobalStyle />
                        <StockTable dataSource={stockData} />
                    </TableStyle>
                </Content>
            </Container>
        </Users>
    )
}

export default StockPage;