const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const knexfile = require("./knexfile").development;
const knex = require("knex")(knexfile);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("./auth");
const app = express();
const port = 8000;

//setup modules
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(fileUpload());
app.use(express.json());
auth(knex).initialize();

//verify and decode jwt
function decode(req) {
  let token = req.headers.authorization;
  token = token.replace("Bearer ", "");
  return jwt.verify(token, process.env.JWT_SECRET);
}
//route
app.get("/image/:name", (req, res) => {
  res.sendFile(__dirname + "/image/menu/" + req.params.name);
});
app.get("/menu", async (req, res) => {
  let images = fs.readdirSync(__dirname + "/image/menu");
  const menuData = await knex("menu");
  let data = menuData.map((phone, index) => ({
    ...phone,
    image: images[index],
  }));
  res.json(data);
});
//login route
app.post("/auth/login", async (req, res) => {
  // console.log(req.body.email)
  // console.log(req.body.password)
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;

    const query = await knex("users")
      .where({
        email,
        password,
      })
      .first();

    if (query) {
      const payload = {
        id: query.id,
        username: query.username,
        email: query.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});

app.get("/user", async (req, res) => {
  let user = decode(req);
  let menuu = await knex("menu").where("id", user.id);
  console.log(menuu);
});



// app.post("/menu", async (req, res) => {
//     const id = await knex("menu").insert(req.body).returning("id");
//     res.json(id[0]);
//   });

//   app.post("/upload/:id", (req, res) => {
//     const extension = req.files.file.name.split(".")[1];
//     fs.writeFileSync(
//       __dirname + "/image/menu/" + req.params.id + "." + extension,
//       req.files.file.data
//     );
//     res.send("upload successful");
//   });
// app.get("/menu", async (req, res) =>{
//     res.send(products);
// });

app.post("/menu", (req, res) => {
  console.log(req.body);
});

app.get("/cart", async (req, res) => {
  let user = decode(req);
  const cart = await knex("cart")
    .select("menu.id", "name","image", "price", "quantity")
    .join("menu", "cart.menu_id", "menu.id")
    .where("cart.user_id", user.id);
  res.json(cart);
});



app.post("/cart", async (req, res) => {
  const user = decode(req);
  const product_id = req.body.id;

  let data = await knex("cart")
    .where({
      user_id: user.id,
      menu_id: product_id,
    })
    .first();
  if (!data) {
    await knex("cart").insert({
      user_id: user.id,
      menu_id: product_id,
      quantity: 1,
    });
    res.send("insert");
  } else {
    await knex("cart").increment("quantity").where({
      user_id: user.id,
      menu_id: product_id,
    });
    res.send("increment");
  }
});

app.delete("/cart/:id", async (req, res) => {
  const id = req.params.id;
  const user = decode(req);

  await knex("cart").del().where({
    user_id: user.id,
    menu_id: id,
  });
  res.send("deleted one item");
});

app.delete("/cart", async (req, res) => {
  const user = decode(req);
  console.log(user);
  await knex("cart").del().where({
    user_id: user.id,
  });
  res.send("cleared cart");
});

app.listen(port, () => console.log(`Listening to port ${port}`));
