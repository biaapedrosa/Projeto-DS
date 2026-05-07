const sendEmail = async ({ to, subject, body }) => {
  console.log(`[emailService] Para: ${to} | Assunto: ${subject}`);
};

module.exports = { sendEmail };
