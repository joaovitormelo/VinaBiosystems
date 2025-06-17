import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, SidebarMenu } from "../../components";
import { GlobalStyle } from "./components/UsersTable/styles";
import { Users, TableStyle, Content, Container } from "./styles";
import { Table } from "antd";
import UsersTable from "./components/UsersTable/UsersTable";
import SearchInput from "./components/SearchInput/SearchInput";
import { UserColumns } from "./components/UsersTable/types";
import { ViewRegisteredUsersListUsecase } from "../../../../features/domain/usecases/authentication/viewRegisteredUsersListUsecase";
import { UserModel } from "../../../../features/domain/models/userModel";
import { Injector } from "../../../../core/Injector";
import { message } from "antd";

function UsersPage() {
    const [userList, setUserList] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserColumns[]>([]);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const sessionUser = localStorage.getItem('sessionUser');
        if (sessionUser) {
            const user = UserModel.fromJson(JSON.parse(sessionUser));
            setIsAdmin(user.getIsAdmin());
        }
    }, []);

    const getUserData = useCallback(async () => {
        try {
            setLoading(true);
            const viewUsersUsecase = Injector.getInstance().getViewRegisteredUsersListUsecase();
            const userList = await viewUsersUsecase.execute();

            const formattedUsers: UserColumns[] = userList.map((user: UserModel) => ({
                key: user.getId()?.toString() || '',
                nome: user.getName(),
                perfil: user.getIsAdmin() ? 'Administrador' : 'Colaborador',
                telefone: user.getPhone()?.toString() || '',
                email: user.getEmail(),
            }));

            setUserList(userList);
            setUsers(formattedUsers);
        } catch (error: any) {
            console.error('Erro ao buscar usuarios:', error);
            messageApi.error('Erro ao carregar lista de usuários');
        } finally {
            setLoading(false);
        }
    }, [messageApi]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    const handleNewUser = () => {
        navigate('/novo-usuario');
    };
    return (
        <Users>
            {contextHolder}
            <SidebarMenu />
            <Container>
                <Header
                    showButton={isAdmin}
                    title="Usuários"
                    buttonName="Novo usuário"
                    actionButton={handleNewUser}
                />
                <Content>
                    <SearchInput />
                    <TableStyle>
                        <GlobalStyle />
                        <UsersTable
                            dataSource={users}
                            userList={userList}
                            updateTable={getUserData}
                            loading={loading}
                        />
                    </TableStyle>
                </Content>
            </Container>
        </Users>
    )
}

export default UsersPage;