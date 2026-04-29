# FIAP FreeRooms - Checkpoint 2

**FIAP FreeRooms** é um aplicativo mobile desenvolvido para a disciplina de **Mobile Development & IOT** da FIAP. O projeto visa facilitar a vida acadêmica possibilitando a consulta e reserva de salas de aula e laboratórios no campus.

**Desenvolvido por:**
- **RM556319 Felipe Marques de Oliveira** 
- **RM556309 Gabriel Barros** 

---

## O Projeto
Nesta segunda fase do projeto, evoluímos a aplicação para um nível mais profissional, focando em segurança, persistência de dados e personalização da experiência do usuário. O app agora conta com um fluxo completo de acesso e permite que o usuário escolha o tema visual que melhor se adapta ao seu ambiente.

---

## Telas

### 1. Autenticação (Login e Registro)
Interface moderna com validações inline e design intuitivo para garantir que apenas alunos e professores cadastrados acessem a plataforma.
<p align="center">
  <img width="401" height="859" alt="Login e Cadastro" src="https://github.com/user-attachments/assets/5f42b6f5-f139-4f8e-8b84-c54154be9103" />
</p>

### 2. Tema Escuro (Diferencial Técnico)
Implementação de Dark Mode completo, permitindo uma visualização confortável em ambientes com pouca luz e economia de bateria em telas OLED.
<p align="center">
  <img width="398" height="858" alt="Dark Mode" src="https://github.com/user-attachments/assets/00352303-c76e-41f0-9b17-ca17877858dc" />
</p>

### 3. Gestão de Reservas e Detalhes
Fluxo refinado de consulta, reserva e visualização de histórico, integrando o nome do usuário logado e persistindo suas escolhas. Sistema de bloqueio de horários impede reservas duplicadas.
<p align="center">
  <img width="400" height="858" alt="Reservas" src="https://github.com/user-attachments/assets/cfc31773-ce89-45ce-8e2a-2d69b2be26d6" />
</p>

### 4. Sistema de Reports
Funcionalidade para reportar problemas em salas. Reports são exibidos em modal acessível pelo botão "Ver Reports", permitindo que apenas o autor remova seu próprio report.
<p align="center">
  <img width="430" height="858" alt="image" src="https://github.com/user-attachments/assets/8ff6f4ff-c1a2-47be-8dda-4f963b3f98ae" />
  <img width="434" height="858" alt="image" src="https://github.com/user-attachments/assets/34662573-d1bf-4af5-a657-750174ca9c08" />
</p>

---

## Funcionalidades Implementadas

- **Sistema de Autenticação**: Fluxo completo de Login e Registro com suporte a múltiplos usuários.
- **Validação de Formulários**: Feedback visual imediato para e-mails inválidos, senhas curtas e confirmação de senha incorreta.
- **Rotas Protegidas**: Bloqueio de acesso às funcionalidades internas para usuários não autenticados via middleware de navegação.
- **Personalização de Tema (Dark Mode)**: Alternância dinâmica entre temas Claro e Escuro, com persistência da preferência do usuário.
- **Persistência com AsyncStorage**: Armazenamento local de credenciais e configurações de tema, mantendo a sessão ativa mesmo após fechar o app.
- **Busca e Filtros Avançados**: Filtros por andar e status (Livre, Ocupada, Manutenção) totalmente integrados ao sistema de temas.
- **Gerenciamento de Favoritos e Reservas**: Centralização de salas preferidas e agendamentos com feedback visual de sucesso/erro.
- **Sistema de Reserva com Bloqueio de Horários**: Ao reservar uma sala para um horário específico, o horário fica bloqueado com ícone de cadeado. Ao cancelar, o horário volta a ficar disponível para outros usuários.
- **Sistema de Reports**: Permite reportar problemas em salas. Os reports podem ser visualizados clicando no botão "Ver Reports" e apenas o autor pode remover seus próprios reports.

---

## Decisões Técnicas

**Estrutura**:
Organização escalável baseada em pastas via **Expo Router**, com separação clara entre:
- `app/(auth)`: Grupo de rotas protegidas para autenticação.
- `app/(tabs)`: Navegação principal por abas.
- `context/`: Provedores de estado global (Auth e Theme).
- `components/`: Componentes reutilizáveis e estilizados dinamicamente.

**Hooks e Gerenciamento de Estado**:
- **useContext (Auth & Theme)**: Centralização do estado de login e cores do aplicativo, eliminando o "prop drilling".
- **useState e useEffect**: Controle de ciclos de vida, validações em tempo real e carregamento de dados do AsyncStorage.
- **useRouter**: Navegação imperativa entre fluxos de autenticação e telas de salas.

**Navegação**:
- Combinação de **Stack Navigation** para o fluxo de autenticação e **Tab Navigation** para a área logada, garantindo uma transição fluida e segura.

---

## Stack Tecnológica
- **React Native + Expo**
- **Expo Router** (Navegação baseada em arquivos)
- **Context API** (Gerenciamento de estado global)
- **AsyncStorage** (Persistência local de dados)
- **Ionicons** (Iconografia dinâmica)

---

## Como Rodar o App
1. Clone este repositório.
2. No terminal, execute:
   ```bash
   npm install
   ```
3. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
   Execute o app em uma das opções abaixo:
- Utilize o app **Expo Go** no seu celular (Scaneie o QR Code).
- Pressione **a** para abrir no Android Studio (emulador Android).
- Pressione **i** para abrir no iOS Simulator (apenas para macOS).
- Pressione **w** para abrir a versão **Web** no navegador.

---
*Projeto acadêmico desenvolvido para a FIAP Professor Hercules - 2026*
