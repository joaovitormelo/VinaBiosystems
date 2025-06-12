# VinaBiosystems
Sistema de software para a empresa Vina Biotech, desenvolvido como parte do projeto final da disciplina de Engenharia de Software (UFV 2025).

## Pré-requisitos
- [Docker](https://www.docker.com/get-started)


## Rodando a aplicação
Execute os seguintes comandos na raiz do projeto:

```bash
docker-compose build --no-cache
docker-compose up
```

Acesse a aplicação em http://localhost:9000

Caso atualize as dependências usando o npm install (como instalar uma nova biblioteca), execute:
```bash
docker-compose down 
docker-compose build --no-cache
docker-compose up
```
Isso garantirá que as novas dependências sejam refletidas corretamente na imagem Docker.

## Diagrama de Classes UML
![Diagrama de Classes](https://github.com/user-attachments/assets/4a0ccb3c-1533-46c5-aecc-83bb4b6f071c)

## Apresentação Parcial
[Slides](https://www.canva.com/design/DAGqApeoEKQ/3kLv0kNzwonMMfBMdBBnuw/edit?ui=eyJIIjp7IkEiOnRydWV9fQ)
