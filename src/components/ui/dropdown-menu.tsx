/**
 * @fileoverview Composant dropdown menu modulaire shadcn/ui
 * @description Point d'entrée principal avec imports depuis modules séparés
 * @dependencies ./dropdown/menu, ./dropdown/items, ./dropdown/sub
 * @parent components/ui - Collection de composants UI
 * @children dropdown/* - Modules spécialisés du dropdown
 * @styling Classes Tailwind via composants modulaires
 * @accessibility Support complet via modules Radix UI
 * @performance Modules séparés pour optimisation du bundle
 * @usage Import classique depuis components/ui
 */

// Import des modules modulaires selon règles CLAUDE.md
import { 
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from "./dropdown/menu"

import {
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut
} from "./dropdown/items"

import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "./dropdown/sub"

// Export unifié pour compatibilité avec l'API shadcn/ui existante
export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}