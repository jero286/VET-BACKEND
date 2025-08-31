
const Consulta = require("../modelos/consulta"); 
const nodemailer = require("nodemailer");


const crearConsultaController = async (req, res) => {
  const { nombre, email, mensaje, plan } = req.body;

  if (!nombre || !email || !mensaje || !plan) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    
    const nuevaConsulta = new Consulta({ nombre, email, mensaje, plan });
    await nuevaConsulta.save();

   
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_APP_USER, 
        pass: process.env.GMAIL_APP_PASS, 
      },
    });

    
    await transporter.sendMail({
      from: `"Veterinaria" <${process.env.EMAIL_USER}>`,
      to: "galindotamara88@gmail.com", 
      subject: `Nueva consulta del plan ${plan}`,
      text: `
        Nombre: ${nombre}
        Email: ${email}
        Plan: ${plan}
        Mensaje: ${mensaje}
      `,
    });

    res.status(201).json({ mensaje: "Consulta enviada y notificada por email" });
  } catch (error) {
    console.error("Error al guardar o enviar correo:", error);
    res.status(500).json({ error: "Error al guardar la consulta o enviar correo" });
  }
};


const obtenerConsultasController = async (req, res) => {
  try {
    const consultas = await Consulta.find();
    console.log("Consultas obtenidas correctamente. Cantidad:", consultas.length);
    res.status(200).json(consultas);
  } catch (error) {
    console.error("Error al obtener las consultas:", error);
    res.status(500).json({ error: "Error al obtener las consultas" });
  }
};

module.exports = {
  crearConsultaController,
  obtenerConsultasController,
};
