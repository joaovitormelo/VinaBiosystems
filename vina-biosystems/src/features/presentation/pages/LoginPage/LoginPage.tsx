import { useCallback } from "react";

import { Button, Form, Image, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginArea, FormArea, StyledButton } from "./styles";

import logoVinaHorizontal from '../../utils/logoVinaHorizontal.png';
import cafeBordoLogin from '../../utils/cafeBordoLogin.png';
import { Injector } from "../../../../core/Injector";
import { DoLoginUsecase } from "../../../domain/usecases/authentication/doLoginUsecase";
import { RawMaterialInBatch } from "../../../domain/types/rawMaterialInBatch";
import moment from "moment";
import { BatchModel } from "../../../domain/models/batchModel";
import { RawMaterialModel } from "../../../domain/models/rawMaterialModel";
import { UserModel } from "../../../domain/models/userModel";
import { SamplingResultModel } from "../../../domain/models/samplingResultModel";
import { BackendContract } from "../../../data/utils/backendContract";
import { AxiosAdapter } from "../../../data/utils/axiosAdapter";
import { UserData } from "../../../data/authentication/userData";

const { Link } = Typography;

const injector = Injector.getInstance();
const doLoginUsecase = injector.getDoLoginUsecase();
const editUserUsecase = injector.getEditUserUsecase();
const excludeUserUsecase = injector.getExcludeUserUsecase();
const registerNewUserUsecase = injector.getRegisterNewUserUsecase();
const viewSamplingResultsUsecase = injector.getViewSamplingResultsUsecase();

async function runTests() {
  await testLoginUsecase("joao.teste@gmail.com", "123");
  //testViewUsers();
  //testAttachSamplingResultUsecase();
  //await testFinishProductionBatchUsecase();
  //testViewSamplingResultsUsecase();
  //testLoginUsecase();
  //testEditUserUsecase();
  //testExcludeUserUsecase();
  //testRegisterNewUserUsecase();
  testViewInventoryUsecase();
  //testRegisterRawMaterialUsecase();
  //testEditRawMaterialUsecase();
  //await testRemoveRawMaterialUsecase();
  //testCheckInRawMaterialUsecase();
  await testCheckOutRawMaterialUsecase();
  // await testViewInventoryUsecase();
 //testRegisterProductionBatchUsecase();
 //await testCancelProductionBatchUsecase();
 //testViewProductionBatchesUsecase();
 //testAttachSamplingResultUsecase();
 //testExcludeSamplingResultUsecase();
 //testDoLogoutUsecase();
}

async function testViewUsers() {
  const viewRegisteredUsersUsecase = Injector.getInstance().getViewRegisteredUsersListUsecase();
  try {
    const users = await viewRegisteredUsersUsecase.execute();
    console.log("Usuários registrados:", users);
  }
  catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
}

async function testBackend() {
  //await testCreateUserBackend();
  //await testGetUsersBackend();
}

