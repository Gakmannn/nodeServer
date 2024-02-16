import Router from 'express'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router()

//! Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'

//! Здесь прописываю логику файла schema.prisma

//! Ссылка на сайт https://www.ozon.ru/category/smartfony-15502/

const sneakData = [
  {
    id: 1,
    brand_name: "Realme ",
    model:  "C51",
    price: 7637,
    photo_link: "https://ir.ozone.ru/s3/multimedia-0/wc1000/6832255380.jpg",
    in_stock: true,
  },
  {
    id: 2,
    brand_name: "Rova",
    model:  "Neo_3",
    price: 8899,
    photo_link: "https://ir.ozone.ru/s3/multimedia-1-0/wc1000/6917369964.jpg",
    color: "black",
    in_stock: true,
  },
  {
    id: 3,
    brand_name: "Rova",
    model:  "Neo_3",
    price: 8899,
    photo_link: "https://ir.ozone.ru/s3/multimedia-1-8/wc1000/6917370044.jpg",
    color: "gold",
    in_stock: true,
  },
  {
    id: 4,
    brand_name: "Rova",
    model:  "Neo_3",
    price: 8899,
    photo_link: "https://ir.ozone.ru/s3/multimedia-1-s/wc1000/6917370028.jpg",
    color: "blue",
    in_stock: true,
  },
  {
    id: 5,
    brand_name: "Infinixi",
    model:  "Hot_40_Pro",
    price: 8899,
    photo_link: "https://ir.ozone.ru/s3/multimedia-1-0/wc1000/6917369964.jpg",
    in_stock: true,
  },

  
  

]










router.get('/', function (req, res) {
  res.send('Hello from api')
})

export default router

 



