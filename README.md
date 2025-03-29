# Acompanhar - Alpha

Ferramenta para acompanhamento do transtorno do espectro autista e realização de previsões de melhoria com base em k-means
## Setup 

#### Ubuntu Based

- To set up this program, you must install [_Node.js_](https://nodejs.org/) and [_Docker_](https://www.docker.com/).

- Install frontend, wich will be available soon _here_ - stay aware : )

- Change _.env_ and _/compose/postgres/dockercompose.yml_ in production

Add execution permission to scripts folder
```
chmod u+x *.sh
```

Setup the program
```
./setup.sh
```

Run the program
```
./start.sh
```

## Adicionar Usuários

Run the program
```
./admin.sh
```

<!-- #### Responsibles
- cadastram clientes e detém os dados
```
curl -X POST http://localhost:4000/responsible \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "leon1",
    "full_name": "Leon Oliveira Martins",
    "password": "senhaSegura123",
    "description": "Responsible for managing clients",
    "email": "leon1@email.com"
  }'

```
#### Professionals
- avaliam clientes
```
curl -X POST http://localhost:4000/professional \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "leon1",
    "full_name": "Leon Oliveira Martins",
    "password": "senhaSegura123",
    "description": "Hello, im using acompanhar(chito version)",
    "email": "leon1@email.com",
    "specialty": "Pediatra"
  }'

``` -->
## Criar versão de Demonstração (Dont make it in production)
```
./demo.sh
```
## Remove (Dont make it in production)
Remove previous instalation - *only if you need it (it will remove all, make a backup)
```
./remove.sh
```


## OBS:
devido a transicao de arquitetura, o middlewares ficaram com defeito e foram desabilitados.
Atualizações serão adicionadas futuramente para isso.



