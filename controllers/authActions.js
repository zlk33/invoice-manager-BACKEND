const pool = require("../database/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secret } = require("../config");
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
          if (!user.verified) {
            res.status(401).send({
              error: "notverified",
              user_id: user.id,
              message: "Konto nie zostało zweryfikowane!",
            });
            return;
          }
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
    const { email, password, firstname, lastname } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
    try {
      const result = await pool.query(query, [email]);
      if (result[0].length > 0) {
        res.status(401).send({
          message: "Użytkownik o takim adresie email już istnieje!",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode =
          Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        const insertQuery = `INSERT INTO users (email, password, first_name, last_name, verification_code) VALUES (?, ?, ?, ?, ?)`;
        await pool.query(insertQuery, [
          email,
          hashedPassword,
          firstname,
          lastname,
          verificationCode,
        ]);
        res.status(201).send({ message: "Konto zostało utworzone!" });
        //Wysłanie maila z kodem weryfikacyjnym
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = new authActions();
