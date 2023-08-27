# Processo de instalação/atualização

## Instalação/Update

### Removendo versão antiga em andamneto

```bash
  pm2 status
  pm2 delete [:id]
```

### Instalando nova versão

```bash
  rm -R ./app_old_ver -f
  cd /home
  git clone [remote_origin]
  cd /home/app_name
  yarn install
  yarn build
```

### Inicializando nova versão

```bash
  pm2 start "yarn start /home/app_name"
```

### Removendo o ngrok

```bash
  pm2 status
  pm2 delete [:id]
```

### Inicializando o ngrok

```bash
   pm2 start "ngrok http 3000"
```

### Exibindo url do ngrok

```bash
curl http://localhost:4040/api/tunnels/
```
