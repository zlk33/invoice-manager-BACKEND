const express = require("express");
const router = express.Router();
const defualt_page = require("../controllers/default");
const authActions = require("../controllers/authActions");

//Strona domyślna
router.get("/", defualt_page);

// ------------ Autoryzacja ------------

//Logowanie
router.post("/api/auth/login", authActions.login);
//Rejestracja
router.post("/api/auth/register", authActions.register);
//Weryfikacja tokenu
// router.post("/api/auth/verify", authActions.verify);

module.exports = router;
