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
      htmlContent: `
        <h3>Welcome to AFCAI, ${teamName}</h3>
        <p>Thank you for showing your interest for the AFCAI Affiliation.</p>
        <p>Our verification team will contact you very soon and verify all the information.</p>
        <p>For more information about us, please visit our website at <a href="https://afcai.org">afcai.in</a>. </p>
        <p>For any questions, please contact us at <a href="mailto:contact@afcai.in">contact@afcai.in</a> or <a href="https://wa.me/+917717304779">Whatsapp</a>
        </p>
        <p>Best regards,</p>
        <p>AFCAI Team</p>
        <span>Phone: <a href="tel:+917717304779">7717304779</a>
        </span>
      `,
    });
  } catch (error) {
    console.error(error);
  }
};
