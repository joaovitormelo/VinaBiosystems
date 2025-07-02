import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, SidebarMenu } from "../../components";
import { Products, TableStyle, Content, Container } from "./styles";
import { Injector } from "../../../../core/Injector";
import { RawMaterialModel } from "../../../domain/models/rawMaterialModel";
import { ProductColumns } from "./components/types";
import { GlobalStyle } from "./components/styles";
import ProductTable from "./components/ProductTable";

function ProductPage() {
    const [productData, setProductData] = useState<ProductColumns[]>([]);
    const navigate = useNavigate();

    const getProductData = useCallback(async () => {
        try {
            const viewRawMaterialInventoryUsecase = Injector.getInstance().getViewRawMaterialInventoryUsecase();
            const rawMaterials = await viewRawMaterialInventoryUsecase.execute();

            if (!Array.isArray(rawMaterials)) {
                console.error("Dados recebidos não são um array:", rawMaterials);
                setProductData([]);
                return;
            }

            const formattedData: ProductColumns[] = rawMaterials.map((material: RawMaterialModel) => ({
                key: material.getId().toString(),
                nomeProduto: material.getName(),
                quantidadeAtual: material.getQuantity(),
            }));

            setProductData(formattedData);
        } catch (error) {
            console.error("Erro ao buscar dados de produtos:", error);
            setProductData([]);
        }
    }, []);

    useEffect(() => {
        getProductData();
    }, [getProductData]);

    const handleNewSupply = () => {
        navigate('/novo-produto');
    };
    return (
        <Products>
            <SidebarMenu />
            <Container>
                <Header
                    showButton={true}
                    title="Produto"
                    buttonName="Novo Produto"
                    actionButton={handleNewSupply}
                />
                <Content>
                    <TableStyle>
                        <GlobalStyle />
                        <ProductTable dataSource={productData} getProductData={getProductData} />
                    </TableStyle>
                </Content>
            </Container>
        </Products>
    )
}

export default ProductPage;