async function testCreateUserBackend() {
  const backend: BackendContract = new AxiosAdapter();
  const userData = new UserData(backend);
  const newUser = UserModel.getMock();
  newUser.setLogin("raianny");
  newUser.setEmail("raianny");
  newUser.setPassword("123456");
  try {
    await userData.createUser(newUser);
    console.log("Usuário criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  }
}

async function testGetUsersBackend() {
  const backend: BackendContract = new AxiosAdapter();
  const userData = new UserData(backend);
  try {
    const users = await userData.fetchUsers();
    console.log("Usuários:", users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
}

async function testDoLogoutUsecase() {
    const doLogoutUsecase = Injector.getInstance().getDoLogoutUsecase();
    try {
        await doLogoutUsecase.execute();
        console.log("Logout realizado com sucesso!");
    } catch (error) {
        console.error("Erro ao realizar logout:", error);
    }
}

async function testCancelProductionBatchUsecase() {
    const cancelProductionBatchUsecase = Injector.getInstance().getCancelProductionBatchUsecase();
    const batch = BatchModel.getMock();
    batch.setId(1); // Assuming you have a batch with ID 1
    try {
        await cancelProductionBatchUsecase.execute(batch);
        console.log("Lote de produção cancelado com sucesso!");
    } catch (error) {
        console.error("Erro ao cancelar lote de produção:", error);
    }
}

async function testFinishProductionBatchUsecase() {
    const finishProductionBatchUsecase = Injector.getInstance().getFinishProductionBatchUsecase();
    try {
        await finishProductionBatchUsecase.execute(1); // Assuming you have a batch with ID 1
        console.log("Lote de produção finalizado com sucesso!");
    } catch (error) {
        console.error("Erro ao finalizar lote de produção:", error);
    }
}

async function testExcludeSamplingResultUsecase() {
    const excludeSamplingResultUsecase = Injector.getInstance().getExcludeSamplingResultUsecase();
    try {
        await excludeSamplingResultUsecase.execute(1); // Assuming you have a sampling result with ID 1
        console.log("Resultado de coleta excluído com sucesso!");
    } catch (error) {
        console.error("Erro ao excluir resultado de coleta:", error);
    }
}

async function testAttachSamplingResultUsecase() {
    const attachSamplingResultUsecase = Injector.getInstance().getAttachSamplingResultUsecase();
    const samplingResult = SamplingResultModel.getMock();
    samplingResult.setFileName("sample_result.txt");
    samplingResult.setDate(moment());
    samplingResult.setCreationUserId(1); // Assuming you have a batch with ID 1
    try {
        const result = await attachSamplingResultUsecase.execute(samplingResult);
        console.log("Resultado de coleta anexado com sucesso:", result);
    } catch (error) {
        console.error("Erro ao anexar resultado de coleta:", error);
    }
}

async function testViewSamplingResultsUsecase() {
    const results = await viewSamplingResultsUsecase.execute(1);
    console.log(results);
    console.log("Teste de ViewSamplingResultsUsecase executado com sucesso!");
}

async function testLoginUsecase(email: string, password: string) {
  try {
    await doLoginUsecase.execute(email, password);
    console.log("Login bem sucedido!");
  } catch(error) {
    throw error;
  }
}

async function testEditUserUsecase() {
  try {
    const editedUser = UserModel.getMock();
    editedUser.setId(2); // Assuming you have a user with ID 1
    editedUser.setLogin("raianny");
    editedUser.setEmail("raianny.ray");
    editedUser.setPassword("123");
    editedUser.setName("Usuário Editado");
    await editUserUsecase.execute(editedUser);
    console.log("Usuário editado!");
  } catch(error) {
    throw error;
  }
}

async function testExcludeUserUsecase() {
  try {
    const userToExclude = UserModel.getMock();
    userToExclude.setId(3);
    await excludeUserUsecase.execute(userToExclude);
    console.log("Usuário excluído!");
  } catch(error) {
    throw error;
  }
}

async function testRegisterNewUserUsecase() {
  try {
    const newUser = UserModel.getMock();
    newUser.setLogin("raianny");
    newUser.setEmail("raianny");
    newUser.setPassword("123456");
    await registerNewUserUsecase.execute(newUser);
    console.log("Usuário registrado com sucesso!");
    testLoginUsecase(newUser.getLogin(), newUser.getPassword() || "");
  } catch(error) {
    throw error;
  }
}

async function testRegisterRawMaterialUsecase() {
  try {
    const registerRawMaterialUsecase = Injector.getInstance().getRegisterRawMaterialUsecase();
    const rawMaterial = RawMaterialModel.getMock();
    rawMaterial.setId(3);
    rawMaterial.setName("Novo Insumo");
    rawMaterial.setQuantity(200);
    rawMaterial.setUnit("kg");
    await registerRawMaterialUsecase.execute(rawMaterial);
    console.log("Matéria-prima registrada com sucesso!");
  } catch(error) {
    console.error("Erro ao registrar matéria-prima:", error);
  }
}

async function testViewInventoryUsecase() {
  try {
    const viewRawMaterialInventoryUsecase = Injector.getInstance().getViewRawMaterialInventoryUsecase();
    const inventory = await viewRawMaterialInventoryUsecase.execute();
    console.log("Inventário de Matérias-Primas:", inventory);
  } catch(error) {
    console.error("Erro ao visualizar o inventário:", error);
  }
}

async function testEditRawMaterialUsecase() {
  try {
    const editRawMaterialUsecase = Injector.getInstance().getEditRawMaterialUsecase();
    const rawMaterial = RawMaterialModel.getMock();
    rawMaterial.setId(1);
    rawMaterial.setName("Cerva");
    rawMaterial.setQuantity(200);
    rawMaterial.setUnit("litros");
    await editRawMaterialUsecase.execute(rawMaterial);
    console.log("Matéria-prima editada com sucesso!");
  } catch(error) {
    console.error("Erro ao editar matéria-prima:", error);
  }
}

async function testRemoveRawMaterialUsecase() {
  try {
    const removeRawMaterialUsecase = Injector.getInstance().getRemoveRawMaterialUsecase();
    await removeRawMaterialUsecase.execute(2);
    console.log("Matéria-prima removida com sucesso!");
  } catch(error) {
    console.error("Erro ao remover matéria-prima:", error);
  }
}

async function testCheckInRawMaterialUsecase() {
  try {
    const checkInRawMaterialUsecase = Injector.getInstance().getCheckInRawMaterialUsecase();
    const rawMaterial = RawMaterialModel.getMock();
    rawMaterial.setId(1);
    const quantityToAdd = 50;
    await checkInRawMaterialUsecase.execute(rawMaterial, quantityToAdd);
    console.log(`Entrada de matéria-prima registrada com sucesso! Quantidade adicionada: ${quantityToAdd}`);
  } catch(error) {
    console.error("Erro ao registrar entrada de matéria-prima:", error);
  }
}

async function testCheckOutRawMaterialUsecase() {
  try {
    const checkOutRawMaterialUsecase = Injector.getInstance().getCheckOutRawMaterialUsecase();
    const rawMaterial = RawMaterialModel.getMock();
    rawMaterial.setId(1);
    const quantityToRemove = 60;
    await checkOutRawMaterialUsecase.execute(rawMaterial, quantityToRemove);
    console.log(`Saída de matéria-prima registrada com sucesso! Quantidade removida: ${quantityToRemove}`);
  } catch(error) {
    console.error("Erro ao registrar saída de matéria-prima:", error);
  }
}

async function testViewProductionBatchesUsecase() {
  try {
    const viewProductionBatchesUsecase = Injector.getInstance().getViewProductionBatchesUsecase();
    const batches = await viewProductionBatchesUsecase.execute();
    console.log("Lotes de Produção:", batches);
  } catch(error) {
    console.error("Erro ao visualizar lotes de produção:", error);
  }
}

async function testRegisterProductionBatchUsecase() {
  try {
    const registerProductionBatchUsecase = Injector.getInstance().getRegisterProductionBatchUsecase();
    const batch = BatchModel.getMock();
    batch.setLabel("Lote de Teste");
    batch.setStartDate(moment("2023-10-01"));
    batch.setEndDate(moment("2023-10-31"));
    batch.setRawMaterialList([
      new RawMaterialInBatch(1, 1000),
      new RawMaterialInBatch(2, 30)
    ]);
    await registerProductionBatchUsecase.execute(batch);
    console.log("Lote de produção registrado com sucesso!");
  } catch(error) {
    console.error("Erro ao registrar lote de produção:", error);
  }
}

function LoginPage(){
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const injector = Injector.getInstance();
    const doLoginUsecase: DoLoginUsecase = injector.getDoLoginUsecase();

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
                <Button 
                    onClick={runTests}
                    >TESTE!</Button>
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
                    style={{ width: '50vw', height: '100vh' }}
                />
            </div>
        </LoginArea>
    )
}

export default LoginPage;