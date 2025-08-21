/**
 * @fileoverview Hook pour les opérations du système de fichiers
 * @description Logique métier pour la sélection et lecture de dossiers
 * @exports useFileSystem
 */

import { useState, useCallback } from 'react';
import { FileItem, DirectoryData } from '../types';

interface UseFileSystemReturn {
  buildFileTree: (files: FileList) => FileItem[];
  buildFileTreeFromAPI: (dirHandle: any, path?: string) => Promise<FileItem[]>;
  selectDirectory: () => Promise<DirectoryData | null>;
  extractAllFiles: (items: FileItem[]) => FileItem[];
}

export const useFileSystem = (): UseFileSystemReturn => {
  const buildFileTree = useCallback((files: FileList): FileItem[] => {
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
        root.push(fileItem);
      } else {
        const parentPath = parts.slice(0, -1).join('/');
        const parent = directories.get(parentPath);
        if (parent?.children) {
          parent.children.push(fileItem);
        }
      }
    });
    
    // Construire la hiérarchie
    directories.forEach((dir, path) => {
      const parts = path.split('/');
      if (parts.length === 1) {
        root.push(dir);
      } else {
        const parentPath = parts.slice(0, -1).join('/');
        const parent = directories.get(parentPath);
        if (parent?.children) {
          parent.children.push(dir);
        }
      }
    });
    
    return sortAndNumber(root);
  }, []);

  const buildFileTreeFromAPI = useCallback(async (dirHandle: any, path: string = ''): Promise<FileItem[]> => {
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
      
      return sortAndNumber(items);
    } catch (error) {
      console.error('Erreur lecture dossier:', error);
      return [];
    }
  }, []);

  const selectDirectory = useCallback(async (): Promise<DirectoryData | null> => {
    try {
      if ('showDirectoryPicker' in window) {
        const dirHandle = await (window as any).showDirectoryPicker();
        const tree = await buildFileTreeFromAPI(dirHandle);
        const files = extractAllFiles(tree);
        return { name: dirHandle.name, files };
      }
      return null;
    } catch (error) {
      console.error('Erreur sélection dossier:', error);
      return null;
    }
  }, [buildFileTreeFromAPI]);

  const extractAllFiles = useCallback((items: FileItem[]): FileItem[] => {
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
  }, []);

  return {
    buildFileTree,
    buildFileTreeFromAPI,
    selectDirectory,
    extractAllFiles
  };
};

// Fonction utilitaire privée
const sortAndNumber = (items: FileItem[]): FileItem[] => {
  const sorted = items.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
  
  const totalCount = sorted.length;
  const paddingLength = totalCount >= 100 ? 3 : totalCount >= 10 ? 2 : 1;
  
  return sorted.map((item, index) => {
    const originalName = item.name.replace(/^\d+\.\s/, '');
    return {
      ...item,
      name: `${(index + 1).toString().padStart(paddingLength, '0')}. ${originalName}`,
      children: item.children ? sortAndNumber(item.children) : undefined
    };
  });
};