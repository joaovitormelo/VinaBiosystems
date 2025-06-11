import React, { useCallback, useEffect, useState } from "react";
import { Header, SidebarMenu } from "../../components";
import { Container, Content, NewAllotment, InfoContainer, InfoItem, Label, Value, InsumosList, InsumoItem } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Injector } from "../../../../core/Injector";
import { BatchModel } from "../../../domain/models/batchModel";
import { RawMaterialInBatch } from "../../../domain/types/rawMaterialInBatch";
import { RawMaterialModel } from "../../../domain/models/rawMaterialModel";
import { message } from "antd";
import moment from "moment";

interface AllotmentInfoPageProps {
    rotulo: string;
    situacao: string;
}

interface MaterialInfo {
    id: number;
    name: string;
    quantity: number;
    unit: string;
}

function AllotmentInfoPage({ rotulo, situacao }: AllotmentInfoPageProps) {
    const [batchData, setBatchData] = useState<BatchModel | null>(null);
    const [materialsInfo, setMaterialsInfo] = useState<MaterialInfo[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const location = useLocation();

    const loadBatchData = useCallback(async () => {
        try {
            const viewProductionBatchesUsecase = Injector.getInstance().getViewProductionBatchesUsecase();
            const batches = await viewProductionBatchesUsecase.execute();
            const batch = batches.find(b => b.getLabel() === rotulo);
            
            if (!batch) {
                messageApi.error({
                    type: 'error',
                    content: 'Lote não encontrado no banco de dados.',
                    duration: 3
                });
                return;
            }

            setBatchData(batch);

            const viewRawMaterialInventoryUsecase = Injector.getInstance().getViewRawMaterialInventoryUsecase();
            const inventory = await viewRawMaterialInventoryUsecase.execute();
            const materialsList = batch.getRawMaterialList() || [];
            
            const materialsInfo = materialsList.map(material => {
                const rawMaterial = inventory.find(rm => rm.getId() === material.getRawMaterialId());
                if (rawMaterial) {
                    return {
                        id: rawMaterial.getId(),
                        name: rawMaterial.getName(),
                        quantity: material.getQuantity(),
                        unit: rawMaterial.getUnit()
                    };
                }
                return null;
            }).filter((info): info is MaterialInfo => info !== null);

            setMaterialsInfo(materialsInfo);
        } catch (error: any) {
            console.error('Erro ao buscar dados do lote:', error);
            messageApi.error({
                type: 'error',
                content: error.message || 'Erro ao buscar dados do lote. Tente novamente.',
                duration: 3
            });
        }
    }, [rotulo, messageApi]);

    useEffect(() => {
        loadBatchData();
    }, [loadBatchData]);

    const handleFinalizarLote = useCallback(() => {
        if (batchData?.getId()) {
            navigate('/finalizar-lote', { 
                state: { 
                    batchId: batchData.getId(),
                    rotulo: batchData.getLabel(),
                    situacao: batchData.getSituation()
                } 
            });
        }
    }, [batchData, navigate]);

    return (
        <NewAllotment>
            {contextHolder}
            <SidebarMenu />
            <Container>
                <Header 
                    title="Lote" 
                    buttonName="Finalizar lote" 
                    showButton={situacao === 'open'} 
                    actionButton={handleFinalizarLote} 
                />
                <Content>
                    <InfoContainer>
                        <InfoItem>
                            <Label>Rótulo:</Label>
                            <Value>{rotulo}</Value>
                        </InfoItem>
                        <InfoItem>
                            <Label>Insumos utilizados:</Label>
                            {materialsInfo.length > 0 ? (
                                <InsumosList>
                                    {materialsInfo.map((material) => (
                                        <InsumoItem key={material.id}>
                                            {material.name}: {material.quantity} {material.unit}
                                        </InsumoItem>
                                    ))}
                                </InsumosList>
                            ) : (
                                <Value>Nenhum insumo informado</Value>
                            )}
                        </InfoItem>
                        <InfoItem>
                            <Label>Data de início:</Label>
                            <Value>
                                {batchData?.getStartDate().format('DD/MM/YYYY')}
                            </Value>
                        </InfoItem>
                        {situacao !== 'Em Aberto' && (
                            <InfoItem>
                                <Label>Data de término:</Label>
                                <Value>
                                    {batchData?.getEndDate().format('DD/MM/YYYY')}
                                </Value>
                            </InfoItem>
                        )}
                    </InfoContainer>
                </Content>
            </Container>
        </NewAllotment>
    );
}

export default AllotmentInfoPage;