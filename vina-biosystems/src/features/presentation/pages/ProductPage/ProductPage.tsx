import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, SidebarMenu } from "../../components";
import { Products, TableStyle, Content, Container } from "./styles";
import { Injector } from "../../../../core/Injector";
import { ProductColumns } from "./components/types";
import { GlobalStyle } from "./components/styles";
import ProductTable from "./components/ProductTable";
import { ProductModel } from "../../../domain/models/productModel";

function ProductPage() {
    const [productData, setProductData] = useState<ProductColumns[]>([]);
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const navigate = useNavigate();

    const getProductData = useCallback(async () => {
        try {
            const viewProductsUsecase = Injector.getInstance().getViewProductsUsecase();
            const productList = await viewProductsUsecase.execute();

            setProductList(productList);

            if (!Array.isArray(productList)) {
                console.error("Dados recebidos não são um array:", productList);
                setProductData([]);
                return;
            }

            const formattedData: ProductColumns[] = productList.map((product: ProductModel) => ({
                key: (product.getId() as number).toString(),
                nomeProduto: product.getName(),
                quantidadeAtual: product.getQuantity(),
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
                        <ProductTable
                            dataSource={productData} getProductData={getProductData}
                            productList={productList}
                        />
                    </TableStyle>
                </Content>
            </Container>
        </Products>
    )
}

export default ProductPage;