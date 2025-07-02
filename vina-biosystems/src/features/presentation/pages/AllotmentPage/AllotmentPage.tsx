import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, SidebarMenu } from "../../components";
import { GlobalStyle } from "./components/AllotmentTable/styles";
import { Users, TableStyle, Content, Container } from "./styles";
import AllotmentTable from "./components/AllotmentTable/AllotmentTable";
import { AllotmentColumns } from "./components/AllotmentTable/types";

import { Injector } from "../../../../core/Injector";
import { BatchModel } from "../../../domain/models/batchModel";
import { ProductModel } from "../../../domain/models/productModel";


function AllotmentPage() {
    const [allotments, setAllotments] = useState<AllotmentColumns[]>([]);
    const navigate = useNavigate();
    const [productList, setProductList] = useState<ProductModel[]>([]);

    const loadProductList = useCallback(async () => {
        try {
            const viewProductsUsecase = Injector.getInstance().getViewProductsUsecase();
            const products = await viewProductsUsecase.execute();
            setProductList(products);
        } catch (error) {
            console.error('Erro ao carregar lista de produtos:', error);
            setProductList([]);
        }
    }, []);

    const getAllotmentData = useCallback(async () => {
        try {
            const viewProductionBatchesUsecase = Injector.getInstance().getViewProductionBatchesUsecase();
            const batches = await viewProductionBatchesUsecase.execute();

            const dataSource: AllotmentColumns[] = batches.map((batch: BatchModel) => ({
                key: batch.getId()?.toString() || '',
                rotulo: batch.getLabel() || '',
                situacao: batch.getSituation() || '',
                productId: batch.getProductId() as number,
                productQuantity: batch.getProductQuantity() as number
            }));

            setAllotments(dataSource);
        } catch (error) {
            console.error('Erro ao buscar lotes:', error);
            setAllotments([]);
        }
    }, []);

    useEffect(() => {
        getAllotmentData();
        loadProductList();
    }, [getAllotmentData]);

    const handleNewAllotment = useCallback(() => {
        navigate('/novo-lote');
    }, [productList]);
    return (
        <Users>
            <SidebarMenu />
            <Container>
                <Header
                    showButton={true}
                    title="Lotes"
                    buttonName="Novo lote"
                    actionButton={handleNewAllotment}
                />
                <Content>
                    <TableStyle>
                        <GlobalStyle />
                        <AllotmentTable
                            dataSource={allotments}
                            getAllotmentData={getAllotmentData}
                            productList={productList}
                        />
                    </TableStyle>
                </Content>
            </Container>
        </Users>
    )
}

export default AllotmentPage;