import React, { useCallback } from "react";
import { Header, SidebarMenu } from "../../components";
import { GlobalStyle} from "./components/UsersTable/styles";
import { Users, TableStyle, Content, Container} from "./styles";
import { Table } from "antd";
import UsersTable from "./components/UsersTable/UsersTable";
import SearchInput from "./components/SearchInput/SearchInput";
import { UserColumns } from "./components/UsersTable/types";

function UsersPage(){
  const getUserData = useCallback(() => {
    //ALTERAR LÓGICA, APENAS UM EXEMPLO PARA NAO TER ERRO.
    const dataSource: UserColumns[] = [
        {
        key: '1',
        nome: 'João Silva',
        perfil: 'Administrador',
        telefone: '(31) 99999-9999',
        email: 'joao@email.com',
        },
        {
        key: '2',
        nome: 'Maria Souza',
        perfil: 'Colaborador',
        telefone: '(31) 98888-8888',
        email: 'maria@email.com',
        },
    ];
    return dataSource;
  }, []);

    return(
        <Users>
            <SidebarMenu />
            <Container>
                <Header 
                    showButton={true} 
                    title="Usuários" 
                    buttonName="Novo usuário"
                />
                <Content>
                    <SearchInput/>
                    <TableStyle>
                        <GlobalStyle/>
                        <UsersTable dataSource={getUserData()}/>
                    </TableStyle>
                </Content>

            </Container>
                
        </Users>
    )
}

export default UsersPage;