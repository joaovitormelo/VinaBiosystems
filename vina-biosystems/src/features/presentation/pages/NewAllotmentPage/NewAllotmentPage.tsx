import React, { useCallback, useEffect, useRef, useState } from "react";
import { Header, SidebarMenu } from "../../components";
import { Button, Form, FormInstance, Select, Table, message } from "antd";
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
    const [rawMaterialInBatchList, setRawMaterialInBatchList] = useState<Array<RawMaterialInBatch>>([]);

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

    const onFinish = useCallback(async (values: any, rawMaterialList: RawMaterialInBatch[]) => {
        try {
            const registerProductionBatchUsecase = Injector.getInstance().getRegisterProductionBatchUsecase();
            
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

    const onAddRawMaterial = useCallback(async () => {
        setRawMaterialInBatchList((prevList) => [
            ...prevList,
           new RawMaterialInBatch(0, 0)
        ]);
    }
    , []);

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
                        onFinish={(values) => {onFinish(values, rawMaterialInBatchList)}}
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
                                <Button onClick={onAddRawMaterial}>+</Button>
                                <Table
                                    dataSource={rawMaterialInBatchList}
                                    pagination={false}
                                    style={{ marginTop: '10px' }}
                                    bordered
                                    columns={
                                        [
                                            {
                                                title: 'Nome',
                                                dataIndex: 'rawMaterialId',
                                                key: 'name',
                                                render: (text: string, record, index) => (
                                                    <Form.Item
                                                        label="Insumos utilizados"
                                                        name={"rawMaterialName" + index}
                                                        rules={[{ required: true, message: "Por favor, selecione o insumo!" }]}
                                                    >
                                                        <SelectStyled
                                                            placeholder="Selecione o insumo"
                                                            size="large"
                                                            onChange={(value) => {
                                                                setRawMaterialInBatchList((prevList) => {
                                                                    const newList = [...prevList];
                                                                    if (newList[index]) {
                                                                        newList[index].setRawMaterialId(Number(value));
                                                                    }
                                                                    return newList;
                                                                }
                                                            )}}
                                                        >
                                                            {options.map((item) => (
                                                                <Option key={item.value} value={item.value}>
                                                                    {item.label}
                                                                </Option>
                                                            ))}
                                                        </SelectStyled>
                                                    </Form.Item>
                                                )
                                            },
                                            {
                                                title: 'Quantidade',
                                                dataIndex: 'quantity',
                                                key: 'quantity',
                                                render: (text: number, record, index) => (
                                                    <Form.Item
                                                        label="Insumos utilizados"
                                                        name={"rawMaterialQuantity" + index}
                                                        rules={[{ required: true, message: "Por favor, digite a quantidade do insumo!" }]}
                                                        
                                                    >
                                                        <InputStyled
                                                            size="large" placeholder="Digite o nome do lote"
                                                            type="number" min={0} step={1} suffix="unidades"
                                                            onChange={(value) => {
                                                                setRawMaterialInBatchList((prevList) => {
                                                                    const newList = [...prevList];
                                                                    if (newList[index]) {
                                                                        newList[index].setQuantity(Number(value.target.value));
                                                                    }
                                                                    return newList;
                                                                }
                                                            )}}
                                                        />
                                                    </Form.Item>
                                                )
                                            },
                                            {
                                                title: 'Ações',
                                                key: 'actions',
                                                render: (_, __, index) => (
                                                    <Button
                                                        type="link"
                                                        danger
                                                        onClick={() => {
                                                            setRawMaterialInBatchList((prevList) => {
                                                                const newList = [...prevList];
                                                                newList.splice(index, 1);
                                                                return newList;
                                                            });
                                                        }}
                                                    >
                                                        Remover
                                                    </Button>
                                                )
                                            }
                                        ]
                                    }
                                >

                                </Table>
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