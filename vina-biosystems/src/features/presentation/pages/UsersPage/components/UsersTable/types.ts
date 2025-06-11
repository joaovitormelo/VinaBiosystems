export interface UserColumns {
  key: string;
  nome: string;
  perfil: string;
  telefone: string;
  email: string;
}

export interface UsersTableProp {
    dataSource: UserColumns[];  // Array de usuários para exibir na tabela
    onUserDeleted?: () => void; // Callback opcional após exclusão bem-sucedida
    loading?: boolean;          // Flag para estado de carregamento
    onEditUser?: (userId: number) => void; // Opcional: callback para edição
}