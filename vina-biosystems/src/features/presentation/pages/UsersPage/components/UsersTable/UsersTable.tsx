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
import { useNavigate } from 'react-router-dom';

function UsersTable({ dataSource, userList, updateTable, loading, isAdmin }: UsersTableProp) {
  const [messageApi, contextHolder] = message.useMessage();
  const injector = Injector.getInstance();
  const excludeUserUsecase = injector.getExcludeUserUsecase();
  const [excludeModalVisible, setExcludeModalVisible] = useState(false);
  const [userToDeleteIndex, setUserToDeleteIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleEdit = useCallback((index: number) => {
    const userToEdit = userList[index];
    navigate('/novo-usuario', { state: { isEdit: true, user: userToEdit } });
  }, [userList, navigate]);

  const handleDelete = useCallback((index: number, ) => {
    console.log("Chamou handleDelete");
    if (!isAdmin) {
      messageApi.error({
        type: 'error',
        content: 'Você não tem permissão para excluir usuários. Apenas administradores podem realizar esta ação.',
        duration: 3
      });
      return;
    }
    setUserToDeleteIndex(index);
    setExcludeModalVisible(true);
  }, [messageApi, isAdmin]);
  
  const performExclusion = useCallback(async () => {
    try {
      const index = userToDeleteIndex as number;
      const userToDelete = userList[index];
      await excludeUserUsecase.execute(userToDelete);
      messageApi.success({
        type: 'success',
        content: 'Usuário excluído com sucesso!',
        duration: 2
      });
      updateTable();
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
    } finally {
      setExcludeModalVisible(false);
      setUserToDeleteIndex(null);
    }
  }, [excludeUserUsecase, userList, updateTable, userToDeleteIndex]);

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
          {isAdmin && (
            <IconButton onClick={() => handleEdit(index)}>
              <EditOutlined />
            </IconButton>
          )}
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
      <Modal
        title="Confirmar exclusão"
        open={excludeModalVisible}
        onOk={() => performExclusion()}
        onCancel={() => setExcludeModalVisible(false)}
        okText="Sim"
        cancelText="Não"
      >
        <p>Tem certeza que deseja excluir este usuário?</p>
      </Modal>
      <CustomTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        style={{ marginRight: '3.125rem' }}
        rowKey="id"
        loading={loading}
      />
    </>
  );
};

export default UsersTable;