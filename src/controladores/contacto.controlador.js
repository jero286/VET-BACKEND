const nodemailer = require("nodemailer");
require("dotenv").config();
const enviarMensaje = async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_APP_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_APP_USER,
      replyTo: email,
      to: process.env.GMAIL_APP_USER,
      subject: `Mensaje de contacto de ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mensaje enviado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al enviar el mensaje",
      error: error.message,
    });
  }
};
module.exports = { enviarMensaje };
