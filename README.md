<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

##Regras De Negocio
###** Usuario:**
 + ####1. Criar Usuario;
  * 1.1 Usuario não pode existir na base de dados
    * 1.2 Criar conta;
      * 1.2.1 Conta inicial tera o valor de 0;
      *  1.2.2 E-mail e CPF unicos;
        *  1.2.2.1 CPF e E-mail tem de ser valido;
        *   1.2.2.2 Retorna status 409, Usuario existe;
        *   1.2.2.3 Retorna status 406, O CPF é invalido;
      * 1.2.3 Retorna 201, Usuario criado;

+ ####2.Buscar Usuario na base pelo cpf;
  * 2.1 CPF tende de ser unico e valido;
     * 2.1.1 Retorna status 406, O CPF é invalido;
  * 2.2 Retorna 200, Dados de Usuario;
  * 2.3 Buscar todos os usuarios;

### Conta:

+ ##### Usuario existente na base de dados:
     * Ter conta com qualquer valor;
     * Buscar na conta, CPF e Email validos dentro do Usuario;

+ ##### Sacar e depositar:
    *  Valores de sacar não podem ser maior que o saldo atual;
       * Valores para depositos não podem ser negativos;

+ ##### Transferencia:
   *  Valores não podem ser maiores que saldo atual; Deposito, Sacar.
       * Não pode transferir para o mesmo cpf;
        * Não pode transferir para o cpf que não exista;
       * 6 Digitos cada numero sera aleatorio e não existir

Feito: [Zero](http://instagram.com/zero_raven23/ "Zero")
E-mail:  luizcavina@gmail.com