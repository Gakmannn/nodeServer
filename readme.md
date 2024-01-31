1
```
npm i
```

2 Проверить файл .env. Если надо, поменять пароль (Пароль не должен содержать знак %) и порт. 
3 Если надо, создать базу в PgAdmin
4
```
npx prisma generate
```
5
```
npx prisma db push
```
6
```
npm run dev
```