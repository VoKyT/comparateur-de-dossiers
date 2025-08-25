/**
 * @fileoverview Serveur backend Express pour l'envoi d'emails via Resend
 * @description Serveur minimal pour éviter les problèmes CORS avec l'API Resend
 * @port 3001 - Port du serveur backend
 * @endpoint POST /send-email - Endpoint pour envoyer des emails
 */

import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const PORT = 3001;

// Configuration Resend
const resend = new Resend('re_GFeTi4hN_AzHQnXrr48DRsZ2oFnkyn8qS');

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint pour envoyer des emails
app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    console.log(`📤 [BACKEND] Tentative envoi email vers: ${to}`);

    // Envoi via Resend
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      subject: subject,
      html: html
    });

    if (result.data) {
      console.log(`✅ [BACKEND] Email envoyé avec succès:`, result.data.id);
      res.status(200).json({ 
        success: true, 
        id: result.data.id,
        message: 'Email envoyé avec succès' 
      });
    } else if (result.error) {
      console.error(`❌ [BACKEND] Erreur Resend:`, result.error);
      res.status(400).json({ 
        success: false, 
        error: result.error.message || 'Erreur Resend'
      });
    }

  } catch (error) {
    console.error(`❌ [BACKEND] Erreur serveur:`, error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur lors de l\'envoi'
    });
  }
});

// Endpoint de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Email Backend', timestamp: new Date().toISOString() });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 [BACKEND] Serveur email démarré sur http://localhost:${PORT}`);
  console.log(`📧 [BACKEND] Endpoint: POST /send-email`);
  console.log(`💚 [BACKEND] Health check: GET /health`);
});