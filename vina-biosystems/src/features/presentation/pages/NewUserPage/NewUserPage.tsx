import React, { useCallback, useEffect, useRef, useState } from "react";
import { Header, SidebarMenu } from "../../components";
import { Form, FormInstance, Select, message } from "antd";
import { Container, Content, DatePickerStyled, FormStyled, SelectStyled, InputStyled, NewUser } from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import { Injector } from "../../../../core/Injector";
import { UserModel } from "../../../domain/models/userModel";
import dayjs from "dayjs";

interface LocationState {
    isEdit?: boolean;
    user?: UserModel;
}

const { Option } = Select;

function NewUserPage({ title = "Novo Usuário" }) {
    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const { isEdit = false, user = null } = location.state || {};

    const [initialUser, setInitialUser] = useState<UserModel | null>(null);

    const options = ['Administrador', 'Colaborador'];

    const onFinish = useCallback(async (values: any) => {
        try {
            const injector = Injector.getInstance();
            const usecase = isEdit
                ? injector.getEditUserUsecase()
                : injector.getRegisterNewUserUsecase();

            const userModel = new UserModel(
                isEdit ? initialUser?.getId() ?? null : null,
                values.nomeCompleto,
                values.email,
                values.telefone || null,
                values.dataNascimento?.format('YYYY-MM-DD') || '',
                values.tipoPerfil === 'Administrador',
                values.senhaAtual
            );

            await usecase.execute(userModel);

            messageApi.success(isEdit ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!');
            navigate('/usuarios', { replace: true });
        } catch (error: any) {
            onFinishFailed(error);
        }
    }, [isEdit, initialUser, messageApi, navigate]);

    const onFinishFailed = useCallback((errorInfo: any) => {
        if (errorInfo.message?.includes('já existe')) {
            messageApi.error('Usuário já cadastrado');
        } else if (errorInfo.message?.includes('banco de dados')) {
            messageApi.error('Erro ao conectar com o banco de dados');
        } else if (errorInfo.errorFields) {
            messageApi.error('Por favor, preencha todos os campos corretamente.');
            console.error('Erro de validação:', errorInfo);
        } else {
            messageApi.error('Erro ao processar operação');
        }
    }, [messageApi]);

    useEffect(() => {
        if (form) formRef.current = form;
    }, [form]);

    // Preencher os campos se for edição
    useEffect(() => {
        if (isEdit && user) {
            setInitialUser(user);

            form.setFieldsValue({
                nomeCompleto: user.getName(),
                email: user.getEmail(),
                telefone: user.getPhone(),
                dataNascimento: user.getBirthDate() ? dayjs(user.getBirthDate()) : null,
                tipoPerfil: user.getIsAdmin() ? 'Administrador' : 'Colaborador',
                senhaAtual: user.getPassword()
            });
        }
    }, [isEdit, user, form]);

    return (
        <NewUser>
            {contextHolder}
            <SidebarMenu />
            <Container>
                <Header
                    title={isEdit ? "Editar Usuário" : title}
                    buttonName="Salvar"
                    showButton={true}
                    actionButton={() => formRef.current?.submit()}
                />
                <Content>
                    <FormStyled
                        form={form}
                        name="usuarioForm"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div>
                            <Form.Item
                                label="Perfil"
                                name="tipoPerfil"
                                rules={[{ required: true, message: "Por favor, selecione um tipo de usuário!" }]}
                            >
                                <SelectStyled placeholder="Selecione uma opção" allowClear size="large">
                                    {options.map((o) => (
                                        <Option key={o} value={o}>{o}</Option>
                                    ))}
                                </SelectStyled>
                            </Form.Item>
                            <Form.Item
                                label="Nome Completo"
                                name="nomeCompleto"
                                rules={[{ required: true, message: "Por favor, insira seu nome completo!" }]}
                            >
                                <InputStyled size="large" />
                            </Form.Item>
                            <Form.Item
                                label="E-mail"
                                name="email"
                                rules={[
                                    { required: true, message: 'Campo obrigatório!' },
                                    { type: 'email', message: 'E-mail inválido!' }
                                ]}
                            >
                                <InputStyled size="large" />
                            </Form.Item>
                            <Form.Item
                                label="Senha atual"
                                name="senhaAtual"
                                help="A senha deve ter pelo menos 6 caracteres"
                                rules={[
                                    { required: true, message: 'Campo obrigatório!' },
                                    { min: 6, message: 'A senha deve ter pelo menos 6 caracteres!' }
                                ]}
                            >
                                <InputStyled.Password />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item label="Data de nascimento" name="dataNascimento">
                                <DatePickerStyled format="DD/MM/YYYY" size="large" />
                            </Form.Item>
                            <Form.Item label="Telefone" name="telefone">
                                <InputStyled size="large" />
                            </Form.Item>
                        </div>
                    </FormStyled>
                </Content>
            </Container>
        </NewUser>
    );
}

export default NewUserPage;
