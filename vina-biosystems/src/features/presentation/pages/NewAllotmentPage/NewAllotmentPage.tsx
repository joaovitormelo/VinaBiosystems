import React, { useCallback, useEffect, useRef } from "react";
import { Header, SidebarMenu } from "../../components";
import { Form, FormInstance, Select } from "antd";
import { Container, Content, DatePickerStyled, FormStyled, SelectStyled, InputStyled, Profile } from "./styles";

const { Option } = Select;

function NewAllotmentPage(){
    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);

    //BUSCAR ISSO NO BANCO
    const options = [
    { label: 'Álcool', value: 'alcool' },
    { label: 'Vinagre', value: 'vinagre' },
    { label: 'Café Verde', value: 'cafe_verde' },
    { label: 'Fruta Macerada', value: 'fruta_macerada' },
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
        <Profile>
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
        </Profile>
    )
}
export default NewAllotmentPage;