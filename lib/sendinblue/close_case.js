const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY_ID;

const sender = {
  email: process.env.EMAIL_ADDRESS,
  name: process.env.EMAIL_NAME,
};

exports.closeCaseAlert = async (teamEmail, QueryID) => {
  const tranEmailApi = new Sib.TransactionalEmailsApi();

  try {
    await tranEmailApi.sendTransacEmail({
      sender,
      to: [
        {
          email: teamEmail,
        },
      ],
      subject: `Your Query ${QueryID} is now closed.`,
      htmlContent: `<h3>Hello Team, your Query <strong>${QueryID}</strong> has been resolved and marked close.</h3>`,
    });
  } catch (error) {
    console.error(error);
  }
};
