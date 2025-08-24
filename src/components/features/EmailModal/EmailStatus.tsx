/**
 * @fileoverview Messages d'état pour l'envoi d'email
 * @description Affichage conditionnel des messages de succès/erreur
 * @props status - État actuel de l'envoi
 * @props errorMessage - Message d'erreur éventuel
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

type EmailStatus = 'idle' | 'sending' | 'success' | 'error';

interface EmailStatusProps {
  status: EmailStatus;
  errorMessage: string;
}

export const EmailStatus: React.FC<EmailStatusProps> = ({
  status,
  errorMessage
}) => {
  return (
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
  );
};