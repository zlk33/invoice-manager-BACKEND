const pool = require("../../database/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = "RCA7*D4gSE7!#@U/PUU6Etxd1&(ph3M?";
class authActions {
  async login(req, res) {
    const { email, password, remember } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
    try {
      const result = await pool.query(query, [email]);
      if (result[0].length > 0) {
        const user = result[0][0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const jwt_user = {
            email: user.email,
            id: user.id,
          };
          console.log("Successful login from: ", req.socket.remoteAddress);
          const token = jwt.sign(jwt_user, secret, {
            expiresIn: remember ? "7d" : "8h",
          });
          res.status(202).send({
            token: token,
          });
        } else {
          res.status(401).send({ message: "Hasło jest nieprawidłowe!" });
          console.log(
            "Failed login from: ",
            req.socket.remoteAddress + ", password is incorrect"
          );
        }
      } else {
        res
          .status(401)
          .send({ message: "Użytkownik o takim adresie email nie istnieje!" });
        console.log(
          "Failed login from: ",
          req.socket.remoteAddress + ", user with this email doesnt exists"
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }

  async register(req, res) {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
    try {
      const result = await pool.query(query, [email]);
      if (result[0].length > 0) {
        res.status(400).send({ message: "User with this email exists" });
      } else {
        const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
        await pool.query(query, [email, password]);
        res.status(201).send({ message: "User created" });
      }
    } catch (error) {
      res.status(500).send({ message: "Server Error" });
    }
  }
}

module.exports = new authActions();
