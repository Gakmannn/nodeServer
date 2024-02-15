import Router from 'express'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router()

//! Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'


//!!!!!!!!!! Здесь прописываю логику файла schema.prisma




router.get('/', function (req, res) {
  res.send('Hello from api')
})

export default router