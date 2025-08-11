# 🚀 Microservices Backend com Node.js, TypeScript, Clean Architecture e SOLID

Este projeto é um backend completo baseado em **arquitetura de microsserviços**, desenvolvido com **Node.js** e **TypeScript**, seguindo os princípios de **Clean Architecture** e **SOLID** para garantir código organizado, escalável e fácil de manter.

## 📦 Estrutura do Projeto

O sistema é composto por 4 serviços independentes, que se comunicam via **RabbitMQ** e **API Gateway**.

### **1. Auth Service**
- Registro e autenticação de usuários
- Geração e validação de **JWT**
- Criptografia segura de senhas com **Argon2**

### **2. User Service**
- Gerenciamento de usuários (criação, atualização, listagem)
- **Rate limiting** para prevenção de abusos
- Comunicação assíncrona com outros serviços via RabbitMQ

### **3. Post Service**
- CRUD completo (criar, listar, atualizar e deletar)
- Operações em lote para exclusão múltipla
- Validação de dados com **Zod**

### **4. Gateway Service**
- Entrada única para todos os clientes
- Roteamento inteligente via **express-http-proxy**
- Autenticação centralizada

---

## 🛠 Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express.js**
- **Prisma ORM**
- **RabbitMQ**
- **JWT** + **Argon2**
- **Zod** para validação de dados
- **CORS** e **morgan** para configuração e logging
- **express-rate-limit** (no serviço de usuários)
- **dotenv** para variáveis de ambiente

---

## 🏗 Arquitetura

- **Clean Architecture**: Separação clara de camadas (Entities, Use Cases, Interface Adapters, Frameworks/Drivers)
- **Princípios SOLID**: Garantindo coesão, desacoplamento e manutenibilidade
- **Mensageria Assíncrona**: RabbitMQ para comunicação entre serviços
- **API Gateway**: Ponto único de entrada para roteamento e autenticação


---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js >= 18
- pnpm >= 10
- Docker (para rodar RabbitMQ e banco de dados)

Se quiser, eu posso criar **uma versão do README com um diagrama visual de arquitetura** já incorporado, para deixar mais profissional no GitHub. Isso ajuda muito na apresentação. Quer que eu faça essa versão também?




