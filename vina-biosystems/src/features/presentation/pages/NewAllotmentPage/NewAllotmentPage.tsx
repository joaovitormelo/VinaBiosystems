import React, { useCallback, useEffect, useRef, useState } from "react";
import { Header, SidebarMenu } from "../../components";
import { Form, FormInstance, Select, message } from "antd";
import { Container, Content, DatePickerStyled, FormStyled, SelectStyled, InputStyled, NewAllotment } from "./styles";
import { useNavigate } from "react-router-dom";
import { Injector } from "../../../../core/Injector";
import { BatchModel } from "../../../domain/models/batchModel";
import { RawMaterialModel } from "../../../domain/models/rawMaterialModel";
import { RawMaterialInBatch } from "../../../domain/types/rawMaterialInBatch";
import moment from "moment";

const { Option } = Select;

function NewAllotmentPage(){
    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [options, setOptions] = useState<Array<{label: string, value: string}>>([]);

    const loadInitialData = useCallback(async () => {
        try {
            const viewRawMaterialInventoryUsecase = Injector.getInstance().getViewRawMaterialInventoryUsecase();
            const rawMaterials = await viewRawMaterialInventoryUsecase.execute();
            
            const formattedOptions = rawMaterials.map((material: RawMaterialModel) => ({
                label: material.getName(),
                value: material.getId()?.toString() || ''
            }));
            
            setOptions(formattedOptions);
        } catch (error) {
            console.error('Erro ao carregar insumos:', error);
            messageApi.error({
                type: 'error',
                content: 'Erro ao carregar insumos. Tente novamente.',
                duration: 3
            });
        }
    }, [messageApi]);

    const onFinish = useCallback(async (values: any) => {
        try {
            const registerProductionBatchUsecase = Injector.getInstance().getRegisterProductionBatchUsecase();
            
            const rawMaterialList: RawMaterialInBatch[] = values.insumos.map((insumoId: string) => {
                return new RawMaterialInBatch(parseInt(insumoId), 0);
            });
            
            const batch = new BatchModel(
                null, 
                values.rotulo, 
                moment(values.dataInicio), 
                moment(),
                rawMaterialList, 
                BatchModel.SITUATION.EM_ABERTO 
            );
            
            await registerProductionBatchUsecase.execute(batch);
            
            messageApi.success({
                type: 'success',
                content: 'Lote criado com sucesso!',
                duration: 2,
                onClose: () => {
                    navigate('/lotes');
                }
            });
        } catch (error: any) {
            console.error('Erro ao criar lote:', error);
            messageApi.error({
                type: 'error',
                content: error.message || 'Erro ao criar lote. Tente novamente.',
                duration: 3
            });
        }
    }, [navigate, messageApi]);

    useEffect(() => {
        if (form) {
            formRef.current = form;
        }
    }, [form]);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    return (
        <NewAllotment>
            {contextHolder}
            <SidebarMenu />
            <Container>
                <Header title="Novo Lote" buttonName="Salvar" showButton={true} actionButton={() => formRef.current?.submit()} />
                <Content>
                    <FormStyled
                        form={form}
                        name="loteForm"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div>
                            <Form.Item
                                label="Rótulo"
                                name="rotulo"
                                rules={[{ required: true, message:"Por favor, digite o rótulo do lote!"}]}
                            >
                                <InputStyled size="large" placeholder="Digite o nome do lote" />
                            </Form.Item>
                            <Form.Item
                                label="Insumos utilizados"
                                name="insumos"
                            >
                                <SelectStyled mode="multiple" placeholder="Selecione os insumos" size="large">
                                    {options.map((item) => (
                                        <Option key={item.value} value={item.value}>
                                            {item.label}
                                        </Option>
                                    ))}
                                </SelectStyled>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Data de início"
                                name="dataInicio"
                            >
                                <DatePickerStyled
                                    format="DD/MM/YYYY"
                                    size="large"
                                />
                            </Form.Item>
                        </div>
                    </FormStyled>
                </Content>
            </Container>
        </NewAllotment>
    )
}

export default NewAllotmentPage;