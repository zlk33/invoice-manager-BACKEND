module.exports = {
  db_ip: process.env.DB_IP || "127.0.0.1",
  db_user: process.env.DB_USER || "root",
  db_pass: process.env.DB_PASS || "",
  db_name: process.env.DB_NAME || "fakturnik",
  port: process.env.PORT || 3000,
  secret: "",
  api_name: "Fakturnik API",
  api_version: "1.0.0",
  documentation_url: "#",
};
