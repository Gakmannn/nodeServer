// Все импорты библиотек, которыми будем пользоваться
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import fs from 'fs'
import sharp from 'sharp'
import compression from 'compression'
import routes from '#root/routes/index'
import apiRoutes from '#root/routes/api'
import dotenv from 'dotenv'
dotenv.config()
// import helmet from "helmet"

// Создаём сервер
const app = express()
// Указываем, куда сохранять файлы
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/img/tmp');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})
// Создаём конфигурацию multer
const upload = multer({ storage: storageConfig })

// Используем cors (Кросс-доменные запросы)
app.use(cors())
// Используем helmed (Защита)
// app.use(helmet())

// Используем функцию загрузки файлов
app.use(upload.any())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

declare global {
  namespace Express {
    interface Request {
      timeStamp: number,
      files?: {
        [fieldname: string]: Multer.File[];
      } | Multer.File[] | undefined
    }
  }
}

// middleware (фунция промежуточной обработки, которая срабатывает при любом запросе)
const addTimestamp = () => {
  return (req:Request, res:Response, next:NextFunction) => {
    req.timeStamp = Date.now()
    next()
  }
}

// добавили свой middleware
app.use(addTimestamp())

// Настраиваем перекодировку изображений sharp
const resizeImages = async (req:Request, res:Response, next:NextFunction) => {
  if (!req.files) return next()
  try {
    req.body.images = []
    await Promise.all(
        // @ts-ignore
        req.files.map(async (file:any) => {
        const filename = Date.now() + "-" + file.originalname.match(/\d?[a-zA-Z.-]?/g).join('').replace(/\..+$/, "")
        const newFilename = `${filename}.webp`

        await sharp(file.path)
          .resize({ width: 1050 })
          .webp()
          .toFile(`static/img/desktop/${newFilename}`)

        await sharp(file.path)
          .resize({ width: 720 })
          .webp()
          .toFile(`static/img/tablet/${newFilename}`)

        await sharp(file.path)
          .resize({ width: 380 })
          .webp()
          .toFile(`static/img/mobile/${newFilename}`)

        await sharp(file.path)
          .resize({ width: 200 })
          .webp({ quality: 10 })
          .toFile(`static/img/lazy/${newFilename}`)
        fs.unlinkSync(file.path)
        req.body.images.push({ newName: newFilename, originalName: file.originalname })
      })
    )
  } catch (e) {
    console.log(e)
  }
  next()
}

// используем перекодировку изображений
app.use(resizeImages)

// parse application/json
app.use(bodyParser.json())

// Используем серверное сжатие
app.use(compression({ strategy: 3 }))

// Используем папку со статическим контентом
// app.use(express.static('static'))

app.use('/api', apiRoutes)
app.use(routes)

// Запуск на проде
if (import.meta.env.PROD)
  app.listen(3001)

// Запуск в DEV режиме
export const viteNodeApp = app