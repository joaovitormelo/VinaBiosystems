import React, { useCallback, useEffect, useState } from "react";
import { Header, SidebarMenu } from "../../components";
import { GlobalStyle } from "./components/UsersTable/styles";
import { Users, TableStyle, Content, Container } from "./styles";
import { Table } from "antd";
import UsersTable from "./components/UsersTable/UsersTable";
import SearchInput from "./components/SearchInput/SearchInput";
import { UserColumns } from "./components/UsersTable/types";
import { ViewRegisteredUsersListUsecase } from "../../../../features/domain/usecases/authentication/viewRegisteredUsersListUsecase";
import { UserDataMock } from "../../../../features/data/authentication/userDataMock";
import { UserModel } from "../../../../features/domain/models/userModel";

function UsersPage() {
    const [users, setUsers] = useState<UserColumns[]>([]);

    const getUserData = useCallback(async () => {
        try {
            const userData = new UserDataMock();
            const viewUsersUsecase = new ViewRegisteredUsersListUsecase(userData);
            const userList = await viewUsersUsecase.execute();

            const formattedUsers: UserColumns[] = userList.map((user: UserModel) => ({
                key: user.getId()?.toString() || '',
                nome: user.getName(),
                perfil: user.getIsAdmin() ? 'Administrador' : 'Colaborador',
                telefone: '',
                email: user.getEmail(),
            }));

            setUsers(formattedUsers);
        } catch (error) {
            console.error('Erro ao buscar usuarios:', error);
        }
    }, []);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    return (
        <Users>
            <SidebarMenu />
            <Container>
                <Header
                    showButton={true}
                    title="Usuários"
                    buttonName="Novo usuário"
                />
                <Content>
                    <SearchInput />
                    <TableStyle>
                        <GlobalStyle />
                        <UsersTable dataSource={users} />
                    </TableStyle>
                </Content>
            </Container>
        </Users>
    )
}

export default UsersPage;