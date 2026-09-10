require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// ROUTE D'ACCUEIL
// ==========================================

app.get("/", (req, res) => {
  res.send("API Univers Ceramic en ligne ✅");
});

// ==========================================
// ROUTE DE CONTACT
// ==========================================

app.post("/contact", async (req, res) => {
  const { name, phone, email, message } = req.body;

  console.log("📩 Nouvelle demande :", req.body);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,

      subject: `Nouvelle demande Univers Ceramic - ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Nouvelle demande de contact</h2>

          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Téléphone :</strong> ${phone}</p>
          <p><strong>Email :</strong> ${email}</p>

          <hr>

          <p><strong>Message :</strong></p>
          <p>${message}</p>

          <hr>

          <p><strong>Date :</strong> ${new Date().toLocaleString("fr-FR")}</p>
        </div>
      `,
    });

    console.log("📧 E-mail envoyé avec succès");

    res.status(200).json({
      success: true,
      message: "Votre demande a été envoyée avec succès.",
    });

  } catch (error) {
    console.error("=================================");
    console.error("❌ ERREUR COMPLETE :", error);
    console.error("❌ MESSAGE :", error.message);
    console.error("=================================");

    res.status(500).json({
      success: false,
      message: "Une erreur est survenue.",
    });
  }
});

// ==========================================
// LANCEMENT DU SERVEUR
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend Univers Ceramic lancé sur http://localhost:${PORT}`);
});