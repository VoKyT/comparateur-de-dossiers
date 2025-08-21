/**
 * @fileoverview Page d'accueil de l'application comparateur de dossiers
 * @description Page principale composée de modules réutilisables selon architecture CLAUDE.md
 * @props Aucune - Composant de page autonome
 * @state Aucun état local - Délégué aux composants enfants
 * @events handleTestClick, openWebConsole - Actions utilisateur
 * @dependencies AppLayout, PageHeader, VersionBadge, ActionButton, ButtonGroup
 * @parent App.tsx - Point d'entrée de l'application
 * @children Composants modulaires layout + common
 * @styling Classes Tailwind via composants shadcn/ui
 * @accessibility Navigation clavier et ARIA via composants
 * @performance Composants memo optimisés, pas de re-renders inutiles
 * @testing Logs avec IDs uniques pour traçabilité
 */

import React, { useEffect, useState } from 'react';

// Layout components - Architecture modulaire
import { AppLayout, PageHeader } from '@/components/layout';

// Common reusable components - Réutilisabilité
import { ActionButton } from '@/components/common';

// Shared constants - Configuration centralisée
import { APP_CONFIG, LOG_IDS } from '@/shared/constants';

/**
 * Page d'accueil avec architecture modulaire professionnelle
 * 
 * Fonctionnalités :
 * - Structure modulaire selon CLAUDE.md
 * - Composants réutilisables et isolés
 * - Séparation des responsabilités stricte
 * - Logs de traçabilité avec IDs uniques
 * - Design responsive mobile-first
 */
interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  children?: FileItem[];
}

interface ComparisonResult {
  name: string;
  size: number;
  pathA: string;
  pathB: string;
}

interface ComparisonData {
  uniqueA: FileItem[];
  uniqueB: FileItem[];
  common: ComparisonResult[];
}

