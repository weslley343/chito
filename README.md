# Acompanhar

## Setup 

### Ubuntu Based Distros

To setup this program, you must need to isntall _npm_ and _docker_. 
Also to interaction we recomend to use our frontend, wich will be available soon _here_

Add execution permission to scripts folder
```
cd scripts && chmod u+x *.sh
```

Setup the program
```
./scripts/setup.sh
```

Run the program
```
./scripts/start.sh
```

## Start
subir o container docker e rodar a aplicação

## Stop

## Adicionar Usuários

## Criar versão de Demonstração


npm install &&
docker-compose -f /compose/postgres/docker-compose.yml up -d &&
npx prisma migrate deploy



OBS:
devido a transicao de arquitetura, o middlewares ficaram com defeito e foram desabilitados.
Atualizações serão adicionadas futuramente para isso.