import Router from 'express'
import axios from 'axios'
import fs from 'fs'
import { PrismaClient, User, Role } from '@prisma/client'
const prisma = new PrismaClient()
const router = Router()

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'
router.get('/', function (req, res) {
  res.send('Hello World')
})

// router.get('/users', async function (req, res) {
//   const data = await prisma.user.findMany()
//   res.send({data})
// })

// router.get('/user/:name/:email', async function (req, res) {
//   const user = await prisma.user.create({
//     data: {
//       name: req.params.name,
//       email: req.params.email
//     }
//   })
//   res.send({ user })
// })

router.get('/users', async function (req, res) {
  const data = await prisma.user.findMany({
    // include:{posts:true},
    // select: {
    //   id: true,
    //   profile: true,
    //   posts: {
    //     select: {
    //       id: true,
    //       title: true,
    //       content: true,
    //       created_at: true,
    //       categories: true
    //     }
    //   }
    // },
    // where: {
      
    // }
    orderBy: {
      id: 'asc'
    }
  })
  res.send({data})
})

router.get('/first_user', async function (req, res) {
  const data = await prisma.user.findFirst({
    // include:{posts:true},
    select: {
      id: true,
      profile: true,
      posts: {
        select: {
          id: true,
          title: true,
          content: true,
          created_at: true,
          categories: true
        }
      }
    },
    orderBy: {
      id: 'desc'
    },
    skip: 1,
    where: {
      
    }
  })
  res.send({data})
})

router.post('/create_user', async function (req, res) {
  const user = req.body
  console.log(user)
  user.updated_at = new Date()
  // const user = {
  //   id:5,
  //   email: req.params.email,
  //   hash: req.params.hash,
  //   role: Role.USER,
  //   updated_at: new Date(),
  // } as any
  // delete user.id
  const data = await prisma.user.create({
    data: {
      ...user
    }, 
    select: {
      id: true,
      uuid: true,
      email: true,
      first_name: true,
      last_name: true,
      role: true,
      age: true,
    }
  })
  // const profile = await prisma.profile.create({
  //   data: {
  //     userId: data.id,
  //     nickName: req.params.nick
  //   }
  // })
  // Object.assign(data, {profile})
  res.send({data})
})

router.get('/upsert_user/:email/:hash/:first_name', async function (req, res) {
  const user = {
    id:5,
    email: req.params.email,
    hash: req.params.hash,
    role: Role.USER,
    updated_at: new Date(),
  } as any
  delete user.id
  const data = await prisma.user.upsert({
    create: {
      ...user,
      first_name: req.params.first_name
    }, 
    update: {
      first_name: req.params.first_name
    },
    where: {
      email: user.email
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      role: true,
      age: true,
    }
  })
  res.send({data})
})

router.get('/create_user/:id/:first_name/:last_name/:age', async function (req, res) {
  const data = await prisma.user.update({
    data: {
      first_name: req.params.first_name,
      last_name: req.params.last_name,
      age: +req.params.age,
    }, 
    select: {
      id: true,
      first_name: true,
      last_name: true,
      role: true,
      age: true,
    },
    where: {
      id: +req.params.id
    }
  })
  res.send({data})
})

router.post('/login', async function (req, res) {
  const user = req.body
  const data = await prisma.user.findUnique({
    // include:{posts:true},
    select: {
      id: true,
      uuid: true,
      email: true,
      first_name: true,
      last_name: true,
      role: true,
      age: true,
    },
    where: {
      email: user.email,
      hash: user.hash
    }
  })
  res.send({data})
})

router.post('/check_user', async function (req, res) {
  const user = req.body
  const data = await prisma.user.findUnique({
    // include:{posts:true},
    select: {
      id: true,
      uuid: true,
      email: true,
      first_name: true,
      last_name: true,
      role: true,
      age: true,
    },
    where: {
      id: user.id,
      uuid: user.uuid
    }
  })
  res.send({ data })
})


router.get('/unic_user_id/:id', async function (req, res) {
  const id = +req.params.id
  const data = await prisma.user.findUnique({
    // include:{posts:true},
    select: {
      id: true,
      profile: true,
      email: true,
      posts: {
        select: {
          id: true,
          title: true,
          content: true,
          created_at: true,
          categories: true
        }
      }
    },
    where: {
      id  
    }
  })
  res.send({data})
})

router.get('/delete_user/:id', async function (req, res) {
  const id = +req.params.id
  const data = await prisma.user.delete({
    // include:{posts:true},
    select: {
      id: true,
      profile: true,
      email: true,
      posts: {
        select: {
          id: true,
          title: true,
          content: true,
          created_at: true,
          categories: true
        }
      }
    },
    where: {
      id  
    }
  })
  res.send({data})
})

router.get('/users/setIsActive', async function (req, res) {
  const data = await prisma.user.updateMany({
    data: {
      is_active: true
    }
  })
  res.send({data})
})

router.get('/unic_user_mail/:mail', async function (req, res) {
  const data = await prisma.user.findUnique({
    // include:{posts:true},
    select: {
      id: true,
      profile: true,
      posts: {
        select: {
          id: true,
          title: true,
          content: true,
          created_at: true,
          categories: true
        }
      }
    },
    where: {
      email: req.params.mail
    }
  })
  res.send({data})
})

router.get('/posts', async function (req, res) {
  const data = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      created_at: true,
      categories: true,
      author: {
        select: {
          id: true,
          email:true,
          profile: true
        }
      }
    },
    where: {
      // published: true,
    }
  })
  res.send({ data })
})

router.post('/posts', async function (req, res) {
  const post = req.body
  post.published = true
  post.updated_at = new Date()
  const data = await prisma.post.create({
    data: post,
    select: {
      id: true,
      title: true,
      content: true,
      created_at: true,
      categories: true,
      author: {
        select: {
          id: true,
          email:true,
          profile: true
        }
      }
    }
  })
  res.send({ data })
})

router.get('/sql', async function (req, res) {
  const data = await prisma.$queryRawUnsafe(`
  SELECT email, id 
  FROM study.public.users
  WHERE id=2
  `)
  res.send({ data })
})

router.get('/posts/starts/:text', async function (req, res) {
  const data = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      created_at: true,
      author: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        }
      }
    },
    where: {
      content: {
        startsWith:req.params.text
      }
    }
  })
  res.send({ data })
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