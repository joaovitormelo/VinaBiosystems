import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { IconButton, CustomTable, GlobalStyle } from './styles';
import { ColumnsType } from 'antd/es/table';
import { useCallback } from 'react';
import { UsersTableProp } from './types';

function UsersTable({ dataSource }: UsersTableProp) {
  const handleEdit = useCallback(() => {
    //LÓGICA
  }, []);

  const handleDelete = useCallback(() => {
    //LÓGICA
  }, []);

  const columns = [
    { title: 'Nome do Usuário', dataIndex: 'nome', key: 'nome' },
    { title: 'Perfil', dataIndex: 'perfil', key: 'perfil' },
    { title: 'Telefone', dataIndex: 'telefone', key: 'telefone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: any) => ( dataSource.length > 0 && 
        <>
          <IconButton onClick={handleEdit}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteOutlined />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      style={{ marginRight: '3.125rem' }}
    />
      
  );
};

export default UsersTable;
