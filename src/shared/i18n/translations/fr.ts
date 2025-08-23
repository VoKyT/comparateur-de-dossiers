/**
 * @fileoverview Traductions françaises complètes
 * @description Tous les strings en français pour l'application
 * @exports frTranslations
 */

import { TranslationValues } from '../types';

export const frTranslations: TranslationValues = {
  ui: {
    title: "Comparateur de Dossiers",
    subtitle: "Analysez et comparez vos fichiers avec élégance",
    buttons: {
      select: "Sélectionner",
      selectFolderA: "Dossier A",
      selectFolderB: "Dossier B", 
      selectSingle: "Dossier Unique",
      compare: "Comparer",
      reset: "Réinitialiser",
      export: "Exporter le Rapport",
      download: "Télécharger",
      back: "Retour",
      close: "Fermer",
      open: "Ouvrir",
      change: "Changer"
    },
    labels: {
      folderA: "Dossier A",
      folderB: "Dossier B",
      singleFolder: "Dossier Unique",
      commonFiles: "Fichiers Communs",
      uniqueFiles: "Fichiers Uniques",
      totalFiles: "Total Fichiers",
      selected: "Sélectionné",
      notSelected: "Non sélectionné",
      ready: "Prêt à Comparer",
      version: "Version",
      webMode: "Mode Web"
    },
    messages: {
      readyToCompare: "Prêt à Comparer",
      selectFoldersToStart: "Cliquez sur le titre pour commencer",
      noCommonFiles: "Aucun fichier commun trouvé",
      comparisonComplete: "Comparaison terminée",
      errorSelectingFolder: "Erreur lors de la sélection du dossier"
    }
  },

  accessibility: {
    folderSelectA: "Sélectionner le dossier A pour la comparaison",
    folderSelectB: "Sélectionner le dossier B pour la comparaison",
    folderSelectSingle: "Sélectionner un dossier pour explorer son contenu",
    backToWelcome: "Retourner à l'écran d'accueil",
    compare: "Lancer la comparaison des dossiers",
    reset: "Réinitialiser la sélection",
    expand: "Développer l'arborescence",
    collapse: "Réduire l'arborescence",
    download: "Télécharger le rapport de comparaison",
    export: "Exporter les résultats",
    instagram: "Suivre @vokytrg sur Instagram",
    languageToggle: "Changer la langue de l'interface",
    close: "Fermer",
    open: "Ouvrir",
    toggle: "Basculer l'affichage"
  },

  comparison: {
    header: {
      title: "Comparateur de Dossiers",
      interfaceTitle: "Interface de Comparaison de Dossiers",
      selectFolders: "Sélectionnez les dossiers pour comparer les fichiers et identifier les doublons",
      folderComparison: "Comparaison de Dossiers"
    },
    columns: {
      folderA: "Dossier A",
      folderB: "Dossier B",
      commonFiles: "Fichiers Communs",
      uniqueA: "Uniques A",
      uniqueB: "Uniques B"
    },
    stats: {
      files: "fichiers",
      commonFound: "fichiers communs trouvés",
      totalFiles: "fichiers au total",
      common: "communs"
    },
    placeholders: {
      selectFolder: "Sélectionner un dossier",
      noFiles: "Aucun fichier",
      noCommonFiles: "Aucun fichier commun",
      dragDropHint: "Glissez-déposez ou cliquez pour sélectionner",
      emptyFolder: "Dossier vide",
      folder: "dossier",
      folders: "dossiers", 
      file: "fichier",
      files: "fichiers"
    },
    messages: {
      selectBothFolders: "Sélectionnez les deux dossiers pour comparer les fichiers",
      safeToDelete: "Fichiers qui peuvent être supprimés en toute sécurité d'un emplacement",
      selectFolderB: "Sélectionnez le Dossier B",
      selectFolderA: "Sélectionnez le Dossier A",
      folderASelected: "sélectionné",
      folderBSelected: "sélectionné",
      nowSelectB: "Maintenant sélectionnez le Dossier B pour comparer",
      nowSelectA: "Maintenant sélectionnez le Dossier A pour comparer",
      selectBothToFind: "Sélectionnez le Dossier A et le Dossier B pour trouver les fichiers communs entre eux"
    }
  },

  reports: {
    titles: {
      comparisonReport: "Rapport de Comparaison",
      fileList: "Liste des Fichiers",
      summary: "Résumé",
      results: "Résultats de Comparaison",
      generateReport: "Générer un Rapport",
      folderComparisonReport: "RAPPORT DE COMPARAISON DE DOSSIERS",
      deletionRecommendations: "RECOMMANDATIONS DE SUPPRESSION",
      filesUniqueTo: "FICHIERS UNIQUES À",
      endOfReport: "FIN DU RAPPORT"
    },
    content: {
      generatedOn: "Généré le",
      generated: "Généré",
      folderA: "Dossier A",
      folderB: "Dossier B",
      totalFiles: "Total des fichiers",
      commonFiles: "Fichiers communs",
      uniqueFilesA: "Fichiers uniques A",
      uniqueFilesB: "Fichiers uniques B",
      filePath: "Chemin du fichier",
      fileName: "Nom du fichier",
      fileSize: "Taille du fichier",
      summary: "RÉSUMÉ",
      filesOnlyIn: "Fichiers seulement dans",
      safelyDelete: "Vous pouvez supprimer en toute sécurité les fichiers suivants d'un des dossiers",
      noCommonFilesFound: "Aucun fichier commun trouvé - rien ne peut être supprimé en toute sécurité",
      canDelete: "OUI",
      cannotDelete: "NON",
      bothFolders: "Les deux",
      recommendation: "recommandation",
      onlyExistsIn: "Ce fichier n'existe que dans",
      shouldNotBeDeleted: "et ne doit PAS être supprimé",
      existsInBoth: "Ce fichier existe dans les deux dossiers et peut être supprimé en toute sécurité d'un emplacement",
      folder: "Dossier",
      noExtension: "Pas d'extension",
      files: "fichiers",
      csvHeaders: {
        type: "Type",
        fileName: "NomFichier",
        size: "Taille",
        pathA: "CheminA",
        pathB: "CheminB",
        canDelete: "PeutSupprimer",
        folder: "Dossier"
      },
      csvValues: {
        common: "Commun",
        unique: "Unique",
        yes: "OUI",
        no: "NON",
        both: "Les deux"
      }
    },
    formats: {
      txt: "Rapport Texte",
      csv: "Export CSV",
      json: "Données JSON",
      exportFormats: "Formats d'Export"
    },
    descriptions: {
      txtDescription: "Résumé lisible par l'humain",
      csvDescription: "Compatible tableur",
      jsonDescription: "Format lisible par machine"
    }
  },

  logs: {
    initialized: "initialisé",
    folderSelected: "Dossier sélectionné",
    comparisonStarted: "Comparaison démarrée",
    comparisonComplete: "Comparaison terminée",
    exportStarted: "Export démarré",
    exportComplete: "Export terminé",
    error: "Erreur",
    configApplied: "Configuration appliquée"
  },

  footer: {
    madeBy: "Made by",
    followInstagram: "Suivre @vokytrg sur Instagram"
  }
};