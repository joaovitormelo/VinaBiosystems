
import { Table, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { IconButton, CustomTable } from './styles';
import { ColumnsType } from 'antd/es/table';
import { useCallback } from 'react';
import { UsersTableProp } from './types';
import { Injector } from "../../../../../../core/Injector";
import { UserModel } from "../../../../../domain/models/userModel";

const { confirm } = Modal;

function UsersTable({ dataSource, onUserDeleted }: UsersTableProp) {
  const [messageApi, contextHolder] = message.useMessage();
  const injector = Injector.getInstance();
  const excludeUserUsecase = injector.getExcludeUserUsecase();

  const handleEdit = useCallback((record: any) => {
    console.log('Editar usuário:', record);
    // 
  }, []);

  const handleDelete = useCallback(async (record: any) => {
    console.log('Excluir usuário:', record);

    try {
      const userToDelete = new UserModel(parseInt(record.key), "", "", "", "", false, "");

      await excludeUserUsecase.execute(userToDelete);

      messageApi.success({
        type: 'success',
        content: 'Usuário excluído com sucesso!',
        duration: 2
      });

      // Atualiza a lista de usuários após exclusão
      if (onUserDeleted) {
        onUserDeleted();
      }
    } catch (error) {
      messageApi.error('Erro ao excluir usuário');
      console.error('Erro ao excluir usuário:', error);
    }
  }, [excludeUserUsecase, messageApi, onUserDeleted]);

  const columns: ColumnsType<any> = [
    { title: 'Nome do Usuário', dataIndex: 'nome', key: 'nome' },
    { title: 'Perfil', dataIndex: 'perfil', key: 'perfil' },
    { title: 'Telefone', dataIndex: 'telefone', key: 'telefone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: any) => (
        <>
          <IconButton onClick={() => handleEdit(record)}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <CustomTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        style={{ marginRight: '3.125rem' }}
        rowKey="id"
      />
    </>
  );
};

export default UsersTable;