import React, { useCallback, useEffect, useRef, useState } from "react";
import { Header, SidebarMenu } from "../../components";
import { Form, FormInstance, message } from "antd";
import { Container, Content, DatePickerStyled, FormStyled, InputStyled, Profile } from "./styles";
import { Injector } from "../../../../core/Injector";
import { UserModel } from "../../../domain/models/userModel";
import moment from "moment";

function ProfilePage(){
    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);
    const [userType, setUserType] = useState<string>("Colaborador");
    const [messageApi, contextHolder] = message.useMessage();
    const [currentUser, setCurrentUser] = useState<UserModel | null>(null);

    const loadInitialData = useCallback(() => {
        const sessionUser = localStorage.getItem('sessionUser');
        if (sessionUser) {
            const user = UserModel.fromJson(JSON.parse(sessionUser));
            setCurrentUser(user);
            setUserType(user.getIsAdmin() ? "Administrador" : "Colaborador");
            
            form.setFieldsValue({
                nomeCompleto: user.getName(),
                email: user.getEmail(),
                telefone: user.getPhone(),
                dataNascimento: user.getBirthDate() ? moment(user.getBirthDate()) : null
            });
        }
    }, [form]);

    const onFinish = useCallback(async (values: any) => {
        try {
            if (!currentUser) {
                throw new Error("Usuário não encontrado");
            }

            const editUserUsecase = Injector.getInstance().getEditUserUsecase();
            
            const updatedUser = new UserModel(
                currentUser.getId(),
                values.nomeCompleto,
                values.email,
                values.telefone,
                values.dataNascimento?.format('YYYY-MM-DD') || '',
                currentUser.getIsAdmin(),
                values.novaSenha || null
            );

            await editUserUsecase.execute(updatedUser);
            
            localStorage.setItem('sessionUser', JSON.stringify(updatedUser.toJson()));
            setCurrentUser(updatedUser);
            
            messageApi.success('Dados atualizados com sucesso!');
        } catch (error: any) {
            if (error.message?.includes('já existe')) {
                messageApi.error('Este e-mail já está em uso');
            } else if (error.message?.includes('banco de dados')) {
                messageApi.error('Erro ao conectar com o banco de dados');
            } else {
                messageApi.error('Erro ao atualizar dados');
            }
            console.error('Erro ao atualizar usuário:', error);
        }
    }, [currentUser, messageApi]);

    useEffect(() => {
        if (form) {
            formRef.current = form;
        }
    }, [form]);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    return (
        <Profile>
            {contextHolder}
            <SidebarMenu />
            <Container>
                <Header title="Perfil Pessoal" subtitle={userType} buttonName="Salvar" showButton={true} actionButton={() => formRef.current?.submit()} />
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