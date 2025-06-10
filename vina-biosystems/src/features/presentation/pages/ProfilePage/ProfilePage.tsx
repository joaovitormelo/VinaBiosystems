import React, { useCallback, useEffect, useRef } from "react";
import { Header, SidebarMenu } from "../../components";
import { Form, FormInstance } from "antd";
import { Container, Content, DatePickerStyled, FormStyled, InputStyled, Profile } from "./styles";

function ProfilePage(){
    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);

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
                <Header title="Perfil Pessoal" subtitle="Colaborador" buttonName="Salvar" showButton={true} actionButton={() => formRef.current?.submit()} />
                <Content>
                    <FormStyled
                        form={form}
                        name="perfilForm"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div>
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
                            <Form.Item
                                label="Nova senha"
                                name="novaSenha"
                                rules={[
                                    { min: 6, message: "Mínimo de 6 caracteres" }
                                ]}
                            >
                                <InputStyled.Password size="large"/>
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
        </Profile>
    )
}
export default ProfilePage;