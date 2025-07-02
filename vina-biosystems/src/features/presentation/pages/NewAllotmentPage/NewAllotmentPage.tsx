import React, { useCallback, useEffect, useRef, useState } from "react";
import { Header, SidebarMenu } from "../../components";
import { Button, Form, FormInstance, Select, Table, message } from "antd";
import { Container, Content, DatePickerStyled, FormStyled, StyledTable, SelectStyled, InputStyled, NewAllotment, TableContainer } from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import { Injector } from "../../../../core/Injector";
import { BatchModel } from "../../../domain/models/batchModel";
import { RawMaterialModel } from "../../../domain/models/rawMaterialModel";
import { RawMaterialInBatch } from "../../../domain/types/rawMaterialInBatch";
import moment from "moment";
import { ProductModel } from "../../../domain/models/productModel";

const { Option } = Select;

function NewAllotmentPage(){
    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const editingLote = location.state?.lote;
    const [messageApi, contextHolder] = message.useMessage();
    const [rawMaterialOptions, setRawMaterialOptions] = useState<Array<{label: string, value: string}>>([]);
    const [rawMaterialInBatchList, setRawMaterialInBatchList] = useState<Array<RawMaterialInBatch>>([]);
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const [productOptions, setProductOptions] = useState<Array<{label: string, value: string}>>([]);

    const loadRawMaterialList = async () => {
        try {
            const viewRawMaterialInventoryUsecase = Injector.getInstance().getViewRawMaterialInventoryUsecase();
            const rawMaterials = await viewRawMaterialInventoryUsecase.execute();
            
            const formattedOptions = rawMaterials.map((material: RawMaterialModel) => ({
                label: material.getName(),
                value: material.getId()?.toString() || ''
            }));
            
            setRawMaterialOptions(formattedOptions);
        } catch (error) {
            console.error('Erro ao carregar insumos:', error);
            messageApi.error({
                type: 'error',
                content: 'Erro ao carregar insumos. Tente novamente.',
                duration: 3
            });
        }
    }

    const loadProductList = useCallback(async () => {
        try {
            const viewProductsUsecase = Injector.getInstance().getViewProductsUsecase();
            const products = await viewProductsUsecase.execute();
            setProductList(products);
            const formattedOptions = products.map((product: ProductModel) => ({
                label: product.getName(),
                value: product.getId()?.toString() || ''
            }));
            setProductOptions(formattedOptions);
        } catch (error) {
            console.error('Erro ao carregar lista de produtos:', error);
            messageApi.error({
                type: 'error',
                content: 'Erro ao carregar lista de produtos. Tente novamente.',
                duration: 3
            });
        }
    }, [messageApi]);

    const loadInitialData = useCallback(async () => {
        loadRawMaterialList();
        loadProductList();
    }, [messageApi]);

    const onFinish = useCallback(async (values: any, rawMaterialList: RawMaterialInBatch[]) => {
        try {
            if (editingLote) {
                const editProductionBatchUsecase = Injector.getInstance().getEditProductionBatchUsecase();
                const batch = new BatchModel(
                    parseInt(editingLote.key),
                    values.rotulo,
                    moment(values.dataInicio),
                    moment(),
                    rawMaterialList,
                    editingLote.situacao || BatchModel.SITUATION.EM_ABERTO,
                    values.productId ? parseInt(values.productId) : null,
                    values.productQuantity ? parseInt(values.productQuantity) : null
                );
                await editProductionBatchUsecase.execute(batch);
                messageApi.success({
                    type: 'success',
                    content: 'Lote editado com sucesso!',
                    duration: 2,
                    onClose: () => {
                        navigate('/lotes');
                    }
                });
            } else {
                const registerProductionBatchUsecase = Injector.getInstance().getRegisterProductionBatchUsecase();
                const batch = new BatchModel(
                    null, 
                    values.rotulo, 
                    moment(values.dataInicio), 
                    null,
                    rawMaterialList, 
                    BatchModel.SITUATION.EM_ABERTO,
                    values.productId ? parseInt(values.productId) : null,
                    values.productQuantity ? parseInt(values.productQuantity) : null
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
            }
        } catch (error: any) {
            messageApi.error({
                type: 'error',
                content: error.message || (editingLote ? 'Erro ao editar lote. Tente novamente.' : 'Erro ao criar lote. Tente novamente.'),
                duration: 3
            });
        }
    }, [navigate, messageApi, editingLote]);

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
        if (editingLote) {
            // Preencher formulário e insumos
            form.setFieldsValue({
                rotulo: editingLote.rotulo,
                dataInicio: editingLote.dataInicio ? moment(editingLote.dataInicio) : moment(),
            });
            // Buscar insumos do lote (mock: vazio, real: buscar pelo id se necessário)
            if (editingLote.key) {
                // Aqui você pode buscar insumos reais se necessário
                // setRawMaterialInBatchList(...)
            }
        }
    }, [loadInitialData, form, editingLote]);

    return (
        <NewAllotment>
            {contextHolder}
            <SidebarMenu />
            <Container>
                <Header title={editingLote ? "Editar Lote" : "Novo Lote"} buttonName="Salvar" showButton={true} actionButton={() => formRef.current?.submit()} />
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

                            <Form.Item label="Produto" name={"productId"} rules={[{ required: true, message: "Por favor, selecione um produto!" }]}>
                                <SelectStyled
                                    placeholder="Selecione o produto"
                                    size="large"
                                    //onChange={(value) => {
                                    //setRawMaterialInBatchList(() => {
                                        /* 
                                            Logica (Vai aparecer o nome do produto)
                                        */
                                    //});
                                    //}}
                                >
                                    {productOptions.map((item) => (
                                    <Option key={item.value} value={item.value}>
                                        {item.label}
                                    </Option>
                                    ))}
                                </SelectStyled>
                            </Form.Item>

                            <Form.Item
                                label=""
                                name="productQuantity"
                                rules={[{ required: true, message: "Por favor, informe a quantidade do produto!" }]}
                            >
                                <InputStyled
                                    size="large" placeholder="Informe a quantidade"
                                    type="number" min={0} step={1} suffix="unidades"
                                    //onChange={(value) => {
                                        //setRawMaterialInBatchList(() => {
                                            /* 
                                                Logica (Vai aparecer a quantidade do produto)
                                            */
                                        //}
                                    //) }}
                                />
                            </Form.Item>
                        </div>
                    </FormStyled>
                    <TableContainer>
                            <StyledTable
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
                                                        {rawMaterialOptions.map((item) => (
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
                                                        size="large" placeholder="Informe a quantidade"
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

                            </StyledTable>
                        </TableContainer>
                </Content>
            </Container>
        </NewAllotment>
    )
}

export default NewAllotmentPage;