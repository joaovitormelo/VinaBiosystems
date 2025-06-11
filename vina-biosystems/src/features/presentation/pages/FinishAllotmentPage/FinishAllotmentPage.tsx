import React, { useCallback, useEffect, useRef, useState } from "react";
import { Header, SidebarMenu } from "../../components";
import { Form, FormInstance, Select, message } from "antd";
import { Container, Content, DatePickerStyled, FormStyled, FinishAllotment, Line, Label, InputNumberStyled } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Injector } from "../../../../core/Injector";
import { BatchModel } from "../../../domain/models/batchModel";
import { RawMaterialInBatch } from "../../../domain/types/rawMaterialInBatch";
import { RawMaterialModel } from "../../../domain/models/rawMaterialModel";
import { FinishProductionBatchUsecase } from "../../../domain/usecases/production/finishProductionBatchUsecase";
import moment from "moment";

const { Option } = Select;

interface MaterialInfo {
    id: number;
    name: string;
    quantity: number;
    unit: string;
}

function FinishAllotmentPage() {
    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [batchData, setBatchData] = useState<BatchModel | null>(null);
    const [materialsInfo, setMaterialsInfo] = useState<MaterialInfo[]>([]);

    const loadInitialData = useCallback(async () => {
        try {
            const { batchId, rotulo } = location.state as { batchId: number, rotulo: string };
            
            const viewProductionBatchesUsecase = Injector.getInstance().getViewProductionBatchesUsecase();
            const batches = await viewProductionBatchesUsecase.execute();
            const batch = batches.find(b => b.getId() === batchId);
            
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
            
            form.setFieldsValue({
                dataTermino: moment(),
                insumos: materialsInfo.map(material => ({
                    id: material.id,
                    quantidade: material.quantity
                }))
            });
        } catch (error: any) {
            console.error('Erro ao carregar dados do lote:', error);
            messageApi.error({
                type: 'error',
                content: error.message || 'Erro ao carregar dados do lote. Tente novamente.',
                duration: 3
            });
        }
    }, [location.state, form, messageApi]);

    const onFinish = useCallback(async (values: any) => {
        try {
            if (!batchData?.getId()) {
                throw new Error("ID do lote não encontrado.");
            }

            const finishProductionBatchUsecase = Injector.getInstance().getFinishProductionBatchUsecase();
            await finishProductionBatchUsecase.execute(batchData.getId() as number);

            messageApi.success({
                type: 'success',
                content: 'Lote finalizado com sucesso!',
                duration: 2,
                onClose: () => {
                    navigate('/lotes');
                }
            });
        } catch (error: any) {
            console.error('Erro ao finalizar lote:', error);
            messageApi.error({
                type: 'error',
                content: error.message || 'Erro ao finalizar lote. Tente novamente.',
                duration: 3
            });
        }
    }, [batchData, navigate, messageApi]);

    useEffect(() => {
        if (form) {
            formRef.current = form;
        }
    }, [form]);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    return (
        <FinishAllotment>
            {contextHolder}
            <SidebarMenu />
            <Container>
                <Header 
                    title="Finalizar Lote" 
                    subtitle={batchData?.getLabel() || ''} 
                    buttonName="Salvar" 
                    showButton={true} 
                    actionButton={() => formRef.current?.submit()} 
                />
                <Content>
                    <FormStyled
                        form={form}
                        name="finalizarLoteForm"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div>
                            <Form.Item
                                label="Data de término"
                                name="dataTermino"
                                rules={[{ required: true, message:"Por favor, selecione uma data"}]}
                            >
                                <DatePickerStyled
                                    format="DD/MM/YYYY"
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Quantidade dos insumos"
                                name="insumos"
                                required
                            >
                                {materialsInfo.map((material) => (
                                    <Line key={material.id}>
                                        <Label>{material.name} ({material.unit})</Label>
                                        <InputNumberStyled 
                                            min={0} 
                                            placeholder="0" 
                                            name={`quantidade_${material.id}`}
                                        />
                                    </Line>
                                ))}
                            </Form.Item>
                        </div>
                    </FormStyled>
                </Content>
            </Container>
        </FinishAllotment>
    );
}

export default FinishAllotmentPage;