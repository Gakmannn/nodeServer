import Router from "express";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import sharp from "sharp";
import compression from "compression";
import axios from "axios";
import { PrismaClient, Role } from "@prisma/client";
import dotenv from "dotenv";
const prisma = new PrismaClient();
const router$1 = Router();
router$1.get("/", function(req, res) {
  res.send("Hello World");
});
router$1.get("/users", async function(req, res) {
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
      id: "asc"
    }
  });
  console.log(data);
  res.send({ data });
});
router$1.get("/first_user", async function(req, res) {
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
      id: "desc"
    },
    skip: 1,
    where: {}
  });
  res.send({ data });
});
router$1.post("/create_user", async function(req, res) {
  const user = req.body;
  console.log(user);
  user.updated_at = /* @__PURE__ */ new Date();
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
      age: true
    }
  });
  res.send({ data });
});
router$1.get("/upsert_user/:email/:hash/:first_name", async function(req, res) {
  const user = {
    id: 5,
    email: req.params.email,
    hash: req.params.hash,
    role: Role.USER,
    updated_at: /* @__PURE__ */ new Date()
  };
  delete user.id;
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
      age: true
    }
  });
  res.send({ data });
});
router$1.get("/create_user/:id/:first_name/:last_name/:age", async function(req, res) {
  const data = await prisma.user.update({
    data: {
      first_name: req.params.first_name,
      last_name: req.params.last_name,
      age: +req.params.age
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      role: true,
      age: true
    },
    where: {
      id: +req.params.id
    }
  });
  res.send({ data });
});
router$1.post("/login", async function(req, res) {
  const user = req.body;
  const data = await prisma.user.findUnique({
    // include:{posts:true},
    select: {
      id: true,
      uuid: true,
      email: true,
      first_name: true,
      last_name: true,
      role: true,
      age: true
    },
    where: {
      email: user.email,
      hash: user.hash
    }
  });
  res.send({ data });
});
router$1.post("/check_user", async function(req, res) {
  const user = req.body;
  const data = await prisma.user.findUnique({
    // include:{posts:true},
    select: {
      id: true,
      uuid: true,
      email: true,
      first_name: true,
      last_name: true,
      role: true,
      age: true
    },
    where: {
      id: user.id,
      uuid: user.uuid
    }
  });
  res.send({ data });
});
router$1.get("/unic_user_id/:id", async function(req, res) {
  const id = +req.params.id;
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
  });
  res.send({ data });
});
router$1.get("/delete_user/:id", async function(req, res) {
  const id = +req.params.id;
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
  });
  res.send({ data });
});
router$1.get("/users/setIsActive", async function(req, res) {
  const data = await prisma.user.updateMany({
    data: {
      is_active: true
    }
  });
  res.send({ data });
});
router$1.get("/unic_user_mail/:mail", async function(req, res) {
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
  });
  res.send({ data });
});
router$1.get("/posts", async function(req, res) {
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
          email: true,
          profile: true
        }
      }
    },
    where: {
      // published: true,
    }
  });
  res.send({ data });
});
router$1.post("/posts", async function(req, res) {
  const post = req.body;
  post.published = true;
  post.updated_at = /* @__PURE__ */ new Date();
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
          email: true,
          profile: true
        }
      }
    }
  });
  res.send({ data });
});
router$1.get("/sql", async function(req, res) {
  const data = await prisma.$queryRawUnsafe(`
  SELECT email, id 
  FROM study.public.users
  WHERE id=2
  `);
  res.send({ data });
});
router$1.get("/posts/starts/:text", async function(req, res) {
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
          last_name: true
        }
      }
    },
    where: {
      content: {
        startsWith: req.params.text
      }
    }
  });
  res.send({ data });
});
router$1.get("/mydata", function(req, res) {
  const data = fs.readFileSync("static/data.json", "utf8");
  res.send({ ok: true, data: JSON.parse(data) });
});
router$1.post("/mydata", function(req, res) {
  try {
    const data = fs.readFileSync("static/data.json", "utf8");
    const objData = JSON.parse(data.toString());
    Object.assign(objData, req.body);
    fs.writeFileSync("static/data.json", JSON.stringify(objData));
    res.send({ ok: true, data: objData });
  } catch (e) {
    res.status(500).send({ ok: false, error: e });
  }
});
router$1.delete("/mydata/:key", function(req, res) {
  try {
    const data = fs.readFileSync("static/data.json", "utf8");
    const objData = JSON.parse(data.toString());
    delete objData[req.params.key];
    fs.writeFileSync("static/data.json", JSON.stringify(objData));
    res.send({ ok: true, data: objData });
  } catch (e) {
    res.status(500).send({ ok: false, error: e });
  }
});
router$1.get("/hello", function(req, res) {
  res.send("Hello user!!!");
});
router$1.get("/translate", async function(req, res) {
  const headers = { ...req.headers };
  delete headers.host;
  const resp = await axios.get("https://translate.yandex.ru/?source_lang=en&target_lang=ru&text=hello new day", { headers });
  res.send({ data: resp.data, headers: req.headers });
});
router$1.post("/data", (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.send({ ok: "server" });
});
router$1.get("/hello/:name/day/:day", function(req, res) {
  res.send(
    `<!DOCTYPE html>
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
  <\/script>
</body>
</html>`
  );
});
router$1.get("/:any", function(req, res) {
  res.send(
    `<!DOCTYPE html>
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
  );
});
const router = Router();
router.get("/", function(req, res) {
  res.send("Hello from api");
});
dotenv.config();
const app = Router();
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/img/tmp");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});
const upload = multer({ storage: storageConfig });
app.use(upload.any());
app.use(bodyParser.urlencoded({ extended: false }));
const addTimestamp = () => {
  return (req, res, next) => {
    req.timeStamp = Date.now();
    next();
  };
};
app.use(addTimestamp());
const resizeImages = async (req, res, next) => {
  if (!req.files)
    return next();
  try {
    req.body.images = [];
    await Promise.all(
      // @ts-ignore
      req.files.map(async (file) => {
        const filename = Date.now() + "-" + file.originalname.match(/\d?[a-zA-Z.-]?/g).join("").replace(/\..+$/, "");
        const newFilename = `${filename}.webp`;
        await sharp(file.path).resize({ width: 1050 }).webp().toFile(`static/img/desktop/${newFilename}`);
        await sharp(file.path).resize({ width: 720 }).webp().toFile(`static/img/tablet/${newFilename}`);
        await sharp(file.path).resize({ width: 380 }).webp().toFile(`static/img/mobile/${newFilename}`);
        await sharp(file.path).resize({ width: 200 }).webp({ quality: 10 }).toFile(`static/img/lazy/${newFilename}`);
        fs.unlinkSync(file.path);
        req.body.images.push({ newName: newFilename, originalName: file.originalname });
      })
    );
  } catch (e) {
    console.log(e);
  }
  next();
};
app.use(resizeImages);
app.use(bodyParser.json());
app.use(compression({ strategy: 3 }));
app.use(Router.static("static"));
app.use("/api", router);
app.use(router$1);
app.listen(3001);
const viteNodeApp = app;
export {
  viteNodeApp
};
