import React, { useCallback, useEffect, useRef } from "react";
import { Header, SidebarMenu } from "../../components";
import { Form, FormInstance, Select } from "antd";
import { Container, Content, DatePickerStyled, FormStyled, FinishAllotment, Line, Label, InputNumberStyled } from "./styles";

const { Option } = Select;

function FinishAllotmentPage(){
    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);

    //BUSCAR NO BANCO
    const subtitle = "Nome do rótulo";

    //BUSCAR NO BANCO
    const insumos = [
        { id: 1, nome: 'Álcool' },
        { id: 2, nome: 'Vinagre de café' },
        { id: 3, nome: 'Água destilada' }
    ];

    const onFinish = useCallback(() => {
        //LÓGICA
    }, []);

    // const loadInitialData = useCallback(() => {
    //     //BUSCAR VALORES NO BANCO
    //     //DEPOIS DAR
    //     //form.setFieldsValue(DADOS)
    // }, []);



    useEffect(() => {
        if (form) {
            formRef.current = form;
        }
    }, [form]);

    // useEffect(() => {
    //     loadInitialData
    // }, []);

    return (
        <FinishAllotment>
            <SidebarMenu />
            <Container>
                <Header title="Finalizar Lote" subtitle={subtitle} buttonName="Salvar" showButton={true} actionButton={() => formRef.current?.submit()} />
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
                                {insumos.map((insumo) => (
                                    <Line key={insumo.id}>
                                    <Label>{insumo.nome}</Label>
                                    <InputNumberStyled min={0} placeholder="0" />
                                    </Line>
                                ))}
                            </Form.Item>
                        </div>
                    </FormStyled>

                </Content>

            </Container>
        </FinishAllotment>
    )
}
export default FinishAllotmentPage;