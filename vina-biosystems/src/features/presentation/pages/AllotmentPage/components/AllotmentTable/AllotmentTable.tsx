import { EditOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { IconButton, CustomTable } from './styles';
import { useCallback, useState } from 'react';
import { AllotmentColumns, AllotmentTableProp } from './types';
import { Button, Modal, message } from 'antd';
import { Injector } from '../../../../../../core/Injector';
import { BatchModel } from '../../../../../domain/models/batchModel';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { UtilityFunctions } from '../../../../utils/UtilityFunctions';

function AllotmentTable({ dataSource, getAllotmentData, productList }: AllotmentTableProp) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleInfo = useCallback((record: any) => {
    navigate('/info-lote', { 
      state: { 
        rotulo: record.rotulo,
        situacao: record.situacao
      } 
    });
  }, [navigate]);

  const handleEdit = useCallback((record: any) => {
    navigate('/novo-lote', { state: { lote: record } });
  }, [navigate]);

  const handleUpdateSituation = useCallback((record: any) => {
    setRecordToUpdate(record);
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(async () => {
    try {
      const cancelProductionBatchUsecase = Injector.getInstance().getCancelProductionBatchUsecase();
      
      const batch = new BatchModel(
        parseInt(recordToUpdate.key),
        recordToUpdate.rotulo,
        moment(),
        moment(),
        [],
        recordToUpdate.situacao,
        recordToUpdate.productId ? parseInt(recordToUpdate.productId) : null,
        recordToUpdate.productQuantity ? parseInt(recordToUpdate.productQuantity) : null
      );

      await cancelProductionBatchUsecase.execute(batch);
      
      messageApi.success({
        type: 'success',
        content: 'Lote cancelado com sucesso!',
        duration: 2
      });

      setIsModalVisible(false);
      setRecordToUpdate(null);
      getAllotmentData();
    } catch (error: any) {
      console.error('Erro ao cancelar lote:', error);
      messageApi.error({
        type: 'error',
        content: error.message || 'Erro ao cancelar lote. Tente novamente.',
        duration: 3
      });
    }
  }, [recordToUpdate, messageApi]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setRecordToUpdate(null);
  }, []);

  const columns = [
    { title: 'Rótulo', dataIndex: 'rotulo', key: 'rotulo' },
    { 
      title: 'Situação', dataIndex: 'situacao', key: 'situacao',
      render: (text: string) => {
        const color = text === 'canceled' ?  'red' : text === 'closed' ? 'grey' : 'green';
        return <span style={{ color }}>{UtilityFunctions.getSituationLabel(text)}</span>;
      }
    },
    { 
      title: 'Produto', dataIndex: 'produto', key: 'produto',
      render: (text: string, record: any) => {
        const product = productList.find(
          product => "" + (product.getId() as number) == record.productId
        );
        return product ? product.getName() : 'Produto não encontrado';
      }
    },
    { 
      title: 'Quantidade', dataIndex: 'productQuantity', key: 'productQuantity',
      render: (text: string) => {
        return text; // Retorno para função não gerar erro de void...
      }
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: any) => ( dataSource.length > 0 && 
        <>
          <IconButton onClick={() => handleInfo(record)}>
            <InfoCircleOutlined />
          </IconButton>
          {/*<IconButton onClick={() => handleEdit(record)}>
            <EditOutlined />
          </IconButton>*/}
          <IconButton onClick={() => handleUpdateSituation(record)}>
            <CloseCircleOutlined />
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
            <p>Situação atual: {UtilityFunctions.getSituationLabel(recordToUpdate.situacao)}</p>
            <p>Nova situação: {UtilityFunctions.getSituationLabel("canceled")}</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default AllotmentTable;
