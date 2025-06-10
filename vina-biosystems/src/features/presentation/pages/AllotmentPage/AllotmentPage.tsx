import React, { useCallback, useEffect, useState } from "react";
import { Header, SidebarMenu } from "../../components";
import { GlobalStyle } from "./components/AllotmentTable/styles";
import { Users, TableStyle, Content, Container } from "./styles";
import { Table } from "antd";
import AllotmentTable from "./components/AllotmentTable/AllotmentTable";
import { AllotmentColumns } from "./components/AllotmentTable/types";

import { Injector } from "../../../../core/Injector";
import { BatchModel } from "../../../domain/models/batchModel";


function AllotmentPage() {
    const [allotments, setAllotments] = useState<AllotmentColumns[]>([]);

    const getAllotmentData = useCallback(async () => {
        try {
            const viewProductionBatchesUsecase = Injector.getInstance().getViewProductionBatchesUsecase();
            const batches = await viewProductionBatchesUsecase.execute();

            const dataSource: AllotmentColumns[] = batches.map((batch: BatchModel) => ({
                key: batch.getId()?.toString() || '',
                rotulo: batch.getLabel() || '',
                situacao: batch.getSituation() || ''
            }));

            setAllotments(dataSource);
        } catch (error) {
            console.error('Erro ao buscar lotes:', error);
            setAllotments([]);
        }
    }, []);

    useEffect(() => {
        getAllotmentData();
    }, [getAllotmentData]);

    return (
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
                        <GlobalStyle />
                        <AllotmentTable dataSource={allotments} />
                    </TableStyle>
                </Content>
            </Container>
        </Users>
    )
}

export default AllotmentPage;