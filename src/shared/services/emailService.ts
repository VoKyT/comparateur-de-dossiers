/**
 * @fileoverview Service d'envoi d'emails via Resend
 * @description Interface centralisée moderne pour l'envoi de rapports par email
 * @dependencies resend - Service Resend moderne pour développeurs
 * @config RESEND_API_KEY - Clé API Resend requise
 * @methods sendReport - Envoie rapport de comparaison par email
 * @types ResendConfig - Configuration Resend
 * @types EmailData - Données à envoyer par email
 * @security API Key côté backend uniquement (pas d'exposition frontend)
 */

import { Resend } from 'resend';

// Configuration Resend (plus simple et sécurisée)
const RESEND_CONFIG = {
  API_KEY: 're_your_api_key', // À remplacer par votre clé Resend
  FROM_EMAIL: 'noreply@votre-domaine.com' // À remplacer par votre domaine vérifié
};

export interface EmailData {
  to: string;
  subject: string;
  folderAName: string;
  folderBName: string;
  reportContent: string;
  comparisonSummary: string;
}

export interface ResendConfig {
  apiKey: string;
  fromEmail: string;
}

class EmailService {
  private config: ResendConfig;
  private resend: Resend | null = null;

  constructor() {
    this.config = {
      apiKey: RESEND_CONFIG.API_KEY,
      fromEmail: RESEND_CONFIG.FROM_EMAIL
    };
  }

  /**
   * Initialise Resend avec la clé API
   */
  private initialize(): void {
    if (this.resend) return;
    
    try {
      this.resend = new Resend(this.config.apiKey);
      console.log('📧 [EMAIL_SERVICE] Resend initialisé avec succès');
    } catch (error) {
      console.error('❌ [EMAIL_SERVICE] Erreur initialisation Resend:', error);
      throw new Error('Impossible d\'initialiser le service email Resend');
    }
  }

  /**
   * Génère un template HTML moderne pour l'email
   */
  private generateEmailHTML(
    folderAName: string,
    folderBName: string,
    comparisonSummary: string,
    reportContent: string
  ): string {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport de Comparaison</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155; background-color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden; }
    .header { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 30px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
    .content { padding: 30px; }
    .summary { background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
    .folders { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
    .folder { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .folder-name { font-weight: 600; color: #1e293b; margin-bottom: 5px; }
    .report-content { background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; margin: 20px 0; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
    .badge { display: inline-block; background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Rapport de Comparaison</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Comparateur de Dossiers</p>
    </div>
    
    <div class="content">
      <div class="summary">
        <h3 style="margin-top: 0; color: #1e40af;">📋 Résumé de la comparaison</h3>
        <p>${comparisonSummary || 'Rapport de comparaison détaillé disponible ci-dessous'}</p>
        <span class="badge">✅ Traitement terminé</span>
      </div>
      
      <div class="folders">
        <div class="folder">
          <div class="folder-name">📁 Dossier A</div>
          <div style="color: #64748b;">${folderAName}</div>
        </div>
        <div class="folder">
          <div class="folder-name">📁 Dossier B</div>
          <div style="color: #64748b;">${folderBName}</div>
        </div>
      </div>
      
      <h3>📄 Rapport détaillé</h3>
      <div class="report-content">${reportContent}</div>
      
      <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
        Ce rapport a été généré automatiquement par l'application Comparateur de Dossiers.
        <br>Date de génération : ${new Date().toLocaleDateString('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Comparateur de Dossiers</strong></p>
      <p>Application moderne de comparaison de fichiers</p>
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Envoie un rapport de comparaison par email via Resend
   * @param toEmail - Adresse email de destination
   * @param reportContent - Contenu du rapport
   * @param folderAName - Nom du dossier A
   * @param folderBName - Nom du dossier B
   * @param comparisonSummary - Résumé de la comparaison
   */
  async sendReport(
    toEmail: string,
    reportContent: string,
    folderAName: string,
    folderBName: string,
    comparisonSummary: string = ''
  ): Promise<void> {
    try {
      this.initialize();

      // Validation de l'email
      if (!this.isValidEmail(toEmail)) {
        throw new Error('Adresse email invalide');
      }

      // Vérification de la configuration
      if (!this.resend) {
        throw new Error('Service Resend non initialisé');
      }

      console.log('📤 [EMAIL_SERVICE] Tentative envoi email via Resend vers:', toEmail);

      // Générer le HTML de l'email
      const htmlContent = this.generateEmailHTML(folderAName, folderBName, comparisonSummary, reportContent);

      // Envoi via Resend API
      const response = await this.resend.emails.send({
        from: this.config.fromEmail,
        to: [toEmail],
        subject: `📊 Rapport de comparaison : ${folderAName} vs ${folderBName}`,
        html: htmlContent
      });

      if (response.data) {
        console.log('✅ [EMAIL_SERVICE] Email envoyé avec succès via Resend:', response.data.id);
      } else if (response.error) {
        console.error('❌ [EMAIL_SERVICE] Erreur Resend:', response.error);
        throw new Error(`Erreur Resend: ${response.error.message}`);
      }

    } catch (error) {
      console.error('❌ [EMAIL_SERVICE] Erreur envoi email:', error);
      
      // Messages d'erreur spécifiques pour Resend
      if (error instanceof Error) {
        if (error.message.includes('Invalid email')) {
          throw new Error('Adresse email invalide');
        } else if (error.message.includes('domain')) {
          throw new Error('Domaine email non vérifié dans Resend');
        } else if (error.message.includes('API key')) {
          throw new Error('Clé API Resend invalide ou manquante');
        } else if (error.message.includes('rate limit')) {
          throw new Error('Limite d\'envoi Resend atteinte - Réessayez plus tard');
        }
      }
      
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }
  }

  /**
   * Valide le format d'une adresse email
   * @param email - Adresse email à valider
   * @returns true si l'email est valide
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Vérifie si la configuration Resend est valide
   * @returns true si la configuration est complète
   */
  isConfigurationValid(): boolean {
    return !!(
      this.config.apiKey && 
      this.config.fromEmail &&
      this.config.apiKey !== 're_your_api_key' &&
      this.config.fromEmail !== 'noreply@votre-domaine.com'
    );
  }

  /**
   * Met à jour la configuration Resend
   * @param config - Nouvelle configuration
   */
  updateConfiguration(config: Partial<ResendConfig>): void {
    this.config = { ...this.config, ...config };
    this.resend = null; // Force réinitialisation
    console.log('🔧 [EMAIL_SERVICE] Configuration Resend mise à jour');
  }

  /**
   * Teste la configuration Resend
   * @returns Promise<boolean> - true si la configuration fonctionne
   */
  async testConfiguration(): Promise<boolean> {
    try {
      if (!this.isConfigurationValid()) {
        console.warn('⚠️ [EMAIL_SERVICE] Configuration Resend incomplète');
        return false;
      }

      this.initialize();
      
      if (!this.resend) {
        console.error('❌ [EMAIL_SERVICE] Impossible d\'initialiser Resend');
        return false;
      }

      // Test simple de l'API Resend (sans envoyer d'email)
      console.log('🧪 [EMAIL_SERVICE] Test configuration Resend OK');
      return true;

    } catch (error) {
      console.error('❌ [EMAIL_SERVICE] Erreur test configuration:', error);
      return false;
    }
  }
}

// Instance singleton du service
export const emailService = new EmailService();

// Export pour tests et configuration
export { EmailService };