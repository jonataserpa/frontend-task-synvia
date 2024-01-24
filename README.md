## Painel

![Dashboard](https://cdn.discordapp.com/attachments/1083115321935798314/1199815931870843040/image.png?ex=65c3eaa9&is=65b175a9&hm=b30156dfa5ae43fe55065255e9fbc857d4a8f1d89bc62ceecb9a2ec953990642&)

## Cadastro

![Cadastro](https://cdn.discordapp.com/attachments/1083115321935798314/1199816073378275330/image.png?ex=65c3eacb&is=65b175cb&hm=ffb5e2b791224e5c66db27262a88005a7aefd719f59345ec1ac556ab2f6403f8&)

## Modal

![Modal](https://cdn.discordapp.com/attachments/1083115321935798314/1199816174280654888/image.png?ex=65c3eae3&is=65b175e3&hm=690b214cee8870e91b320c3d686e7e31453413aaa655cee633a1e76475b2120e&)

## Validação

![Form](https://cdn.discordapp.com/attachments/1083115321935798314/1199816258930090044/image.png?ex=65c3eaf7&is=65b175f7&hm=8596979aa9bc2b8cf63c98e9702d18e5fd6ce20566a81552aee06451d0070e18&)

## Mobile

![Mobile](https://cdn.discordapp.com/attachments/1083115321935798314/1199816448638451732/image.png?ex=65c3eb24&is=65b17624&hm=6042eb80025210aa52c12d337be7e8714a468820f09294a8f5948eccb7a3d56a&)

## Description

Frontend projeto: Lista Defensoria do Estado do Rio Grande do Sul
- Front: React.js v.18
- Framework: Next.js v.14
- UI: radix-ui
- Icons: lucide-react
- CSS: tailwind - Responsible (Mobile)
- Validation: useForm e zod
- Gerenciamento de estado: zustand
- Test-unitario: Jest 
- Test e2e: Cypress
- Mock: Json-server
- Docker e docker-compose

Obs: - Tratamentos de erros da api: handleApiErrors (400, 404, 500)
     - Camada de Service separado por ServiceGateway e interfaces:
        - getAll, create, getById, updateById, deleteById
     - hooks personalizados
        - useDebounce e modal
     - Contants e Componentes separadas e organizadas;   

## Desafio Synvia
 - CRUD: Modal e Form inputs use radix-ui 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# exec json-server
$ npm run mock

# dev
$ npm run dev

# test
$ npm test

# se desejar usar uma imagem docker: 
# docker-compose permissao
$ npm sudo chmod +x .docker/entrypoint.sh

# docker-compose up
$ sudo docker-compose up

```

