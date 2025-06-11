import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { IconButton, CustomTable } from './styles';
import { useCallback, useState } from 'react';
import { AllotmentTableProp } from './types';
import { Button, Modal } from 'antd';

function AllotmentTable({ dataSource }: AllotmentTableProp) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState<any>(null);
  const handleInfo = useCallback(() => {
    //LÓGICA
  }, []);

  const handleEdit = useCallback(() => {
    //LÓGICA
  }, []);

  const handleUpdateSituation = useCallback((record: any) => {
    setRecordToUpdate(record);
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(async () => {
    //LÓGICA
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setRecordToUpdate(null);
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
          <IconButton onClick={() => handleUpdateSituation(record)}>
            <DeleteOutlined />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        style={{ marginRight: '3.125rem' }}
      />

      <Modal 
        title="Confirmar alteração de situação"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Confirmar
          </Button>,
        ]}
      >
        <p>Tem certeza que deseja alterar a situação deste registro?</p>
        {recordToUpdate && (
          <>
            <p>Registro: {recordToUpdate.rotulo}</p>
            <p>Situação atual: {recordToUpdate.situacao}</p>
            <p>Nova situação: CANCELADO</p>
          </>
        )}
      </Modal>
    </>
      
  );
};

export default AllotmentTable;
