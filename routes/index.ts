import Router from 'express'
import axios from 'axios'

const router = Router()

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'
router.get('/', function (req, res) {
  res.send('Hello World')
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