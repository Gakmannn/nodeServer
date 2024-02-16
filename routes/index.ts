import Router from 'express'
import axios from 'axios'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const router = Router()

//! Здесь прописываю логику файла schema.prisma

//! Ссылка на сайт https://www.ozon.ru/category/smartfony-15502/

const telephoneDB = [
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
    brand_name: "Realme",
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
] as any


//! Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'

router.get('/', function (req, res) {
  res.send(JSON.stringify(telephoneDB))
})

router.get('/users', async function (req, res) {
  const data = await prisma.user.findMany()
  res.send({data})
})

// router.get('/user/:name/:email', async function (req, res) {
//   const user = await prisma.user.create({
//     data: {
//       name: req.params.name,
//       email: req.params.email
//     }
//   })
//   res.send({ user })
// })

router.get('/import', async (req,res)=>{
  telephoneDB.forEach((el:any)=>{
    delete el.id
  })
  await prisma.telephone.createMany({
    data: telephoneDB
  })
  res.send({ok:true})
})

router.get('/phones', async (req,res)=>{
  const phones = await prisma.telephone.findMany({})
  res.send({phones})
})

router.get('/mydata', function (req, res) {
  const data = fs.readFileSync('static/data.json', 'utf8')
  res.send({ ok: true, data:JSON.parse(data)})
})

router.post('/mydata', function (req, res) {
  try {
    const data = fs.readFileSync('static/data.json', 'utf8')
    const objData = JSON.parse(data.toString())
    Object.assign(objData, req.body)
    fs.writeFileSync('static/data.json', JSON.stringify(objData))
    res.send({ ok: true, data: objData })
  } catch(e) {
    res.status(500).send({ok:false, error:e})
  }
})

router.delete('/mydata/:key', function (req, res) {
  try {
    const data = fs.readFileSync('static/data.json', 'utf8')
    const objData = JSON.parse(data.toString())
    delete objData[req.params.key]
    fs.writeFileSync('static/data.json', JSON.stringify(objData))
    res.send({ ok: true, data: objData })
  } catch(e) {
    res.status(500).send({ok:false, error:e})
  }
})

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/hello'
router.get('/hello', function (req, res) {
  res.send('Hello user!!!')
})

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/translate'
router.get('/translate', async function (req, res) {
  const headers = { ...req.headers }
  delete headers.host
  // const resp = await axios.get('https://ya.ru/images/search?family=yes&from=tabbar&text=котята', {headers})
  const resp = await axios.get('https://translate.yandex.ru/?source_lang=en&target_lang=ru&text=hello new day', { headers })
  res.send({ data: resp.data, headers: req.headers })
})

// Описываем функцию, которая будет обрабатывать POST запросы на адрес '/data'
router.post('/data', (req, res) => {
  console.log(req.body)
  console.log(req.files)
  res.send({ ok: 'server' })
})

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/hello/:name/day/:day
// с параметрами :name и :day
// Они попадают в переменные req.params.name и req.params.day
router.get('/hello/:name/day/:day', function (req, res) {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    h1 {
      color:red;
    }
  </style>
</head>
<body>
  <h1>Привет ${req.params.name}! Поздравляю с ${req.params.day}</h1>
  <p id=ms>${req.timeStamp}</p>
  <script>
    console.log(Date.now() - +ms.innerText)
  </script>
</body>
</html>`
  )
})

router.get('/:any', function (req, res) {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    h1 {
      color:red;
    }
  </style>
</head>
<body>
  <h1>${req.params.any} такого адреса не существует</h1>
  <p>timestamp ${req.timeStamp}</p>
</body>
</html>`
  )
})

export default router