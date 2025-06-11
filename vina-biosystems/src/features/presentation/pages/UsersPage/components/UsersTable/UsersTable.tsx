import { Table, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { IconButton, CustomTable } from './styles';
import { ColumnsType } from 'antd/es/table';
import { useCallback, useEffect, useState } from 'react';
import { UsersTableProp } from './types';
import { Injector } from "../../../../../../core/Injector";
import { UserModel } from "../../../../../domain/models/userModel";
import { UsecaseException } from '../../../../../../core/exceptions/usecaseException';

const { confirm } = Modal;

function UsersTable({ dataSource, onUserDeleted, userList }: UsersTableProp) {
  const [messageApi, contextHolder] = message.useMessage();
  const injector = Injector.getInstance();
  const excludeUserUsecase = injector.getExcludeUserUsecase();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const sessionUser = localStorage.getItem('sessionUser');
    if (sessionUser) {
      const user = UserModel.fromJson(JSON.parse(sessionUser));
      setIsAdmin(user.getIsAdmin());
    }
  }, []);

  const handleEdit = useCallback((index: number) => {
      const userToEdit = userList[index];
    // 
  }, []);

  const handleDelete = useCallback(async (index: number, ) => {
    if (!isAdmin) {
      messageApi.error({
        type: 'error',
        content: 'Você não tem permissão para excluir usuários. Apenas administradores podem realizar esta ação.',
        duration: 3
      });
      return;
    }

    try {
      const userToDelete = userList[index];
      await excludeUserUsecase.execute(userToDelete);
      messageApi.success({
        type: 'success',
        content: 'Usuário excluído com sucesso!',
        duration: 2
      });
      if (onUserDeleted) {
        onUserDeleted();
      }
    } catch (error) {
      if (error instanceof UsecaseException) {
        messageApi.error({
          type: 'error',
          content: error.message,
          duration: 3
        });
        return;
      } else {
        messageApi.error('Erro ao excluir usuário');
      }
      console.error('Erro ao excluir usuário:', error);
    }
  }, [excludeUserUsecase, messageApi, onUserDeleted, isAdmin]);

  const columns: ColumnsType<any> = [
    { title: 'Nome do Usuário', dataIndex: 'nome', key: 'nome' },
    { title: 'Perfil', dataIndex: 'perfil', key: 'perfil' },
    { title: 'Telefone', dataIndex: 'telefone', key: 'telefone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (value, record, index) => (
        <>
          <IconButton onClick={() => handleEdit(index)}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={() => handleDelete(index)}>
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