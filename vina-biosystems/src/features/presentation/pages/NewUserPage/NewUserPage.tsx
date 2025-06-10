import React, { useCallback, useEffect, useRef } from "react";
import { Header, SidebarMenu } from "../../components";
import { Form, FormInstance, Select } from "antd";
import { Container, Content, DatePickerStyled, FormStyled, SelectStyled, InputStyled, NewUser } from "./styles";

const { Option } = Select;

function NewUserPage(){
    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);

    const options = ['Administrador', 'Colaborador'];

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
        <NewUser>
            <SidebarMenu />
            <Container>
                <Header title="Novo Usuário" buttonName="Salvar" showButton={true} actionButton={() => formRef.current?.submit()} />
                <Content>
                    <FormStyled
                        form={form}
                        name="novoUsuarioForm"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div>
                            <Form.Item
                                label="Perfil"
                                name="tipoPerfil"
                                rules={[{ required: true, message:"Por favor, selecione um tipo de usuário!"}]}
                            >
                                <SelectStyled
                                    placeholder="Selecione uma opção"
                                    allowClear
                                    size="large"
                                >
                                    {options.map((o) => (
                                        <Option key={o} value={o}>
                                        {o}
                                        </Option>
                                    ))}
                                </SelectStyled>
                            </Form.Item>
                            <Form.Item
                                label="Nome Completo"
                                name="nomeCompleto"
                                rules={[{ required: true, message: "Por favor, insira seu nome completo!"}]}
                            >
                                <InputStyled size="large" />
                            </Form.Item>
                            <Form.Item
                                label="E-mail"
                                name="email"
                                rules={[
                                    { required: true, message: 'Campo obrigatório!' },
                                    { type: 'email', message: 'E-mail inválido!'}
                                ]}
                            >
                                <InputStyled size="large"/>
                            </Form.Item>
                            <Form.Item
                                label="Senha atual"
                                name="senhaAtual"
                            >
                                <InputStyled.Password />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Data de nascimento"
                                name="dataNascimento"
                            >
                                <DatePickerStyled
                                    format="DD/MM/YYYY"
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Telefone"
                                name="telefone"
                            >
                                <InputStyled size="large"/>
                            </Form.Item>
                        </div>
                    </FormStyled>

                </Content>

            </Container>
        </NewUser>
    )
}
export default NewUserPage;