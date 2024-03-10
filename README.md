## Painel

![Dashboard](https://media.discordapp.net/attachments/1083115321935798314/1199815931870843040/image.png?ex=65fb49a9&is=65e8d4a9&hm=a1183a0d1e05f95705d62cec8a81f60256067533b6eade6ae793cc8c47e64b47&=&format=webp&quality=lossless&width=960&height=319)

## Cadastro

![Cadastro](https://media.discordapp.net/attachments/1083115321935798314/1199816073378275330/image.png?ex=65fb49cb&is=65e8d4cb&hm=3a6aa060dad9e925250ef312b1308694e8de8c7c307d87519d5863485f29b102&=&format=webp&quality=lossless&width=1885&height=647)

## Modal

![Modal](https://cdn.discordapp.com/attachments/1083115321935798314/1199816174280654888/image.png?ex=65fb49e3&is=65e8d4e3&hm=d695e0f51212eb594571d1fde3a532199b668bd6ac41dd9932e2c4e9b2ba4ca0&)

## Validação

![Form](https://cdn.discordapp.com/attachments/1083115321935798314/1199816258930090044/image.png?ex=65fb49f7&is=65e8d4f7&hm=569b892ec73842620b82c39ca2bba06f068e0c717475c25ea316e5eb2f994a32&)

## Mobile

![Mobile](https://cdn.discordapp.com/attachments/1083115321935798314/1199816448638451732/image.png?ex=65fb4a24&is=65e8d524&hm=6a12262fb832797edf8eff268b59438492d4b3c03bd927a2e4e286b3b010145e&)

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

## Cash flow
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

