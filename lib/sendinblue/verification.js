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
      htmlContent: `<h1>Hello <strong>${teamName}</strong>, Welcome to AFCAI, Your team ID is : <strong>${teamID}</strong></h1>`,
    });
  } catch (error) {
    console.error(error);
  }
};
