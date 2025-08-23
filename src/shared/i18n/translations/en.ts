/**
 * @fileoverview English translations complete
 * @description All English strings for the application
 * @exports enTranslations
 */

import { TranslationValues } from '../types';

export const enTranslations: TranslationValues = {
  ui: {
    title: "Folder Comparator",
    subtitle: "Analyze and compare your files with elegance",
    buttons: {
      select: "Select",
      selectFolderA: "Folder A",
      selectFolderB: "Folder B",
      selectSingle: "Single Folder",
      compare: "Compare",
      reset: "Reset",
      export: "Export Report",
      download: "Download",
      back: "Back",
      close: "Close",
      open: "Open",
      change: "Change"
    },
    labels: {
      folderA: "Folder A",
      folderB: "Folder B", 
      singleFolder: "Single Folder",
      commonFiles: "Common Files",
      uniqueFiles: "Unique Files",
      totalFiles: "Total Files",
      selected: "Selected",
      notSelected: "Not selected",
      ready: "Ready to Compare",
      version: "Version",
      webMode: "Web Mode"
    },
    messages: {
      readyToCompare: "Ready to Compare",
      selectFoldersToStart: "Click on the title to get started",
      noCommonFiles: "No common files found",
      comparisonComplete: "Comparison complete",
      errorSelectingFolder: "Error selecting folder"
    }
  },

  accessibility: {
    folderSelectA: "Select folder A for comparison",
    folderSelectB: "Select folder B for comparison",
    folderSelectSingle: "Select a folder to explore its content",
    backToWelcome: "Go back to welcome screen",
    compare: "Start folder comparison",
    reset: "Reset selection",
    expand: "Expand tree view",
    collapse: "Collapse tree view",
    download: "Download comparison report",
    export: "Export results",
    instagram: "Follow @vokytrg on Instagram",
    languageToggle: "Change interface language",
    close: "Close",
    open: "Open",
    toggle: "Toggle display"
  },

  comparison: {
    header: {
      title: "Folder Comparator",
      interfaceTitle: "Folder Comparison Interface",
      selectFolders: "Select folders to compare files and identify duplicates",
      folderComparison: "Folder Comparison"
    },
    columns: {
      folderA: "Folder A",
      folderB: "Folder B",
      commonFiles: "Common Files",
      uniqueA: "Unique A",
      uniqueB: "Unique B"
    },
    stats: {
      files: "files",
      commonFound: "common files found",
      totalFiles: "files total",
      common: "common"
    },
    placeholders: {
      selectFolder: "Select a folder",
      noFiles: "No files",
      noCommonFiles: "No common files",
      dragDropHint: "Drag & drop or click to select",
      emptyFolder: "Empty folder",
      folder: "folder",
      folders: "folders",
      file: "file", 
      files: "files"
    },
    messages: {
      selectBothFolders: "Select both folders to compare files",
      safeToDelete: "Files that can be safely deleted from one location",
      selectFolderB: "Select Folder B",
      selectFolderA: "Select Folder A",
      folderASelected: "selected",
      folderBSelected: "selected",
      nowSelectB: "Now select Folder B to compare",
      nowSelectA: "Now select Folder A to compare",
      selectBothToFind: "Select Folder A and Folder B to find common files between them"
    }
  },

  reports: {
    titles: {
      comparisonReport: "Comparison Report",
      fileList: "File List",
      summary: "Summary",
      results: "Folder Comparison Results",
      generateReport: "Generate Report",
      folderComparisonReport: "FOLDER COMPARISON REPORT",
      deletionRecommendations: "DELETION RECOMMENDATIONS",
      filesUniqueTo: "FILES UNIQUE TO",
      endOfReport: "END OF REPORT"
    },
    content: {
      generatedOn: "Generated on",
      generated: "Generated",
      folderA: "Folder A",
      folderB: "Folder B",
      totalFiles: "Total files",
      commonFiles: "Common files",
      uniqueFilesA: "Unique files A",
      uniqueFilesB: "Unique files B",
      filePath: "File path",
      fileName: "File name",
      fileSize: "File size",
      summary: "SUMMARY",
      filesOnlyIn: "Files only in",
      safelyDelete: "You can safely DELETE the following",
      file: "file",
      files: "files",
      noCommonFilesFound: "No common files found - nothing can be safely deleted",
      canDelete: "YES",
      cannotDelete: "NO",
      bothFolders: "Both",
      recommendation: "recommendation",
      onlyExistsIn: "This file only exists in",
      shouldNotBeDeleted: "and should NOT be deleted",
      existsInBoth: "This file exists in both folders and can be safely deleted from one location",
      folder: "Folder",
      csvHeaders: {
        type: "Type",
        fileName: "FileName",
        size: "Size",
        pathA: "PathA",
        pathB: "PathB",
        canDelete: "CanDelete",
        folder: "Folder"
      },
      csvValues: {
        common: "Common",
        unique: "Unique",
        yes: "YES",
        no: "NO",
        both: "Both"
      }
    },
    formats: {
      txt: "Text Report",
      csv: "CSV Export",
      json: "JSON Data",
      exportFormats: "Export Formats"
    },
    descriptions: {
      txtDescription: "Human-readable summary",
      csvDescription: "Spreadsheet compatible",
      jsonDescription: "Machine-readable format"
    }
  },

  logs: {
    initialized: "initialized",
    folderSelected: "Folder selected",
    comparisonStarted: "Comparison started", 
    comparisonComplete: "Comparison complete",
    exportStarted: "Export started",
    exportComplete: "Export complete",
    error: "Error",
    configApplied: "Configuration applied"
  },

  footer: {
    madeBy: "Made by",
    followInstagram: "Follow @vokytrg on Instagram"
  }
};