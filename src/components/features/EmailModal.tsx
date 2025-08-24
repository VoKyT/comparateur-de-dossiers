/**
 * @fileoverview Modal d'envoi de rapport par email
 * @description Interface professionnelle pour saisir email et envoyer rapport
 * @props isOpen - État ouvert/fermé du modal
 * @props onClose - Callback fermeture modal
 * @props reportData - Contenu du rapport à envoyer
 * @props folderAName - Nom du dossier A
 * @props folderBName - Nom du dossier B
 * @props onEmailSent - Callback après envoi réussi
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Mail, Send, Check, AlertCircle, Settings } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { createAccessibleProps } from '@/shared/accessibility';
import { emailService } from '@/shared/services/emailService';

type EmailStatus = 'idle' | 'sending' | 'success' | 'error';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: string;
  folderAName: string;
  folderBName: string;
  onEmailSent?: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  reportData,
  folderAName,
  folderBName,
  onEmailSent
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<EmailStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Validation email simple
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    if (!isValidEmail(email)) {
      setStatus('error');
      setErrorMessage('Veuillez saisir une adresse email valide');
      return;
    }

    // Vérifier la configuration Resend
    if (!emailService.isConfigurationValid()) {
      setStatus('error');
      setErrorMessage('Configuration Resend incomplète. Veuillez configurer votre clé API.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      // Créer un résumé de la comparaison
      const reportLines = reportData.split('\n');
      const summaryMatch = reportLines.find(line => line.includes('fichiers communs'));
      const comparisonSummary = summaryMatch || `Comparaison entre ${folderAName} et ${folderBName}`;
      
      // Envoyer via EmailJS
      await emailService.sendReport(
        email,
        reportData,
        folderAName,
        folderBName,
        comparisonSummary
      );
      
      console.log(`✅ [EMAIL_MODAL] Rapport envoyé à: ${email}`);
      console.log(`📊 [EMAIL_MODAL] Rapport: ${folderAName} vs ${folderBName}`);
      
      setStatus('success');
      onEmailSent?.();
      
      // Fermer le modal après succès
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 2000);

    } catch (error) {
      console.error('❌ [EMAIL_MODAL] Erreur envoi email:', error);
      setStatus('error');
      
      // Utiliser le message d'erreur du service si disponible
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'envoi. Veuillez réessayer.';
      setErrorMessage(errorMessage);
    }
  };

  const handleClose = () => {
    if (status !== 'sending') {
      onClose();
      setStatus('idle');
      setEmail('');
      setErrorMessage('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail size={16} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Envoyer par email
                  </h3>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  disabled={status === 'sending'}
                  className="h-8 w-8"
                  {...createAccessibleProps('closeEmailModal')}
                >
                  <X size={16} />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Info rapport */}
                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-slate-800 mb-2">Rapport à envoyer :</h4>
                  <p className="text-sm text-slate-600">
                    📊 Comparaison : <span className="font-medium">{folderAName}</span> vs{' '}
                    <span className="font-medium">{folderBName}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Format : Rapport détaillé (.txt)
                  </p>
                </div>

                {/* Configuration warning si Resend pas configuré */}
                {!emailService.isConfigurationValid() && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <Settings size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-amber-800 mb-1">
                          Configuration Resend requise
                        </h5>
                        <p className="text-sm text-amber-700 mb-2">
                          Pour utiliser l'envoi par email, vous devez configurer Resend avec votre clé API :
                        </p>
                        <ul className="text-xs text-amber-600 space-y-1 ml-4">
                          <li>• Créer un compte sur <strong>resend.com</strong> (100 emails/jour gratuits)</li>
                          <li>• Obtenir votre clé API et vérifier votre domaine</li>
                          <li>• Mettre à jour le fichier <code>emailService.ts</code></li>
                        </ul>
                        <div className="mt-3 text-xs text-amber-600">
                          <strong>✨ Avantages Resend :</strong> API moderne, meilleure délivrabilité, templates React
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Champ email */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Adresse email de destination
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@domaine.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'sending' || status === 'success' || !emailService.isConfigurationValid()}
                    className="w-full"
                    {...createAccessibleProps('emailInput')}
                  />
                </div>

                {/* Messages d'état */}
                <AnimatePresence>
                  {status === 'error' && errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
                    >
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </motion.div>
                  )}

                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                    >
                      <Check size={16} className="text-green-500 flex-shrink-0" />
                      <p className="text-sm text-green-700">Email envoyé avec succès !</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    disabled={status === 'sending'}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  
                  <Button
                    onClick={handleSendEmail}
                    disabled={!email || status === 'sending' || status === 'success' || !emailService.isConfigurationValid()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Send size={16} />
                      </motion.div>
                    )}
                    {status === 'success' && <Check size={16} className="mr-2" />}
                    {status === 'idle' && <Send size={16} className="mr-2" />}
                    {status === 'error' && <Send size={16} className="mr-2" />}
                    
                    {status === 'sending' ? 'Envoi...' : 
                     status === 'success' ? 'Envoyé' : 'Envoyer'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};