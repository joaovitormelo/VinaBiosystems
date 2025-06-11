import React, { useCallback, useEffect, useRef } from "react";
import { Header, SidebarMenu } from "../../components";
import { Form, FormInstance, Select, message } from "antd";
import { Container, Content, FormStyled, SelectStyled, InputStyled, NewSupply, InputNumberStyled } from "./styles";
import { RegisterRawMaterialUsecase } from "../../../domain/usecases/inventory/registerRawMaterialUsecase";
import { RawMaterialModel } from "../../../domain/models/rawMaterialModel";
import { Injector } from "../../../../core/Injector";
import { useNavigate } from "react-router-dom";

interface NewSupplyPageProp {
    title?: string;
}

function NewSupplyPage({title = "Novo Insumo"} : NewSupplyPageProp){
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const chemicalUnits = [
        { value: 'g', label: 'Gramas (g)' },
        { value: 'mg', label: 'Miligramas (mg)' },
        { value: 'kg', label: 'Quilogramas (kg)' },
        { value: 'L', label: 'Litros (L)' },
        { value: 'mL', label: 'Mililitros (mL)' },
        { value: 'mol', label: 'Moles (mol)' },
        { value: 'ppm', label: 'Partes por milhão (ppm)' },
        { value: 'M', label: 'Molar (M)' },
        { value: '%', label: 'Porcentagem (%)' },
        { value: 'g/L', label: 'Gramas por litro (g/L)' },
        { value: 'mg/dL', label: 'Miligramas por decilitro (mg/dL)' },
        { value: 'eq', label: 'Equivalentes (eq)' }
    ];

    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);

    const onFinish = useCallback(async (values: any) => {
        try {
            const registerRawMaterialUsecase = Injector.getInstance().getRegisterRawMaterialUsecase();
            const rawMaterial = new RawMaterialModel(
                0,
                values.nomeInsumo,
                values.quantidadeAtual || 0,
                values.unidadeMedida,
                values.quantidadeMinima || 0
            );

            await registerRawMaterialUsecase.execute(rawMaterial);
            messageApi.success({
                type: 'success',
                content: 'Insumo cadastrado com sucesso!',
                duration: 2,
                onClose: () => {
                    navigate('/estoque');
                }
            });
        } catch (error: any) {
            messageApi.error({
                type: 'error',
                content: error.message || 'Erro ao cadastrar insumo',
                duration: 3
            });
        }
    }, [form, messageApi, navigate]);

    useEffect(() => {
        if (form) {
            formRef.current = form;
        }
    }, [form]);

    return (
        <NewSupply>
            {contextHolder}
            <SidebarMenu />
            <Container>
                <Header title={title} buttonName="Salvar" showButton={true} actionButton={() => formRef.current?.submit()} />
                <Content>
                    <FormStyled
                        form={form}
                        name="novoInsumoForm"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div>
                            <Form.Item
                                label="Nome do insumo"
                                name="nomeInsumo"
                                rules={[{ required: true, message: "Por favor, insira um nome!"}]}
                            >
                                <InputStyled size="large" />
                            </Form.Item>
                            <Form.Item
                                label="Unidade de medida"
                                name="unidadeMedida"
                                rules={[{ required: true, message:"Por favor, selecione uma unidade!"}]}
                            >
                               <Select
                                    placeholder="Selecione a unidade"
                                    options={chemicalUnits}
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                label="Quantidade do insumo"
                                name="quantidadeAtual"
                                rules={[
                                    { required: true, message: 'Por favor, informe a quantidade do insumo!' },
                                ]}
                            >
                                <InputNumberStyled min={0} placeholder="0" />
                                
                            </Form.Item>
                            <Form.Item
                                label="Quantidade Mínima"
                                name="quantidadeMinima"
                            >
                                <InputNumberStyled min={0} placeholder="0" />
                            </Form.Item>
                        </div>
                    </FormStyled>
                </Content>
            </Container>
        </NewSupply>
    )
}
export default NewSupplyPage;