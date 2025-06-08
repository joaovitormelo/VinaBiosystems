import React, { use, useCallback, useState } from "react";
import { Menu, Typography } from 'antd';
import { IdcardOutlined, InboxOutlined, ReconciliationOutlined, TeamOutlined } from "@ant-design/icons";
import { Sidebar, Logo, ExitButton } from "./styles";
import logoVinaVertical from '../../utils/logoVinaVertical.png'

const { Link } = Typography;

function SidebarMenu(){
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const handleMenuClick = useCallback(() => {
        //LÓGICA
    }, []);

    const handleExit = useCallback(() => {
        //LÓGICA
    }, []);

    return (
      <Sidebar>
        <div>
            <Logo
                src={logoVinaVertical}
                alt="Logo Vina Biotech em bege na vertical"
                preview={false}
            />

            <Menu
                mode="inline"
                selectedKeys={selectedKeys}
                onSelect={({ key }) => setSelectedKeys([key])}
                onClick={handleMenuClick}
            >
                <Menu.Item key="1" icon={<IdcardOutlined />}>
                    Perfil
                </Menu.Item>
                <Menu.Item key="2" icon={<TeamOutlined />}>
                    Usuários
                </Menu.Item>
                <Menu.Item key="3" icon={<InboxOutlined />}>
                    Estoque
                </Menu.Item>
                <Menu.Item key="2" icon={<ReconciliationOutlined />}>
                    Lotes
                </Menu.Item>
            </Menu>
        </div>
        <ExitButton>
            <Link onClick={handleExit}>Sair</Link>
        </ExitButton>
      </Sidebar>
    )
}

export default SidebarMenu;