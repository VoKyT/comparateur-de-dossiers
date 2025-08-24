/**
 * @fileoverview Configuration warning pour Resend
 * @description Affichage conditionnel des instructions de configuration
 * @props isConfigurationValid - État de validité de la configuration
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

interface EmailConfigurationProps {
  isConfigurationValid: boolean;
}

export const EmailConfiguration: React.FC<EmailConfigurationProps> = ({
  isConfigurationValid
}) => {
  if (isConfigurationValid) return null;

  return (
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
  );
};