/**
 * @fileoverview Types TypeScript pour l'internationalisation
 * @description Types centralisés pour l'i18n avec sécurité des types
 * @exports Language, TranslationKeys, TranslationValues
 */

export type Language = 'fr' | 'en';

export interface TranslationValues {
  // Interface utilisateur
  ui: {
    title: string;
    subtitle: string;
    buttons: {
      select: string;
      selectFolderA: string;
      selectFolderB: string;
      selectSingle: string;
      compare: string;
      reset: string;
      export: string;
      download: string;
      back: string;
      close: string;
      open: string;
      change: string;
    };
    labels: {
      folderA: string;
      folderB: string;
      singleFolder: string;
      commonFiles: string;
      uniqueFiles: string;
      totalFiles: string;
      selected: string;
      notSelected: string;
      ready: string;
    };
    messages: {
      readyToCompare: string;
      selectFoldersToStart: string;
      noCommonFiles: string;
      comparisonComplete: string;
      errorSelectingFolder: string;
    };
  };

  // Accessibilité
  accessibility: {
    folderSelectA: string;
    folderSelectB: string;
    folderSelectSingle: string;
    backToWelcome: string;
    compare: string;
    reset: string;
    expand: string;
    collapse: string;
    download: string;
    export: string;
    instagram: string;
    languageToggle: string;
    close: string;
    open: string;
    toggle: string;
  };

  // Interface de comparaison
  comparison: {
    header: {
      title: string;
      interfaceTitle: string;
      selectFolders: string;
      folderComparison: string;
    };
    columns: {
      folderA: string;
      folderB: string;
      commonFiles: string;
      uniqueA: string;
      uniqueB: string;
    };
    stats: {
      files: string;
      commonFound: string;
      totalFiles: string;
      common: string;
    };
    placeholders: {
      selectFolder: string;
      noFiles: string;
      noCommonFiles: string;
      dragDropHint: string;
      emptyFolder: string;
      folder: string;
      folders: string;
      file: string;
      files: string;
    };
    messages: {
      selectBothFolders: string;
      safeToDelete: string;
      selectFolderB: string;
      selectFolderA: string;
      folderASelected: string;
      folderBSelected: string;
      nowSelectB: string;
      nowSelectA: string;
      selectBothToFind: string;
    };
  };

  // Reports et exports
  reports: {
    titles: {
      comparisonReport: string;
      fileList: string;
      summary: string;
      results: string;
      generateReport: string;
    };
    content: {
      generatedOn: string;
      folderA: string;
      folderB: string;
      totalFiles: string;
      commonFiles: string;
      uniqueFilesA: string;
      uniqueFilesB: string;
      filePath: string;
      fileName: string;
      fileSize: string;
    };
    formats: {
      txt: string;
      csv: string;
      json: string;
      exportFormats: string;
    };
    descriptions: {
      txtDescription: string;
      csvDescription: string;
      jsonDescription: string;
    };
  };

  // Messages de log et debugging
  logs: {
    initialized: string;
    folderSelected: string;
    comparisonStarted: string;
    comparisonComplete: string;
    exportStarted: string;
    exportComplete: string;
    error: string;
    configApplied: string;
  };

  // Footer et branding
  footer: {
    madeBy: string;
    followInstagram: string;
  };
}

export type TranslationKeys = keyof TranslationValues;
export type NestedTranslationKeys = 
  | `ui.${keyof TranslationValues['ui']}`
  | `accessibility.${keyof TranslationValues['accessibility']}`
  | `comparison.${keyof TranslationValues['comparison']}`
  | `reports.${keyof TranslationValues['reports']}`
  | `logs.${keyof TranslationValues['logs']}`
  | `footer.${keyof TranslationValues['footer']}`;