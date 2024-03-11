const { api_name, api_version, documentation_url } = require("../../config");
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>${api_name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Quicksand', sans-serif;
        background-color: #030712;
        color: #FAFAFA;
        text-align: center;
        margin: 0;
        padding: 0;
      }
      span {
        font-weight: bold;
      }
      div {
        padding: 3rem 6rem;
        border-radius: 10px;
        background-color: #111827;
        display: flex;
        flex-direction: column;
        width: fit-content;
        margin: 5rem auto 0 auto;
      }
      footer {
        padding: 1rem;
        font-size: 1.2rem;
      }
      footer a {
        color: #FAFAFA;
      }
      footer a:hover {
        color: #14532D;
      }
      span {
        font-weight: bold;
        padding: 0.25rem 1rem;
        border-radius: 5px;
        background-color: #14532D;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>${api_name}</h1>
      <p>Server Status: <span>Online</span></p>
      <p>MySQL Status: <span>Online</span></p>
      <p>Api version: ${api_version}</p>
    </div>
    <footer>
      <a href="https://github.com/zlk33" target="_blank">zlk33@github</a> &copy; 2024 | <a href="${documentation_url}" target="_blank">Documentation</a> 
    </footer>
  </body>
</html>
`;

module.exports = function (req, res) {
  res.send(html);
};
