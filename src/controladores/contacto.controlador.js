const nodemailer = require('nodemailer');
require('dotenv').config();

const enviarMensaje = async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    // Validar que el body tenga datos
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Configuración del transporter para Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_APP_USER, // correo que recibe los mensajes
        pass: process.env.GMAIL_APP_PASS, // contraseña de aplicación
      },
      tls: {
        rejectUnauthorized: false, // 👈 evita el error de certificado en desarrollo
      },
    });

    // Configuración del mail
    const mailOptions = {
      from: process.env.GMAIL_APP_USER,
      replyTo: email,
      to: process.env.GMAIL_APP_USER, // llega al correo real
      subject: `Mensaje de contacto de ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
    };

    // Enviar el mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar mensaje:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      message: 'Error al enviar el mensaje',
      error: error.message
    });
  }
};

module.exports = { enviarMensaje };