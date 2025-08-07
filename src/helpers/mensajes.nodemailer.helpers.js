const { transporter } = require("../middlewares/nodemailer.middlewares");

const registroExitoso = async (emailUsuario, nombreUsuario) => {
  try {
    await transporter.sendMail({
      from: `"VetCare" <${process.env.GMAIL_APP_USER}>`,
      to: `${emailUsuario}`,
      subject: "Te Registraste Exitosamente ✔",
      text: `Gracias por registrarte, ${nombreUsuario}. Bienvenido a VetCare.`,
      html: `
        <h2>¡Bienvenido/a a VetCare, ${nombreUsuario}!</h2>
        <p>Ahora podés acceder a nuestros servicios para el cuidado de tu mascota 🐶🐱.</p>
        <p>¡Nos alegra tenerte con nosotros!</p>
        <br/>
        <p><i>El equipo de VetCare</i></p>
      `,
    });

    return {
      msg: "Correo de confirmación enviado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const envioDeLaCompra = async (emailUsuario, nombreProducto) => {
  try {
    await transporter.sendMail({
      from: ` "VetCare" <${process.env.GMAIL_APP_USER}>`,
      to: `${emailUsuario}`,
      subject: `"¡Pago recibido con éxito!"`,
      text: `Gracias por tu compra. Hemos recibido tu pago por: ${nombreProducto}`, // plain‑text body
      html: `<h3>Gracias por tu compra 🐶</h3>
           <p>Tu pago por <b>${nombreProducto}</b> fue procesado con éxito.</p>
           <p>Pronto recibirás más información sobre el envío.</p>`, // HTML body
    });

    return {
      msg: "Correo de confirmación de compra enviado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    console.log("Error al enviar el correo de compra:", error);
    return {
      error: error.message || "Error inesperado al enviar correo",
      statusCode: 500,
    };
  }
};

const recuperarContrasenia = async (token, emailUsuario) => {
  try {
    await transporter.sendMail({
      from: ` "VetCare" <${process.env.GMAIL_APP_USER}>`,
      to: `${emailUsuario}`,
      subject: `"Recuperación de contraseña"`,
      text: `Has solicitado recuperar tu contraseña. Sigue los pasos que te  indicamos abajo`, // plain‑text body
      html: `<p>Has solicitado recuperar tu contraseña.</p>
           <a href="http://localhost:5173/recuperarContraseniaForm?token=${token}">Haz clic aquí para restablecerla</a>`, // HTML body
    });

    return {
      msg: "Correo de recuperación enviado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    console.log("Error al enviar correo de recuperación:", error);
    return {
      error: error.message || "Error inesperado al enviar correo",
      statusCode: 500,
    };
  }
};

module.exports = {
  registroExitoso,
  envioDeLaCompra,
  recuperarContrasenia,
};
