import React, { useCallback } from "react";

import { Button, Form, Image, Input, Typography} from "antd";
import { LoginArea, FormArea, StyledButton } from "./styles";

import logoVinaHorizontal from '../../utils/logoVinaHorizontal.png';
import simboloVinaLogin from '../../utils/simboloVinaLogin.png';

const { Link } = Typography;

function ResetPasswordPage(){
    const onFinish = useCallback(() => {
        //LÓGICA
    }, []);

    const onFinishFailed = useCallback(() => {
        //LÓGICA
    },[]);


    return (
        <LoginArea>
            <FormArea>
                <Image
                    src={logoVinaHorizontal}
                    alt="Logo Vina Biotech em bege"
                    preview={false}
                    style={{ width: 730, height: 320 }}
                />
                <p>
                    Digite o e-mail associado a sua conta e, em
                    <br />
                    instantes, chegará um link para redefinir a senha.
                    <br />
                    <br />

                    Antes de solicitar novamente, verifique a caixa de
                    <br />
                    spam do seu e-mail.
                </p>
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

                    <Form.Item name="submitButton">
                        <StyledButton
                        type="primary"
                        htmlType="submit"
                        block
                        >
                            ENVIAR
                        </StyledButton>
                    </Form.Item>
                </Form>
            </FormArea>
            <div>
                <Image
                    src={simboloVinaLogin}
                    alt="Símbolo da Vina Biotech verde com opacidade reduzida"
                    preview={false}
                    className="side-image"
                    style={{ width: '40vw', height: '100vh' }}
                />
            </div>
        </LoginArea>
    )
}

export default ResetPasswordPage;