export const HomePage: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [fileTree, setFileTree] = useState<FileItem[]>([]);
  
  // États pour la comparaison
  const [folderA, setFolderA] = useState<{ name: string; files: FileItem[] } | null>(null);
  const [folderB, setFolderB] = useState<{ name: string; files: FileItem[] } | null>(null);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);

  useEffect(() => {
    console.log(`🆕 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.INIT}] Page d'accueil initialisée`);
    
    // Configuration initiale du body selon CLAUDE.md
    document.body.className = 'm-0 p-0';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    console.log(`📊 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.CONFIG}] Configuration body appliquée`);
  }, []);

  const buildFileTree = (files: FileList): FileItem[] => {
    const root: FileItem[] = [];
    const directories = new Map<string, FileItem>();
    
    // Créer tous les dossiers d'abord
    Array.from(files).forEach(file => {
      const parts = file.webkitRelativePath.split('/');
      parts.slice(0, -1).forEach((part, index) => {
        const path = parts.slice(0, index + 1).join('/');
        if (!directories.has(path)) {
          directories.set(path, {
            name: part,
            path: path,
            type: 'directory',
            children: []
          });
        }
      });
    });
    
    // Ajouter les fichiers
    Array.from(files).forEach(file => {
      const parts = file.webkitRelativePath.split('/');
      const fileName = parts[parts.length - 1];
      const fileItem: FileItem = {
        name: fileName,
        path: file.webkitRelativePath,
        type: 'file'
      };
      
      if (parts.length === 1) {
        // Fichier à la racine
        root.push(fileItem);
      } else {
        // Fichier dans un dossier
        const parentPath = parts.slice(0, -1).join('/');
        const parent = directories.get(parentPath);
        if (parent && parent.children) {
          parent.children.push(fileItem);
        }
      }
    });
    
    // Construire la hiérarchie
    directories.forEach((dir, path) => {
      const parts = path.split('/');
      if (parts.length === 1) {
        // Dossier racine
        root.push(dir);
      } else {
        // Sous-dossier
        const parentPath = parts.slice(0, -1).join('/');
        const parent = directories.get(parentPath);
        if (parent && parent.children) {
          parent.children.push(dir);
        }
      }
    });
    
    // Trier récursivement et ajouter numérotation
    const sortItems = (items: FileItem[]): FileItem[] => {
      const sorted = items.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
      
      // Ajouter numérotation selon le nombre total d'éléments
      const totalCount = sorted.length;
      const paddingLength = totalCount >= 100 ? 3 : totalCount >= 10 ? 2 : 1;
      
      return sorted.map((item, index) => {
        const originalName = item.name.replace(/^\d+\.\s/, ''); // Enlever numérotation existante
        return {
          ...item,
          name: `${(index + 1).toString().padStart(paddingLength, '0')}. ${originalName}`,
          children: item.children ? sortItems(item.children) : undefined
        };
      });
    };
    
    return sortItems(root);
  };

  const buildFileTreeFromAPI = async (dirHandle: any, path: string = ''): Promise<FileItem[]> => {
    const items: FileItem[] = [];
    
    try {
      for await (const entry of dirHandle.values()) {
        const nestedPath = path ? `${path}/${entry.name}` : entry.name;
        
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          items.push({
            name: entry.name,
            path: nestedPath,
            type: 'file',
            size: file.size
          });
        } else if (entry.kind === 'directory') {
          const children = await buildFileTreeFromAPI(entry, nestedPath);
          items.push({
            name: entry.name,
            path: nestedPath,
            type: 'directory',
            children
          });
        }
      }
      
      // Trier et numéroter
      const sorted = items.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
      
      const totalCount = sorted.length;
      const paddingLength = totalCount >= 100 ? 3 : totalCount >= 10 ? 2 : 1;
      
      return sorted.map((item, index) => ({
        ...item,
        name: `${(index + 1).toString().padStart(paddingLength, '0')}. ${item.name}`,
        children: item.children
      }));
    } catch (error) {
      console.error('Erreur lecture dossier:', error);
      return [];
    }
  };

  // Fonction pour extraire tous les fichiers d'un arbre
  const extractAllFiles = (items: FileItem[]): FileItem[] => {
    const files: FileItem[] = [];
    
    const traverse = (items: FileItem[]) => {
      items.forEach(item => {
        if (item.type === 'file') {
          files.push(item);
        } else if (item.children) {
          traverse(item.children);
        }
      });
    };
    
    traverse(items);
    return files;
  };

  // Fonction de comparaison avancée (3 colonnes)
  const compareFilesAdvanced = (filesA: FileItem[], filesB: FileItem[]): ComparisonData => {
    const common: ComparisonResult[] = [];
    const uniqueA: FileItem[] = [];
    const uniqueB: FileItem[] = [];
    
    // Créer des maps pour recherche rapide
    const mapB = new Map<string, FileItem[]>();
    filesB.forEach(fileB => {
      if (fileB.type === 'file' && fileB.size !== undefined) {
        const key = `${fileB.name}_${fileB.size}`;
        if (!mapB.has(key)) {
          mapB.set(key, []);
        }
        mapB.get(key)!.push(fileB);
      }
    });
    
    // Analyser fichiers A
    filesA.forEach(fileA => {
      if (fileA.type === 'file' && fileA.size !== undefined) {
        const key = `${fileA.name}_${fileA.size}`;
        const matches = mapB.get(key);
        
        if (matches && matches.length > 0) {
          // Fichier commun
          matches.forEach(match => {
            common.push({
              name: fileA.name,
              size: fileA.size!,
              pathA: fileA.path,
              pathB: match.path
            });
          });
          // Retirer de mapB pour éviter les doublons
          mapB.delete(key);
        } else {
          // Fichier unique à A
          uniqueA.push(fileA);
        }
      }
    });
    
    // Fichiers restants dans B sont uniques à B
    mapB.forEach(files => {
      uniqueB.push(...files);
    });
    
    return { uniqueA, uniqueB, common };
  };

  const handleFolderSelectA = async () => {
    console.log(`👆 [HOME_PAGE] Sélection dossier A`);
    
    try {
      if ('showDirectoryPicker' in window) {
        const dirHandle = await (window as any).showDirectoryPicker();
        const tree = await buildFileTreeFromAPI(dirHandle);
        const files = extractAllFiles(tree);
        
        setFolderA({ name: dirHandle.name, files });
        console.log(`✅ [HOME_PAGE] Dossier A sélectionné: ${dirHandle.name} (${files.length} fichiers)`);
      }
    } catch (error) {
      console.error(`❌ [HOME_PAGE] Erreur sélection dossier A:`, error);
    }
  };

  const handleFolderSelectB = async () => {
    console.log(`👆 [HOME_PAGE] Sélection dossier B`);
    
    try {
      if ('showDirectoryPicker' in window) {
        const dirHandle = await (window as any).showDirectoryPicker();
        const tree = await buildFileTreeFromAPI(dirHandle);
        const files = extractAllFiles(tree);
        
        setFolderB({ name: dirHandle.name, files });
        console.log(`✅ [HOME_PAGE] Dossier B sélectionné: ${dirHandle.name} (${files.length} fichiers)`);
      }
    } catch (error) {
      console.error(`❌ [HOME_PAGE] Erreur sélection dossier B:`, error);
    }
  };

  // Déclencher la comparaison quand les deux dossiers sont sélectionnés
  useEffect(() => {
    if (folderA && folderB) {
      const data = compareFilesAdvanced(folderA.files, folderB.files);
      setComparisonData(data);
      console.log(`🔍 [HOME_PAGE] Comparaison terminée: ${data.common.length} communs, ${data.uniqueA.length} uniques A, ${data.uniqueB.length} uniques B`);
    }
  }, [folderA, folderB]);

  const handleFolderSelect = async () => {
    console.log(`👆 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.FOLDER_SELECT}] Sélection de dossier`);
    
    try {
      // Essayer d'abord l'API File System Access pour détecter les dossiers vides
      if ('showDirectoryPicker' in window) {
        const dirHandle = await (window as any).showDirectoryPicker();
        setSelectedFolder(dirHandle.name);
        
        console.log(`🔍 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.SUCCESS}] Utilisation File System Access API`);
        const tree = await buildFileTreeFromAPI(dirHandle);
        setFileTree(tree);
        
        console.log(`✅ [HOME_PAGE] [${LOG_IDS.HOME_PAGE.SUCCESS}] Dossier sélectionné: ${dirHandle.name}`);
        console.log('🌳 [HOME_PAGE] Arbre construit avec dossiers vides:', tree);
      } else {
        // Fallback pour browsers sans support
        console.log(`⚠️ [HOME_PAGE] Fallback vers webkitdirectory (dossiers vides non détectés)`);
        const input = document.createElement('input');
        input.type = 'file';
        input.webkitdirectory = true;
        input.onchange = (e: any) => {
          const files = e.target.files;
          if (files.length > 0) {
            const folderPath = files[0].webkitRelativePath.split('/')[0];
            setSelectedFolder(folderPath);
            
            // Construire l'arbre des fichiers
            const tree = buildFileTree(files);
            setFileTree(tree);
            
            console.log(`✅ [HOME_PAGE] [${LOG_IDS.HOME_PAGE.SUCCESS}] Dossier sélectionné: ${folderPath}`);
            console.log(`📁 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.SUCCESS}] ${files.length} fichiers trouvés`);
          }
        };
        input.click();
      }
    } catch (error) {
      console.error(`❌ [HOME_PAGE] [${LOG_IDS.HOME_PAGE.ERROR}] Erreur sélection dossier:`, error);
    }
  };

  const renderFileTree = (items: FileItem[], level: number = 0, isLast: boolean[] = []): React.ReactNode => {
    return (
      <div>
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          const currentIsLast = [...isLast, isLastItem];
          
          return (
            <div key={item.path}>
              <div className="flex items-center gap-1 py-1 px-2 hover:bg-slate-50 transition-smooth text-sm" style={{ fontFamily: '"Consolas", "DejaVu Sans Mono", "Lucida Console", "Courier New", monospace' }}>
                {/* Lignes d'arborescence avec caractères Unicode */}
                {level > 0 && (
                  <div className="flex items-center">
                    {isLast.map((isParentLast, i) => (
                      <div key={i} className="w-4 flex justify-center">
                        <span className="text-slate-400">
                          {!isParentLast ? '│' : ' '}
                        </span>
                      </div>
                    ))}
                    <div className="w-4 flex justify-center">
                      <span className="text-sky-400">
                        {isLastItem ? '└' : '├'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sky-400">─</span>
                    </div>
                  </div>
                )}
                
                <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${item.type === 'directory' ? 'bg-slate-500' : 'bg-slate-400'}`}></div>
                <span className="text-sm text-slate-700 font-medium">
                  {item.name}{item.type === 'directory' ? '/' : ''}
                </span>
                {item.type === 'directory' && (
                  <span className="text-xs text-slate-500 ml-2">
                    {(() => {
                      if (!item.children || item.children.length === 0) {
                        return '(empty)';
                      }
                      const folders = item.children.filter(child => child.type === 'directory').length;
                      const files = item.children.filter(child => child.type === 'file').length;
                      const parts = [];
                      if (folders > 0) parts.push(`${folders} dossier${folders > 1 ? 's' : ''}`);
                      if (files > 0) parts.push(`${files} fichier${files > 1 ? 's' : ''}`);
                      return parts.length > 0 ? `(${parts.join(' - ')})` : '';
                    })()}
                  </span>
                )}
              </div>
              {item.children && item.children.length > 0 && renderFileTree(item.children, level + 1, currentIsLast)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <AppLayout>
      {/* En-tête stylé et attirant */}
      <PageHeader 
        title="Comparateur de Dossiers"
      />

      {/* Boutons de comparaison */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <ActionButton
            onClick={handleFolderSelectA}
            variant="primary"
            size="lg"
          >
            Select Folder A {folderA ? `(${folderA.name})` : ''}
          </ActionButton>
          
          <ActionButton
            onClick={handleFolderSelectB}
            variant="primary"
            size="lg"
          >
            Select Folder B {folderB ? `(${folderB.name})` : ''}
          </ActionButton>
        </div>
        
        {/* Séparateur OU pour la navigation simple */}
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="text-slate-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>
        
        <ActionButton
          onClick={handleFolderSelect}
          variant="secondary"
          size="default"
        >
          Explore Single Folder
        </ActionButton>

        {/* Affichage du dossier sélectionné */}
        {selectedFolder && (
          <div className="bg-white border border-slate-200 rounded-lg px-6 py-4 shadow-sm mb-6">
            <p className="text-base sm:text-lg text-slate-800 font-semibold">
              Selected Folder: <span className="text-slate-700">{selectedFolder}</span>
            </p>
          </div>
        )}

        {/* Interface 3 colonnes de comparaison */}
        {comparisonData && (
          <div className="w-full max-w-7xl bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            {/* En-tête statistiques */}
            <div className="mb-6 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
                Folder Comparison
              </h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
                <span>{folderA?.name} ({comparisonData.uniqueA.length + comparisonData.common.length} files)</span>
                <span>{comparisonData.common.length} common</span>
                <span>{folderB?.name} ({comparisonData.uniqueB.length + comparisonData.common.length} files)</span>
              </div>
            </div>
            
            {/* Interface 3 colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Colonne A - Fichiers uniques au dossier A */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-bold text-slate-800 mb-3 text-center">
                  Only in {folderA?.name}
                  <span className="block text-sm font-normal text-slate-600">
                    ({comparisonData.uniqueA.length} file{comparisonData.uniqueA.length > 1 ? 's' : ''})
                  </span>
                </h4>
                <div className="max-h-80 overflow-y-auto space-y-2">
                  {comparisonData.uniqueA.map((file, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-slate-200 hover:bg-slate-50 transition-smooth">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-700 truncate">{file.name}</div>
                          <div className="text-xs text-slate-500">
                            {file.size ? `${(file.size / 1024).toFixed(1)} KB` : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Colonne centrale - Fichiers communs */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 mb-3 text-center">
                  Common Files
                  <span className="block text-sm font-normal text-blue-600">
                    ({comparisonData.common.length} file{comparisonData.common.length > 1 ? 's' : ''})
                  </span>
                </h4>
                <div className="max-h-80 overflow-y-auto space-y-2">
                  {comparisonData.common.map((file, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-blue-200 hover:bg-blue-50 transition-smooth">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-blue-700 truncate">{file.name}</div>
                          <div className="text-xs text-blue-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </div>
                          <div className="text-xs text-blue-400 truncate">
                            A: {file.pathA}
                          </div>
                          <div className="text-xs text-blue-400 truncate">
                            B: {file.pathB}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Colonne B - Fichiers uniques au dossier B */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-3 text-center">
                  Only in {folderB?.name}
                  <span className="block text-sm font-normal text-gray-600">
                    ({comparisonData.uniqueB.length} file{comparisonData.uniqueB.length > 1 ? 's' : ''})
                  </span>
                </h4>
                <div className="max-h-80 overflow-y-auto space-y-2">
                  {comparisonData.uniqueB.map((file, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 hover:bg-gray-50 transition-smooth">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-700 truncate">{file.name}</div>
                          <div className="text-xs text-gray-500">
                            {file.size ? `${(file.size / 1024).toFixed(1)} KB` : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Affichage de l'arbre des fichiers */}
        {fileTree.length > 0 && (
          <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <div className="max-h-96 overflow-y-auto relative">
              {/* Affichage du dossier racine avec compteur */}
              <div className="flex items-center gap-2 py-1 px-2 font-bold text-slate-800 mb-2 border-b border-slate-200 pb-2" style={{ fontFamily: '"Consolas", "DejaVu Sans Mono", "Lucida Console", "Courier New", monospace' }}>
                <div className="w-4 h-4 bg-slate-400 rounded-sm flex-shrink-0"></div>
                <span className="text-sm">{selectedFolder}/</span>
                <span className="text-xs text-slate-500">
                  {(() => {
                    const directFolders = fileTree.filter(item => item.type === 'directory').length;
                    const directFiles = fileTree.filter(item => item.type === 'file').length;
                    const parts = [];
                    if (directFolders > 0) parts.push(`${directFolders} dossier${directFolders > 1 ? 's' : ''}`);
                    if (directFiles > 0) parts.push(`${directFiles} fichier${directFiles > 1 ? 's' : ''}`);
                    return parts.length > 0 ? `(${parts.join(' - ')})` : '';
                  })()}
                </span>
              </div>
              {renderFileTree(fileTree)}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default HomePage;