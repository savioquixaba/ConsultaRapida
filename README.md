# ConsultaRapida 🔍

Sistema agregador de consultas a APIs externas. Substitui o uso do Postman para consultas rotineiras, automatizando chamadas e filtrando apenas os campos necessários.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Java 21 + Spring Boot 3.4.4 |
| Frontend | React 19 + TypeScript + Vite |
| Estilo | Tailwind CSS v4 + shadcn/ui |
| HTTP Client | OpenFeign |
| Build | Maven |

## Funcionalidades

- Consulta de protocolo via API externa (Basic Auth)
- Extração automática de CPF a partir do protocolo
- Consulta secundária a API de CPF com dados biométricos e biográficos
- Resposta consolidada com apenas os campos relevantes
- Alternância entre tema claro/escuro
- Botão copiar por campo
- Tema escuro moderno com glassmorphism

## Fluxo

```
Usuário → Frontend → GET /api/consultas/{protocolo}
                         ↓
                    Backend → API 1 (DadosAtendimento) → retorna CPF
                         ↓
                    Backend → API 2 (ConsultarCPF) → indicadores
                         ↓
                    Resposta consolidada → Frontend
```

## Como rodar

### Backend

```bash
cd backend
cp .env.example .env   # Preencha com suas credenciais
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir `http://localhost:5173`

## Variáveis de ambiente (`.env`)

| Variável | Descrição |
|----------|-----------|
| `API1_URL` | URL base da API de protocolo |
| `API1_USERNAME` | Usuário Basic Auth API 1 |
| `API1_PASSWORD` | Senha Basic Auth API 1 |
| `API2_URL` | URL base da API de CPF |
| `API2_USERNAME` | Usuário Basic Auth API 2 |
| `API2_PASSWORD` | Senha Basic Auth API 2 |
| `API2_CPF_USUARIO` | CPF do usuário para autenticação na API 2 |
| `SERVER_PORT` | Porta do servidor (default: 8080) |

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/consultas/{protocolo}` | Consulta protocolo e retorna dados consolidados |

## Resposta exemplo

```json
{
  "protocolo": "123456",
  "nrCpf": "12345678900",
  "pendenciaRFB": false,
  "descricaoPendencia": null,
  "indConsBiografica": 2,
  "indConsBiometrica": 3
}
```

## Segurança

- Credenciais armazenadas em `.env` (ignorado pelo git)
- Mensagens de erro sanitizadas (não expõem detalhes internos)
- Falha da API 2 não interrompe o resultado da API 1
- Basic Auth gerado em runtime

## Licença

Desenvolvido por [Sávio Quixaba](https://github.com/savioquixaba)
