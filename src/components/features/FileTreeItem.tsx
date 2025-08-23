/**
 * @fileoverview Composant d'élément d'arborescence de fichiers avec emojis
 * @description Affichage récursif d'un élément de l'arbre (fichier ou dossier) avec icônes emoji
 * @props item - Élément FileItem à afficher
 * @props depth - Profondeur dans l'arborescence (pour indentation)
 * @props isExpanded - État d'expansion du dossier
 * @props onToggle - Callback pour toggle expansion
 */

import React, { useState } from 'react';
import { FileItem } from '@/shared/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface FileTreeItemProps {
  item: FileItem;
  depth?: number;
}

export const FileTreeItem: React.FC<FileTreeItemProps> = ({ 
  item, 
  depth = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasChildren = item.children && item.children.length > 0;
  const indentWidth = depth * 20;

  // Fonction pour obtenir l'emoji selon l'extension ou le type
  const getFileEmoji = (fileName: string, type: 'file' | 'directory'): string => {
    if (type === 'directory') {
      // Emojis spéciaux pour certains noms de dossiers
      const folderName = fileName.toLowerCase();
      
      const folderEmojiMap: { [key: string]: string } = {
        // Dossiers système
        'documents': '📄', 'doc': '📄', 'docs': '📄',
        'downloads': '⬇️', 'download': '⬇️', 'téléchargements': '⬇️',
        'pictures': '🖼️', 'images': '🖼️', 'photos': '📸', 'img': '🖼️',
        'videos': '🎬', 'movies': '🎬', 'films': '🎬', 'vidéos': '🎬',
        'music': '🎵', 'audio': '🎵', 'musique': '🎵', 'sounds': '🎵',
        'desktop': '🖥️', 'bureau': '🖥️',
        'public': '🌐', 'www': '🌐', 'web': '🌐',
        'src': '💻', 'source': '💻', 'sources': '💻',
        'assets': '🎨', 'resources': '🎨', 'res': '🎨',
        'config': '⚙️', 'configuration': '⚙️', 'settings': '⚙️',
        'backup': '💾', 'backups': '💾', 'sauvegarde': '💾',
        'temp': '🗑️', 'temporary': '🗑️', 'tmp': '🗑️', 'cache': '🗑️',
        'logs': '📜', 'log': '📜', 'journal': '📜',
        'scripts': '📜', 'script': '📜',
        'tests': '🧪', 'test': '🧪', 'testing': '🧪',
        'build': '🔨', 'dist': '📦', 'output': '📤', 'bin': '📦',
        'node_modules': '📦', 'packages': '📦', 'libs': '📚', 'lib': '📚',
        'components': '🧩', 'component': '🧩', 'widgets': '🧩',
        'utils': '🔧', 'utilities': '🔧', 'helpers': '🔧', 'tools': '🔧',
        'data': '🗃️', 'database': '🗃️', 'db': '🗃️', 'storage': '🗃️',
        'api': '🔌', 'services': '🔌', 'service': '🔌',
        'styles': '🎨', 'css': '🎨', 'scss': '🎨', 'themes': '🎨',
        'fonts': '🔤', 'font': '🔤', 'typography': '🔤',
        'icons': '🎯', 'icon': '🎯', 'svg': '🎯',
        // Projets/langages
        'react': '⚛️', 'vue': '💚', 'angular': '🅰️', 'next': '▲', 'nuxt': '💚',
        'python': '🐍', 'java': '☕', 'javascript': '⚡', 'js': '⚡',
        'typescript': '🔷', 'ts': '🔷', 'php': '🐘', 'ruby': '💎',
        'go': '🔵', 'rust': '🦀', 'cpp': '⚙️', 'csharp': '#️⃣',
        // Autres
        'admin': '👑', 'user': '👤', 'users': '👥', 'profile': '👤',
        'game': '🎮', 'games': '🎮', 'jeux': '🎮',
        'work': '💼', 'travail': '💼', 'job': '💼', 'projet': '📁', 'project': '📁',
        'personal': '👤', 'perso': '👤', 'private': '🔒', 'privé': '🔒'
      };
      
      // Chercher d'abord une correspondance exacte
      if (folderEmojiMap[folderName]) {
        return folderEmojiMap[folderName];
      }
      
      // Puis chercher si le nom contient un mot-clé
      for (const [key, emoji] of Object.entries(folderEmojiMap)) {
        if (folderName.includes(key)) {
          return emoji;
        }
      }
      
      // Dossier générique par défaut
      return '📁';
    }
    
    const extension = fileName.toLowerCase().split('.').pop() || '';
    
    const emojiMap: { [key: string]: string } = {
      // Images
      'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️', 'gif': '🖼️', 'svg': '🎯', 'webp': '🖼️', 'bmp': '🖼️', 'ico': '🎯',
      
      // Documents
      'pdf': '📄', 'doc': '📝', 'docx': '📝', 'txt': '📄', 'rtf': '📝', 'md': '📝', 'readme': '📖',
      
      // Tableurs
      'xlsx': '📊', 'xls': '📊', 'csv': '📊', 'ods': '📊',
      
      // Présentations
      'pptx': '📺', 'ppt': '📺', 'odp': '📺',
      
      // Code
      'js': '⚡', 'jsx': '⚛️', 'ts': '🔷', 'tsx': '⚛️', 'py': '🐍', 'java': '☕', 
      'cpp': '⚙️', 'c': '⚙️', 'cs': '#️⃣', 'php': '🐘', 'rb': '💎', 'go': '🔵',
      'html': '🌐', 'css': '🎨', 'scss': '🎨', 'sass': '🎨', 'json': '📋', 'xml': '📄',
      'vue': '💚', 'svelte': '🔥', 'rs': '🦀', 'swift': '🦄', 'kt': '🟠',
      
      // Configuration
      'yml': '⚙️', 'yaml': '⚙️', 'toml': '⚙️', 'ini': '⚙️', 'env': '🔐', 'config': '⚙️',
      
      // Exécutables
      'exe': '⚡', 'msi': '📦', 'deb': '📦', 'rpm': '📦', 'dmg': '📦', 'app': '📱',
      
      // Archives
      'zip': '🗜️', 'rar': '🗜️', '7z': '🗜️', 'tar': '🗜️', 'gz': '🗜️', 'bz2': '🗜️',
      
      // Audio
      'mp3': '🎵', 'wav': '🎵', 'flac': '🎵', 'aac': '🎵', 'm4a': '🎵', 'ogg': '🎵',
      
      // Vidéo
      'mp4': '🎬', 'avi': '🎬', 'mkv': '🎬', 'mov': '🎬', 'wmv': '🎬', 'flv': '🎬', 'webm': '🎬',
      
      // Autres
      'iso': '💿', 'torrent': '🌀', 'log': '📜', 'db': '🗃️', 'sql': '🗃️', 'sqlite': '🗃️',
      'gitignore': '🙈', 'dockerfile': '🐳', 'makefile': '🔨', 'license': '📜'
    };
    
    return emojiMap[extension] || '📄';
  };

  const emoji = getFileEmoji(item.name, item.type);

  return (
    <div className={`${item.type === 'directory' && depth === 0 ? 'mb-3' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: depth * 0.05 }}
        className={`
          flex items-center py-1.5 px-2 rounded group transition-colors
          ${item.type === 'directory' 
            ? 'hover:bg-slate-50 cursor-pointer border-l-2 border-l-transparent hover:border-l-slate-400' 
            : 'hover:bg-slate-50'
          }
          ${depth === 0 && item.type === 'directory' ? 'bg-slate-50 border border-slate-200 font-semibold' : ''}
        `}
        style={{ paddingLeft: `${12 + indentWidth}px` }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {/* Ligne de connexion pour la structuration */}
        {depth > 0 && (
          <div 
            className="absolute border-l border-slate-300 opacity-30"
            style={{ 
              left: `${4 + (depth - 1) * 20}px`,
              top: '0',
              bottom: '0',
              width: '1px'
            }}
          />
        )}

        {/* Icône d'expansion pour dossiers */}
        <div className="w-4 h-4 flex items-center justify-center mr-2 relative z-10">
          {hasChildren ? (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={12} className="text-slate-600" />
            </motion.div>
          ) : (
            <div className="w-3 h-3 border border-slate-300 rounded-sm opacity-30"></div>
          )}
        </div>

        {/* Emoji + nom avec style amélioré */}
        <div className="flex items-center flex-1 min-w-0">
          <span className="text-base mr-2.5" role="img" style={{ filter: 'brightness(1.1)' }}>
            {emoji}
          </span>
          <span className={`
            text-sm truncate
            ${item.type === 'directory' 
              ? 'font-semibold text-slate-800' 
              : 'text-slate-700 font-medium'
            }
            ${depth === 0 && item.type === 'directory' ? 'text-blue-800' : ''}
          `}>
            {item.name}
          </span>
          
          {/* Badge pour dossiers avec nombre d'éléments */}
          {item.type === 'directory' && hasChildren && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
              {item.children?.length || 0}
            </span>
          )}
        </div>

        {/* Taille pour les fichiers */}
        {item.type === 'file' && (
          <div className="ml-2 flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              {formatSize(item.size || 0)}
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
          </div>
        )}
      </motion.div>

      {/* Enfants (récursif) avec séparation visuelle */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden relative"
          >
            {/* Séparateur visuel pour les enfants */}
            {depth === 0 && (
              <div className="ml-6 border-l-2 border-blue-100 pl-2 py-1">
                {item.children?.map((child, index) => (
                  <FileTreeItem
                    key={`${child.path}-${index}`}
                    item={child}
                    depth={depth + 1}
                  />
                ))}
              </div>
            )}
            
            {/* Rendu normal pour les autres niveaux */}
            {depth > 0 && item.children?.map((child, index) => (
              <FileTreeItem
                key={`${child.path}-${index}`}
                item={child}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Formate la taille des fichiers
 */
function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}