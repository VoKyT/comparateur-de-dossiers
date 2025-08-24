/**
 * @fileoverview Header du modal d'envoi email
 * @description Composant header modulaire pour EmailModal
 * @props onClose - Callback fermeture modal
 * @props disabled - État disabled pour bouton fermeture
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Mail } from 'lucide-react';
import { createAccessibleProps } from '@/shared/accessibility';

interface EmailModalHeaderProps {
  onClose: () => void;
  disabled: boolean;
}

export const EmailModalHeader: React.FC<EmailModalHeaderProps> = ({
  onClose,
  disabled
}) => {
  return (
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
        onClick={onClose}
        disabled={disabled}
        className="h-8 w-8"
        {...createAccessibleProps('closeEmailModal')}
      >
        <X size={16} />
      </Button>
    </div>
  );
};