import React, { useCallback } from "react";
import { Header, SidebarMenu } from "../../components";
import { Container, Content, NewAllotment, InfoContainer, InfoItem, Label, Value, InsumosList, InsumoItem } from "./styles";

interface AllotmentInfoPageProps {
    rotulo: string;
    situacao: string;
}

function AllotmentInfoPage({ rotulo, situacao }: AllotmentInfoPageProps){
    //Consultar no banco as informações que não estão na tabela
    const data = {
        dataInicio: "2024-03-15",
        dataTermino: "2024-06-20",
        insumos: [
            {
                id: 1,
                nome: "Fertilizante NPK 10-10-10",
                quantidade: 50,
                unidadeMedida: "kg"
            },
            {
                id: 2,
                nome: "Herbicida Glifosato",
                quantidade: 5,
                unidadeMedida: "L"
            },
            {
                id: 3,
                nome: "Semente de Soja",
                quantidade: 120,
                unidadeMedida: "kg"
            },
            {
                id: 4,
                nome: "Inseticida Imidacloprido",
                quantidade: 3,
                unidadeMedida: "L"
            }
        ]
    }

    const onClick = useCallback(() => {
        //redirecionar para a página de finalizar lotes
        //esse é o click do botão
    }, []);

    // const loadInitialData = useCallback(async () => {
    //     //Logica
    // }, []);

    // useEffect(() => {
    //     loadInitialData();
    // }, [loadInitialData]);

    //DEIXEI UMA CONDIÇÃO UTILIZANDO A VARIÁVEL SITUAÇÃO PARA EXIBIR O BOTÃO E A DATA DE TÉRMINO
    //LEVEI EM CONSIDERAÇÃO O QUE ESTAVA ESCRITO NO BANCO DE DADOS "Em Aberto", MAS SE VIER DE FORMA DIFERENTE
    //(EM LETRAS MAIÚSCULAS OU NAO SEI) É SÓ ALTERAR QUE FUNCIONA

    return (
        <NewAllotment>
            <SidebarMenu />
            <Container>
                <Header title="Lote" buttonName="Finalizar lote" showButton={situacao === 'Em Aberto' ? true : false} actionButton={onClick} />
                <Content>
                    <InfoContainer>
                        <InfoItem>
                            <Label>Rótulo:</Label>
                            <Value>{rotulo}</Value>
                        </InfoItem>
                        <InfoItem>
                            <Label>Insumos utilizado:</Label>
                            {data.insumos.length > 0 ? (
                                <InsumosList>
                                    {data.insumos.map((insumo) => (
                                        <InsumoItem key={insumo.id}>
                                            {insumo.nome}: {insumo.quantidade} {insumo.unidadeMedida}
                                        </InsumoItem>
                                    ))}
                                </InsumosList>
                            ) : (
                                <Value>Nenhum insumo informado</Value>
                            )}
                        </InfoItem>
                        <InfoItem>
                            <Label>Data de início:</Label>
                            <Value>
                                {data?.dataInicio}
                            </Value>
                        </InfoItem>
                        {situacao !== 'Em Aberto' && (
                        <InfoItem>
                            <Label>Data de término:</Label>
                            <Value>
                                {data.dataTermino}
                            </Value>
                        </InfoItem>
                    )}
                    </InfoContainer>
                </Content>
            </Container>
        </NewAllotment>
    )
}
export default AllotmentInfoPage;