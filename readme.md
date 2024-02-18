
<h3>Работа с vue </h3>

#### 1. Устанавливаем пакет
```
npm init vite@latest <project-name> --template vue

``` 

#### 2. Выбираем VUE -> TypeScript 
#### Пишем cd (название проекта) , npm install , npm run dev

---
 
 
Котэ =^-^= (https://img.razrisyika.ru/kart/24/1200/94318-kot-saymon-4.jpg)

---


 <h3>Работа с призмой </h3>

#### 1. Инициализация призмы 
```
npm i
``` 

#### 2. Генерирует клиента Prisma на основе схемы 
```
npx prisma generate
```
 

#### 3. Синхронизирует состояние схемы Prisma с БД #### 
```
npx prisma db push
``` 
 

#### 4. Просмотр и управление данными через браузер
```
npx prisma studio
```
 

#### P.S. если нету файла .env, то обязательно его создать
```
DATABASE_URL="postgresql://postgres:(Пароль)@localhost:5432/(название таблицы)?schema=public"
```
 
#### P.P.S. чтобы не было ошибок в любом случае открываем pgAdmin и в нём если нету создаём одноимённую таблицу такую же как и в DATABASE_URL 

