import React, { use, useCallback, useState } from "react";
import { Menu, Typography } from 'antd';
import { IdcardOutlined, InboxOutlined, ReconciliationOutlined, TeamOutlined } from "@ant-design/icons";
import { Sidebar, Logo, ExitButton } from "./styles";
import logoVinaVertical from '../../utils/logoVinaVertical.png'
import { useNavigate } from "react-router-dom";
import type { MenuInfo } from 'rc-menu/lib/interface';


const { Link } = Typography;

function SidebarMenu(){
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const navigate = useNavigate();
    const handleMenuClick = useCallback(({ key }: MenuInfo) => {
        switch(key){
            case "1":
                navigate('/perfil');
                break;
            case "2":
                navigate('/userpage');
                break;
            case "3":
                navigate('/estoque');
                break;
            case "4":
                navigate('/lotes');
                break;
            default:
                break;
        }
    }, [navigate]);

    const handleExit = useCallback(() => {
        navigate('/login');
    }, [navigate]);

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
                <Menu.Item key="4" icon={<ReconciliationOutlined />}>
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