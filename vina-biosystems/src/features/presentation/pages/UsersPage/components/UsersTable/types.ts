export interface UserColumns {
  key: string;
  nome: string;
  perfil: string;
  telefone: string;
  email: string;
}

export type UsersTableProp = {
  dataSource: UserColumns[],
}