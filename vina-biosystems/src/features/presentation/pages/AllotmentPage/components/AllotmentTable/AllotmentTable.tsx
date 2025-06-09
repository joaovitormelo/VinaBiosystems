import { Table } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { IconButton, CustomTable, GlobalStyle } from './styles';
import { ColumnsType } from 'antd/es/table';
import { useCallback } from 'react';
import { AllotmentTableProp } from './types';

function AllotmentTable({ dataSource }: AllotmentTableProp) {
  const handleInfo = useCallback(() => {
    //LÓGICA
  }, []);

  const handleEdit = useCallback(() => {
    //LÓGICA
  }, []);

  const handleDelete = useCallback(() => {
    //LÓGICA
  }, []);

  const columns = [
    { title: 'Rótulo', dataIndex: 'rotulo', key: 'rotulo' },
    { title: 'Situação', dataIndex: 'situacao', key: 'situacao' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: any) => ( dataSource.length > 0 && 
        <>
          <IconButton onClick={handleInfo}>
            <InfoCircleOutlined />
          </IconButton>
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
