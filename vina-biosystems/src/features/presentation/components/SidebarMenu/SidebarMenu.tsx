import React, { use, useCallback, useState } from "react";
import { Menu, Typography } from 'antd';
import { ExperimentOutlined, IdcardOutlined, InboxOutlined, ReconciliationOutlined, TeamOutlined } from "@ant-design/icons";
import { Sidebar, Logo, ExitButton } from "./styles";
import logoVinaVertical from '../../utils/logoVinaVertical.png'
import { useNavigate } from "react-router-dom";
import type { MenuInfo } from 'rc-menu/lib/interface';
import { Injector } from "../../../../core/Injector";
import { DoLogoutUsecase } from "../../../domain/usecases/authentication/doLogoutUsecase";

const { Link } = Typography;

function SidebarMenu(){
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const navigate = useNavigate();
    const injector = Injector.getInstance();
    const doLogoutUsecase = injector.getDoLogoutUsecase();

    const handleMenuClick = useCallback(({ key }: MenuInfo) => {
        switch(key){
            case "1":
                navigate('/perfil');
                break;
            case "2":
                navigate('/usuarios');
                break;
            case "3":
                navigate('/produtos');
                break;
            case "4":
                navigate('/estoque');
                break;
            case "5":
                navigate('/lotes');
                break;
            default:
                break;
        }
    }, [navigate]);

    const handleExit = useCallback(async () => {
        try {
            await doLogoutUsecase.execute();
            navigate('/login');
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
        }
    }, [navigate, doLogoutUsecase]);

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
                <Menu.Item key="3" icon={<ExperimentOutlined />}>
                    Produtos
                </Menu.Item>
                <Menu.Item key="4" icon={<InboxOutlined />}>
                    Estoque
                </Menu.Item>
                <Menu.Item key="5" icon={<ReconciliationOutlined />}>
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