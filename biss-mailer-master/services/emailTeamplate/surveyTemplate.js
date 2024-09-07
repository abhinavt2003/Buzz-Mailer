const keys = require("../../config/keys");

module.exports = (survey) => {
  return `
  <html>
  <body>
  <div style="text-align:center;">
  <h3>i would like your input</h3>
  <p>please answer the floowing question</p>
  <p>${survey.body}</p>
  <div>
  <a href="${keys.redirectDomain}/api/survey/${survey.id}/yes">yes</a>
  </div>
  <div>
  <a href="${keys.redirectDomain}/api/survey/${survey.id}/no">no</a>
  </div>
  </body>
  </html>
  `;
};
