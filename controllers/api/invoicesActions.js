const pool = require("../../database/connection");

class invoicesActions {
  async getAll(req, res) {
    setTimeout(async () => {
      const [rows] = await pool.query(
        "SELECT invoices.id, company_name, amount, status, payment_date, added_at, name_short,DATEDIFF(payment_date, CURDATE()) AS days_left FROM invoices JOIN currencies ON invoices.currency = currencies.id;"
      );
      res.status(200).send(rows);
      console.log("Pobrano dane z serwera");
    }, 3000);
  }
  async getOne(req, res) {
    const id = req.params.id;
    const [row] = await pool.query(
      "SELECT invoices.id,company_name,amount,status,payment_date,added_at,name_short FROM `invoices` JOIN currencies ON invoices.currency=currencies.id; WHERE id=?",
      [id]
    );
    res.status(200).send(row);
  }
  async search(req, res) {
    setTimeout(async () => {
      const name = req.params.name;
      const like_query = "%" + name + "%";
      const [row] = await pool.query(
        `SELECT * FROM invoices WHERE company_name LIKE ?`,
        [like_query]
      );
      res.status(200).send(row);
    }, 3000);
  }
}

module.exports = new invoicesActions();
