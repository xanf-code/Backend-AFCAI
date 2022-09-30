const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY_ID;

const sender = {
  email: process.env.EMAIL_ADDRESS,
  name: process.env.EMAIL_NAME,
};

exports.SendCaseNumber = async (teamName, teamEmail, QueryID) => {
  const tranEmailApi = new Sib.TransactionalEmailsApi();

  try {
    await tranEmailApi.sendTransacEmail({
      sender,
      to: [
        {
          email: teamEmail,
        },
      ],
      subject: `Your Query has been registered, ${teamName}`,
      htmlContent: `
          <h3>Hello ${teamName},</h3>
          <p>Your Query has been registered with Query ID <strong>${QueryID}</strong>. </p>
          <p>Our team will get back to you soon.</p>
          <p>For more information about us, please visit our website at <a href="https://afcai.in">afcai.in</a>. </p>
           <p>For any questions, please contact us at <a href="mailto:contact@afcai.in">contact@afcai.in</a> or <a href="https://wa.me/+917717304779">Whatsapp</a>
          </p>
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
