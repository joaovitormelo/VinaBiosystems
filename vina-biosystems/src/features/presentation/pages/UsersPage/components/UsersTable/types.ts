import { UserModel } from "../../../../../domain/models/userModel";

export interface UserColumns {
  key: string;
  nome: string;
  perfil: string;
  telefone: string;
  email: string;
}

export interface UsersTableProp {
    dataSource: UserColumns[];  // Array de usuários para exibir na tabela
    userList: UserModel[];      // Lista de usuários do modelo UserModel
    updateTable: () => void; // Callback para atualizar a tabela
    loading: boolean;          // Flag para estado de carregamento
}