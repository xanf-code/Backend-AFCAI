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
      htmlContent: `
          <h3>Hello,</h3>
          <p>Your Query with Query ID <strong>${QueryID}</strong> is now marked resolved and closed. </p>
          <p>For more information about us, please visit our website at <a href="https://afcai.in">afcai.in</a>. </p>
          <p>For any questions, please contact us at <a href="mailto:contact@afcai.in">afcai.in</a>
          </p>
          <p>Best regards,</p>
          <p>AFCAI Team</p>
      `,
    });
  } catch (error) {
    console.error(error);
  }
};
