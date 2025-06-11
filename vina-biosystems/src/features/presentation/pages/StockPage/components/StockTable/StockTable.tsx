import React from 'react';
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { IconButton, CustomTable, GlobalStyle } from './styles';
import { ColumnsType } from 'antd/es/table';
import { useCallback } from 'react';
import { StockTableProp } from './types';
import { Injector } from '../../../../../../core/Injector';
import { message } from 'antd';

function AllotmentTable({ dataSource, getStockData }: StockTableProp) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleEdit = useCallback(() => {
    //LÓGICA
  }, []);

  const handleDelete = useCallback(async (record: any) => {
    try {
      const removeRawMaterialUsecase = Injector.getInstance().getRemoveRawMaterialUsecase();
      await removeRawMaterialUsecase.execute(record.key);
      messageApi.success('Insumo removido com sucesso!');
      getStockData();
      window.location.reload();
    } catch (error: any) {
      messageApi.error(error.message || 'Erro ao remover insumo');
    }
  }, [messageApi]);

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
      />
    </>
  );
};

export default AllotmentTable;
