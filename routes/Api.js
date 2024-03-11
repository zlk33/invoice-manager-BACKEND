const express = require("express");
const router = express.Router();
const defualt_page = require("../controllers/api/default");
const invoicesActions = require("../controllers/api/invoicesActions");
const authActions = require("../controllers/api/authActions");
//Strona domyślna
router.get("/", defualt_page);

//Pobieranie wszystkich faktur
router.get("/api/invoices/", invoicesActions.getAll);

//Pobieranie jednej faktury
router.get("/api/invoices/:id", invoicesActions.getOne);

//Szukanie faktury po nazwie firmy
router.get("/api/invoices/search/:name", invoicesActions.search);

router.post("/api/auth/login", authActions.login);

router.post("/api/auth/register", authActions.register);

//Edycja użytkownika
// router.put("/api/user-edit/:id", userActions.editUser);

// //Dodawanie użytkownika
// router.post("/api/user-add/", userActions.addUser);

// //Usuwanie użytkownika
// router.delete("/api/user-delete/:id", userActions.deleteUser);
module.exports = router;
