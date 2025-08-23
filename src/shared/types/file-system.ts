/**
 * @fileoverview Types pour le système de fichiers et arborescence
 * @description Interfaces TypeScript pour la manipulation de fichiers et dossiers
 * @exports FileItem, FileTree, DirectoryHandle
 */

export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  children?: FileItem[];
}

export interface DirectoryData {
  name: string;
  files: FileItem[];          // Arborescence hiérarchique pour l'affichage
  allFiles: FileItem[];       // Tous les fichiers aplatis pour la comparaison
}

export type FileTree = FileItem[];