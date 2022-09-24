const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY_ID;

const sender = {
  email: process.env.EMAIL_ADDRESS,
  name: process.env.EMAIL_NAME,
};

exports.sendVerificationTeam = async (teamID, teamName, teamEmail) => {
  const tranEmailApi = new Sib.TransactionalEmailsApi();

  try {
    await tranEmailApi.sendTransacEmail({
      sender,
      to: [
        {
          email: teamEmail,
        },
      ],
      subject: `Team Verification for ${teamName}`,
      htmlContent: `
      <h3>Welcome to AFCAI, ${teamName}</h3>
      <p>Your Affiliation has been confirmed. We are excited to have you on board!</p>
      <p>Your Team ID will be <strong>${teamID}</strong>, please make a note of it.</p>
      <p>For more information about us, please visit our website at <a href="https://afcai.in">afcai.in</a>. </p>
      <p>For any questions, please contact us at <a href="mailto:contact@afcai.in">contact@afcai.in</a>. </p>
      <p>Best regards,</p>
      <p>AFCAI Verification Team</p>
      `,
    });
  } catch (error) {
    console.error(error);
  }
};
