import React, { useCallback } from "react";

import { Button, Form, Image, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginArea, FormArea, StyledButton } from "./styles";

import logoVinaHorizontal from '../../utils/logoVinaHorizontal.png';
import cafeBordoLogin from '../../utils/cafeBordoLogin.png';

import { DoLoginUsecase } from "../../../domain/usecases/authentication/doLoginUsecase";
import { Injector } from "../../../../core/Injector";
import ResetPasswordPage from "../ResetPasswordPage";
import { Home } from "../HomePage/styles";
import HomePage from "../HomePage";

const { Link } = Typography;

function LoginPage(){
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const injector = Injector.getInstance();
    const doLoginUsecase = injector.getDoLoginUsecase();

    const onFinish = useCallback(async (values: { email: string; password: string }) => {
        try {
            await doLoginUsecase.execute(values.email, values.password);
            messageApi.success('Login realizado com sucesso!');
            navigate("/home");
        } catch (error: any) {
            onFinishFailed(error);
        }
    }, [navigate, messageApi, doLoginUsecase]);

   const onFinishFailed = useCallback((errorInfo: any) => {
        if (errorInfo.message?.includes('não encontrado')) {
            messageApi.error('Usuário não encontrado');
        } else if (errorInfo.message?.includes('senha incorreta')) {
            messageApi.error('Senha incorreta');
        } else if (errorInfo.message?.includes('banco de dados')) {
            messageApi.error('Erro ao conectar com o banco de dados');
        } else if (errorInfo.errorFields) {
            messageApi.error('Por favor, preencha todos os campos corretamente.');
            console.error('Erro de validação:', errorInfo);
        } else {
            messageApi.error('Erro ao realizar login');
        }
    }, [messageApi]);

    const handleForgotPassword = useCallback(() => {
        //LÓGICA
        navigate('/reset-password');
    }, [navigate]);

    return (
        <LoginArea>
            {contextHolder}
            <FormArea>
                <Image
                    src={logoVinaHorizontal}
                    alt="Logo Vina Biotech em bege"
                    preview={false}
                    style={{ width: 730, height: 335 }}
                />
                <p>Biotecnologia, Bioeconomia</p>
                <p>Circular e Soluções Inovadoras</p>
                <Form
                    name="loginForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: "Por favor, insira um e-mail."},
                            {type: 'email', message: 'Por favor, insira um e-mail válido.'}
                        ]}
                    >
                        <Input
                            placeholder="e-mail"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor, insira sua senha.'}]}
                    >
                        <Input.Password
                            placeholder="senha"
                        />
                    </Form.Item>
                    <Link onClick={handleForgotPassword}>Esqueci minha senha</Link>
                    <Form.Item name="submitButton">
                        <StyledButton
                        type="primary"
                        htmlType="submit"
                        block
                        >
                            ENTRAR
                        </StyledButton>
                    </Form.Item>
                </Form>
            </FormArea>
            <div>
                <Image
                    src={cafeBordoLogin}
                    alt="Grãos de café espalhados"
                    preview={false}
                    className="side-image"
                />
            </div>
        </LoginArea>
    )
}

export default LoginPage;