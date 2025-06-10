import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { IconButton, CustomTable, GlobalStyle } from './styles';
import { ColumnsType } from 'antd/es/table';
import { useCallback } from 'react';
import { StockTableProp } from './types';

function AllotmentTable({ dataSource }: StockTableProp) {
  const handleEdit = useCallback(() => {
    //LÓGICA
  }, []);

  const handleDelete = useCallback(() => {
    //LÓGICA
  }, []);

  const columns = [
    { title: 'Nome do Insumo', dataIndex: 'nomeInsumo', key: 'NomeInsumo' },
    { title: 'Quantidade atual', dataIndex: 'quantidadeAtual', key: 'quantidadeAtual' },
    { title: 'Quantidade mínima', dataIndex: 'quantidadeMinima', key: 'quantidadeMinima'},
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

export default AllotmentTable;
