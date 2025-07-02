import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IconButton, CustomTable } from './styles';
import { useCallback, useState } from 'react';
import { ProductTableProp } from './types';
import { message, Modal } from 'antd';
import { Injector } from '../../../../../core/Injector';
import { useNavigate } from 'react-router-dom';

function ProductTable({ dataSource, getProductData, productList }: ProductTableProp) {
  const [messageApi, contextHolder] = message.useMessage();
  const [excludeModalVisible, setExcludeModalVisible] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleEdit = useCallback((index: number) => {
    navigate('/novo-produto', { state: {
      product: productList[index].toJson()
    } });
  }, [navigate, productList]);

  const handleDelete = useCallback(async (record: any) => {
    setProductToDeleteId(record.key);
    setExcludeModalVisible(true);
  }, [messageApi]);

  const performExclusion = useCallback(async () => {
    try {
      const deleteProductUsecase = Injector.getInstance().getDeleteProductUsecase();
      await deleteProductUsecase.execute(productToDeleteId as number);
      messageApi.success('Insumo removido com sucesso!');
      getProductData();
      setExcludeModalVisible(false);
      setProductToDeleteId(null);
    } catch (error: any) {
      messageApi.error(error.message || 'Erro ao remover insumo');
    }
  }, [messageApi, getProductData, productToDeleteId]);

  const columns = [
    { title: 'Nome do Produto', dataIndex: 'nomeProduto', key: 'NomeProduto' },
    { title: 'Quantidade atual', dataIndex: 'quantidadeAtual', key: 'quantidadeAtual' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: any, index: number) => ( dataSource.length > 0 && 
        <>
          <IconButton onClick={() => handleEdit(index)}>
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
