import React from 'react';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';
import { CustomSearch } from './styles';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => Search;

const App: React.FC = () => (
  <Space direction="vertical">
    <CustomSearch placeholder="Pesquisar usuário" allowClear onSearch={onSearch} style={{ width: 567 }} size = "large" />
  </Space>
);

export default App;