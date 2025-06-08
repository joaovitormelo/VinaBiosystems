import React, { useCallback } from "react";

import { Button, Form, Image, Input, Typography} from "antd";
import { LoginArea, FormArea, StyledButton } from "./styles";

import logoVinaHorizontal from '../../utils/logoVinaHorizontal.png';
import cafeBordoLogin from '../../utils/cafeBordoLogin.png';

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
                    style={{ width: 730, height: 335 }}
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
                    src={cafeBordoLogin}
                    alt="Grãos de café espalhados"
                    preview={false}
                    className="side-image"
                />
            </div>
        </LoginArea>
    )
}

export default ResetPasswordPage;