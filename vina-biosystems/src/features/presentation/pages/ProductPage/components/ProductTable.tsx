import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IconButton, CustomTable, GlobalStyle } from './styles';
import { useCallback, useState } from 'react';
import { ProductTableProp } from './types';
import { message, Modal } from 'antd';
import { Injector } from '../../../../../core/Injector';

function ProductTable({ dataSource, getProductData }: ProductTableProp) {
  const [messageApi, contextHolder] = message.useMessage();
  const [excludeModalVisible, setExcludeModalVisible] = useState(false);
  const [rawMaterialToDeleteId, setRawMaterialToDeleteId] = useState<number | null>(null);

  const handleEdit = useCallback(() => {
    //LÓGICA
  }, []);

  const handleDelete = useCallback(async (record: any) => {
    setRawMaterialToDeleteId(record.key);
    setExcludeModalVisible(true);
  }, [messageApi]);

  const performExclusion = useCallback(async () => {
    try {
      const removeRawMaterialUsecase = Injector.getInstance().getRemoveRawMaterialUsecase();
      await removeRawMaterialUsecase.execute(rawMaterialToDeleteId as number);
      messageApi.success('Insumo removido com sucesso!');
      getProductData();
      setExcludeModalVisible(false);
      setRawMaterialToDeleteId(null);
    } catch (error: any) {
      messageApi.error(error.message || 'Erro ao remover insumo');
    }
  }, [messageApi, getProductData, rawMaterialToDeleteId]);

  const columns = [
    { title: 'Nome do Produto', dataIndex: 'nomeProduto', key: 'NomeProduto' },
    { title: 'Quantidade atual', dataIndex: 'quantidadeAtual', key: 'quantidadeAtual' },
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
      <Modal
        title="Confirmar exclusão"
        open={excludeModalVisible}
        onOk={() => performExclusion()}
        onCancel={() => setExcludeModalVisible(false)}
        okText="Sim"
        cancelText="Não"
      >
        <p>Tem certeza que deseja excluir este produto?</p>
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

export default ProductTable;
