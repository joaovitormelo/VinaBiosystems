import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IconButton, CustomTable, GlobalStyle } from './styles';
import { useCallback, useState } from 'react';
import { StockTableProp } from './types';
import { Injector } from '../../../../../../core/Injector';
import { message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

function AllotmentTable({ dataSource, getStockData }: StockTableProp) {
  const [messageApi, contextHolder] = message.useMessage();
  const [excludeModalVisible, setExcludeModalVisible] = useState(false);
  const [rawMaterialToDeleteId, setRawMaterialToDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleEdit = useCallback((record: any) => {
    navigate('/novo-insumo', { state: { rawMaterial: {
      id: Number(record.key),
      name: record.nomeInsumo,
      quantity: record.quantidadeAtual,
      unit: record.unidadeMedida || '',
      minQuantity: record.quantidadeMinima
    } } });
  }, [navigate]);

  const handleDelete = useCallback(async (record: any) => {
    setRawMaterialToDeleteId(record.key);
    setExcludeModalVisible(true);
  }, [messageApi]);

  const performExclusion = useCallback(async () => {
    try {
      const removeRawMaterialUsecase = Injector.getInstance().getRemoveRawMaterialUsecase();
      await removeRawMaterialUsecase.execute(rawMaterialToDeleteId as number);
      messageApi.success('Insumo removido com sucesso!');
      getStockData();
      setExcludeModalVisible(false);
      setRawMaterialToDeleteId(null);
    } catch (error: any) {
      messageApi.error(error.message || 'Erro ao remover insumo');
    }
  }, [messageApi, getStockData, rawMaterialToDeleteId]);

  const columns = [
    { title: 'Nome do Insumo', dataIndex: 'nomeInsumo', key: 'NomeInsumo' },
    { title: 'Quantidade atual', dataIndex: 'quantidadeAtual', key: 'quantidadeAtual' },
    { title: 'Quantidade mínima', dataIndex: 'quantidadeMinima', key: 'quantidadeMinima'},
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: any) => ( dataSource.length > 0 && 
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
      <Modal
        title="Confirmar exclusão"
        open={excludeModalVisible}
        onOk={() => performExclusion()}
        onCancel={() => setExcludeModalVisible(false)}
        okText="Sim"
        cancelText="Não"
      >
        <p>Tem certeza que deseja excluir este insumo?</p>
      </Modal>
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
