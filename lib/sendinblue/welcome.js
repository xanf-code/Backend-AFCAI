const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY_ID;

const sender = {
  email: process.env.EMAIL_ADDRESS,
  name: process.env.EMAIL_NAME,
};

exports.sendWelcomeEmail = async (teamName, teamEmail) => {
  const tranEmailApi = new Sib.TransactionalEmailsApi();

  try {
    await tranEmailApi.sendTransacEmail({
      sender,
      to: [
        {
          email: teamEmail,
        },
      ],
      subject: `Welcome to AFCAI, ${teamName}`,
      htmlContent: `<h1>Welcome to AFCAI ${teamName}, our team will get in touch with you very soon to complete the verification process.</h1>`,
    });
  } catch (error) {
    console.error(error);
  }
};
