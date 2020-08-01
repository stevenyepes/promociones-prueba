## Requisitos
 - Docker
 - Docker compose
 - NodeJS (para ejecutar fuera de docker)
 - [Base de datos de prueba] (https://github.com/walmartdigital/products-db)


## Instalacción

```bash
$ npm install
```

## Ejecutando la aplicación
- Se debe contar con la base de datos ejecutando en local (Ver requisitos).

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker
- Cambiar la ip utilizada en la uri de la base de datos por la ip local: mongodb://productListUser:productListPassword@[tu-ip]/promotions?authSource=admin 

```bash
# Construir la imágen
$ docker-compose build

# Levantar entorno
$ docker-compose up

## Documentación

- La documentación de la api la puedes encontrar en: http://localhost:3000/api/
- para consultar un producto: http://localhost:3000/products/[criterio] donde "criterio" debe ser una cadena de búsqueda ó un id específico
- El proyecto se encuentra desplegado en Heroku en el enlace (https://promotions-walmart-api.herokuapp.com/api/)