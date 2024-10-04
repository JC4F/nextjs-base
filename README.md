# Build a base NextJs apps with Shadcn, React Query, Zustand, Next-intl, Nextauth, Docker

Features:
- 🎊 Deploy: Vercel, Vps
- 🛠️ Setup with ESLint, Prettier, Husky, Commitlint, and Cspell
- 🧰 CI/CD pipelines with Github action to automate deployment on Vercel and VPS (Docker)
- ⌨️ State Management:
  - Client: Zustand
  - Server: Tanstack Query
- 🎨 SSO with Google, Github
- 🎎 Darkmode
- ↩️ I18

### Install packages

```shell
pnpm i
```

### Setup .env file

```shell
NEXTAUTH_URL=xxxxxx
NEXTAUTH_SECRET=xxxxxx

GITHUB_CLIENT_ID=xxxxxx
GITHUB_CLIENT_SECRET=xxxxxx

GOOGLE_CLIENT_ID=xxxxxx
GOOGLE_CLIENT_SECRET=xxxxxx

JWT_SECRET=xxxxxx
```

### Start the app

```shell
pnpm dev
or
pnpm start
```
