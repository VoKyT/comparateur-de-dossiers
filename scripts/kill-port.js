/**
 * @fileoverview Script pour fermer automatiquement un processus occupant un port
 * @description Utilitaire multiplateforme pour libérer un port avant démarrage serveur
 * @usage node scripts/kill-port.js [port]
 * @default Port par défaut: 3000
 * @platform Compatible Windows, Linux, macOS
 */

import { exec } from 'child_process';
import { platform } from 'os';

const port = process.argv[2] || '3000';

/**
 * Exécute une commande système et retourne une promesse
 */
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // Ne pas considérer comme erreur si aucun processus trouvé
        if (stderr.includes('not found') || stderr.includes('No matching processes')) {
          resolve(`Aucun processus trouvé sur le port ${port}`);
        } else {
          reject(error);
        }
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Ferme les processus occupant le port selon la plateforme
 */
async function killPort() {
  const isWindows = platform() === 'win32';
  
  try {
    console.log(`🔍 Vérification du port ${port}...`);
    
    if (isWindows) {
      // Windows: utilise netstat et taskkill
      const findCommand = `netstat -ano | findstr :${port}`;
      
      try {
        const result = await executeCommand(findCommand);
        
        if (result.includes('LISTENING')) {
          // Extraire les PIDs des processus écoutant sur ce port
          const lines = result.split('\n').filter(line => line.includes(':' + port) && line.includes('LISTENING'));
          
          for (const line of lines) {
            const parts = line.trim().split(/\s+/);
            const pid = parts[parts.length - 1];
            
            if (pid && pid !== '0') {
              console.log(`💀 Fermeture du processus PID ${pid} sur le port ${port}...`);
              await executeCommand(`taskkill /PID ${pid} /F`);
            }
          }
          console.log(`✅ Port ${port} libéré avec succès`);
        } else {
          console.log(`✅ Port ${port} déjà libre`);
        }
      } catch (error) {
        console.log(`✅ Port ${port} libre (aucun processus détecté)`);
      }
      
    } else {
      // Unix/Linux/macOS: utilise lsof et kill
      const findCommand = `lsof -ti:${port}`;
      
      try {
        const result = await executeCommand(findCommand);
        const pids = result.trim().split('\n').filter(pid => pid);
        
        if (pids.length > 0) {
          console.log(`💀 Fermeture des processus sur le port ${port}: ${pids.join(', ')}...`);
          await executeCommand(`kill -9 ${pids.join(' ')}`);
          console.log(`✅ Port ${port} libéré avec succès`);
        } else {
          console.log(`✅ Port ${port} déjà libre`);
        }
      } catch (error) {
        console.log(`✅ Port ${port} libre (aucun processus détecté)`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Erreur lors de la libération du port ${port}:`, error.message);
    process.exit(1);
  }
}

// Exécution du script
killPort();