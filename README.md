# FIAP FreeRooms - Checkpoint 2

**FIAP FreeRooms** é um aplicativo mobile desenvolvido para a disciplina de **Mobile Development & IOT** da FIAP. O projeto visa facilitar a vida acadêmica possibilitando a consulta e reserva de salas de aula e laboratórios no campus.

## 🚀 Checkpoint 2: Novas Funcionalidades
Nesta segunda fase, focamos em segurança, persistência e experiência do usuário (UX), implementando um sistema completo de autenticação e personalização.

### 🔐 Autenticação e Segurança
- **Sistema de Login e Cadastro**: Telas dedicadas para acesso seguro ao aplicativo.
- **Validação de Formulários**: Feedback em tempo real com mensagens de erro inline e botões de ação desabilitados para dados inválidos.
- **Rotas Protegidas**: Uso de Context API para garantir que apenas usuários autenticados acessem o conteúdo principal.
- **Persistência de Sessão**: Integração com `AsyncStorage` para manter o usuário logado mesmo após fechar o app.

### 🎨 Diferencial Técnico: Tema Dinâmico (Dark Mode)
- **Theme Context**: Implementação de um gerenciador de temas global que permite alternar entre os modos Claro e Escuro.
- **Paleta Premium**: Cores cuidadosamente selecionadas para garantir acessibilidade e uma estética moderna em ambos os temas.
- **Persistência de Preferência**: O tema escolhido pelo usuário é salvo localmente.

### 📋 Requisitos Técnicos Atendidos
- [x] **Context API**: Gerenciamento de estado de autenticação e temas.
- [x] **AsyncStorage**: Persistência de dados de usuários e preferências.
- [x] **Expo Router**: Navegação avançada com grupos de rotas e proteção.
- [x] **Validation**: Regras estritas para e-mail e senhas.
- [x] **Clean Code**: Estrutura de pastas organizada e componentes reutilizáveis.

---

## 👥 Desenvolvedores
- **RM556319 Felipe Marques de Oliveira** (Dono do Projeto - Auth Logic, Theme Context, UI Polish)
- **RM556309 Gabriel Barros** (Form Validation, AsyncStorage Integration, Navigation Logic)

---

## 📱 Telas do Aplicativo

### 1. Autenticação (Login e Registro)
Interface moderna com validações inline e design intuitivo.
<p align="center">
  <img src="https://github.com/user-attachments/assets/e12e94b0-08aa-48ed-b284-c60ae303805a" width="300" alt="Login Screen"/>
</p>

### 2. Tema Escuro (Diferencial)
Visual premium adaptado para ambientes com pouca luz.
<p align="center">
  <img src="https://github.com/user-attachments/assets/6355a291-d164-4770-9edc-3f35433a56fe" width="300" alt="Dark Mode"/>
</p>

### 3. Gestão de Reservas
Fluxo completo de reserva e visualização de histórico.
<p align="center">
  <img src="https://github.com/user-attachments/assets/40631e3c-fb53-471b-adf7-e0ddcdd9d1d2" width="300" alt="Reservas"/>
</p>

---

## 🛠️ Stack Tecnológica
- **React Native** + **Expo** (v51+)
- **Expo Router** (Navegação baseada em arquivos)
- **Context API** (State Management)
- **AsyncStorage** (Local Persistence)
- **Ionicons** (Iconografia)

---

## ⚙️ Como Rodar o Projeto
1. Clone este repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o Expo:
   ```bash
   npx expo start
   ```

---
*Projeto acadêmico desenvolvido para a FIAP - 2026*
