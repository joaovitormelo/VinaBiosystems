// styles.ts
import styled from 'styled-components';
import { Input } from 'antd';

export const CustomSearch = styled(Input.Search)`
    max-width: 600px;
    width: 100%;
    position: relative;
    display: flex; 
    justify-content: flex-start;


    /* Aumenta o wrapper do input */
  .ant-input-affix-wrapper {
    height: 55px !important;
    font-size: 24px;

    &:hover {
      border-color: #0E3226 !important;
      color: #0E3226 !important;
      box-shadow: #0E3226 !important;
    }
  }

  .ant-input-affix-wrapper-focused {
    border-color: #0E3226 !important;
    box-shadow: none !important;
  }

  /* Aumenta a altura do input */
  .ant-input {
    height: 100% !important;
    font-size: 24px;
  }

  /* Se estiver usando botão */
  .ant-input-search-button {
    height: 55px !important;
    width: 60px !important;
    font-size: 24px;

    &:hover {
      border-color: #0E3226 !important;
      color: #0E3226 !important;
    }
  }

`;
