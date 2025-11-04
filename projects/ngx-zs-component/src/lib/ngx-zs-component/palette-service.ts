export type BaseSize = 'sm' | 'md' | 'lg';

export type FormStyle =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'success'
  | 'danger'
  | 'dark'
  | 'info'
  | 'violet'
  | 'teal';

// Unified palette map with all configurations
export const unifiedPaletteMap = new Map<FormStyle, {
  // Input palette
  input: {
    border: string;
    borderHover: string;
    inputBg: string;
    text: string;
  };
  // Ring palette
  ring: {
    ring: string;
  };
  // Solid Button palette
  buttonSolid: {
    btnBG: string;
    btnBGHover: string;
  };
  // Outline Button palette
  buttonOutline: {
    border: string;
    btnBGHover: string;
    text: string;
  };
  // Select palette
  select: {
    bgSelect: string;
    cleartext: string;
    cleartexthover: string;
  };
  // Checkbox / Radio Palette
  checkbox: {
    checkBoxText: string;
    checkBoxTextHover: string;
  };
  // Card Palette
  card: {
    border: string;
    borderHover: string;
  };
  // Modal Palette
  modal: {
    border: string;
    text: string;
  };
  // Page404 palette
  page404: {
    btnBG: string;
    btnBGHover: string;
    iconText: string;
  };
}>([
  [
    'secondary',
    {
      input: {
        border: 'zs:border-slate-300 zs:dark:border-slate-600',
        borderHover: 'zs:hover:border-slate-500 zs:dark:hover:border-slate-400',
        inputBg: 'zs:bg-slate-50 zs:dark:bg-slate-900',
        text: 'zs:text-slate-800 zs:dark:text-slate-300',
      },
      ring: {
        ring: 'zs:focus-within:ring-slate-400 zs:dark:focus-within:ring-slate-600',
      },
      buttonSolid: {
        btnBG: 'zs:bg-slate-500 zs:dark:bg-slate-700',
        btnBGHover: 'zs:hover:bg-slate-600',
      },
      buttonOutline: {
        border: 'zs:border-slate-500 zs:dark:border-slate-500',
        btnBGHover: 'zs:hover:bg-slate-600 zs:dark:hover:bg-slate-600',
        text: 'zs:text-slate-500 zs:dark:text-slate-500'
      },
      select: {
        bgSelect: 'zs:bg-slate-200 zs:dark:bg-slate-800',
        cleartext: 'zs:text-slate-700 zs:dark:text-slate-500',
        cleartexthover: 'zs:hover:text-slate-500 zs:dark:hover:text-slate-300',
      },
      checkbox: {
        checkBoxText: 'zs:text-slate-500 zs:dark:text-slate-700',
        checkBoxTextHover: 'zs:hover:text-slate-600',
      },
      card: {
        border: 'zs:border-slate-300 zs:dark:border-slate-700',
        borderHover: 'zs:hover:border-slate-600 zs:dark:hover:border-slate-500',
      },
      modal: {
        border: 'zs:border-slate-300 zs:dark:border-slate-600',
        text: 'zs:text-slate-800 zs:dark:text-slate-300',
      },
      page404: {
        btnBG: 'zs:bg-slate-500 zs:dark:bg-slate-700',
        btnBGHover: 'zs:hover:bg-slate-600',
        iconText: 'zs:text-slate-500 zs:dark:text-slate-700',
      },
    },
  ],
  [
    'primary',
    {
      input: {
        border: 'zs:border-blue-200 zs:dark:border-blue-700',
        borderHover: 'zs:hover:border-blue-400 zs:dark:hover:border-blue-500',
        inputBg: 'zs:bg-white zs:dark:bg-slate-900',
        text: 'zs:text-blue-900 zs:dark:text-blue-100',
      },
      ring: {
        ring: 'zs:focus-within:ring-blue-400 zs:dark:focus-within:ring-blue-500',
      },
      buttonSolid: {
        btnBG: 'zs:bg-blue-500 zs:dark:bg-blue-700',
        btnBGHover: 'zs:hover:bg-blue-600',
      },
      buttonOutline: {
        border: 'zs:border-blue-500 zs:dark:border-blue-600',
        btnBGHover: 'zs:hover:bg-blue-600',
        text: 'zs:text-blue-500 zs:dark:text-blue-500'
      },
      select: {
        bgSelect: 'zs:bg-blue-200 zs:dark:bg-blue-800',
        cleartext: 'zs:text-blue-800 zs:dark:text-blue-500',
        cleartexthover: 'zs:hover:text-blue-600 zs:dark:hover:text-blue-300',
      },
      checkbox: {
        checkBoxText: 'zs:text-blue-500 zs:dark:text-blue-700',
        checkBoxTextHover: 'zs:hover:text-blue-600',
      },
      card: {
        border: 'zs:border-blue-300 zs:dark:border-blue-700',
        borderHover: 'zs:hover:border-blue-600 zs:dark:hover:border-blue-500',
      },
      modal: {
        border: 'zs:border-blue-200 zs:dark:border-blue-700',
        text: 'zs:text-blue-900 zs:dark:text-blue-100',
      },
      page404: {
        btnBG: 'zs:bg-blue-500 zs:dark:bg-blue-700',
        btnBGHover: 'zs:hover:bg-blue-600',
        iconText: 'zs:text-blue-500 zs:dark:text-blue-700',
      },
    },
  ],
  [
    'success',
    {
      input: {
        border: 'zs:border-green-300 zs:dark:border-green-600',
        borderHover: 'zs:hover:border-green-500 zs:dark:hover:border-green-400',
        inputBg: 'zs:bg-white zs:dark:bg-slate-900',
        text: 'zs:text-green-800 zs:dark:text-green-300',
      },
      ring: {
        ring: 'zs:focus-within:ring-green-400 zs:dark:focus-within:ring-green-600',
      },
      buttonSolid: {
        btnBG: 'zs:bg-green-500 zs:dark:bg-green-700',
        btnBGHover: 'zs:hover:bg-green-600',
      },
      buttonOutline: {
        border: 'zs:border-green-500 zs:dark:border-green-600',
        btnBGHover: 'zs:hover:bg-green-600',
        text: 'zs:text-green-500 zs:dark:text-green-600'
      },
      select: {
        bgSelect: 'zs:bg-green-200 zs:dark:bg-green-800',
        cleartext: 'zs:text-green-800 zs:dark:text-green-500',
        cleartexthover: 'zs:hover:text-green-600 zs:dark:hover:text-green-300',
      },
      checkbox: {
        checkBoxText: 'zs:text-green-500 zs:dark:text-green-700',
        checkBoxTextHover: 'zs:hover:text-green-600',
      },
      card: {
        border: 'zs:border-green-300 zs:dark:border-green-700',
        borderHover: 'zs:hover:border-green-600 zs:dark:hover:border-green-500',
      },
      modal: {
        border: 'zs:border-green-300 zs:dark:border-green-600',
        text: 'zs:text-green-800 zs:dark:text-green-300',
      },
      page404: {
        btnBG: 'zs:bg-green-500 zs:dark:bg-green-700',
        btnBGHover: 'zs:hover:bg-green-600',
        iconText: 'zs:text-green-500 zs:dark:text-green-700',
      },
    },
  ],
  [
    'danger',
    {
      input: {
        border: 'zs:border-red-300 zs:dark:border-red-600',
        borderHover: 'zs:hover:border-red-500 zs:dark:hover:border-red-400',
        inputBg: 'zs:bg-white zs:dark:bg-slate-900',
        text: 'zs:text-red-800 zs:dark:text-red-300',
      },
      ring: {
        ring: 'zs:focus-within:ring-red-400 zs:dark:focus-within:ring-red-600',
      },
      buttonSolid: {
        btnBG: 'zs:bg-red-500 zs:dark:bg-red-700',
        btnBGHover: 'zs:hover:bg-red-600',
      },
      buttonOutline: {
        border: 'zs:border-red-500 zs:dark:border-red-600',
        btnBGHover: 'zs:hover:bg-red-600',
        text: 'zs:text-red-500 zs:dark:text-red-600'
      },
      select: {
        bgSelect: 'zs:bg-red-200 zs:dark:bg-red-800',
        cleartext: 'zs:text-red-800 zs:dark:text-red-500',
        cleartexthover: 'zs:hover:text-red-600 zs:dark:hover:text-red-300',
      },
      checkbox: {
        checkBoxText: 'zs:text-red-500 zs:dark:text-red-700',
        checkBoxTextHover: 'zs:hover:text-red-600',
      },
      card: {
        border: 'zs:border-red-300 zs:dark:border-red-700',
        borderHover: 'zs:hover:border-red-600 zs:dark:hover:border-red-500',
      },
      modal: {
        border: 'zs:border-red-300 zs:dark:border-red-600',
        text: 'zs:text-red-800 zs:dark:text-red-300',
      },
      page404: {
        btnBG: 'zs:bg-red-500 zs:dark:bg-red-700',
        btnBGHover: 'zs:hover:bg-red-600',
        iconText: 'zs:text-red-500 zs:dark:text-red-700',
      },
    },
  ],
  [
    'warning',
    {
      input: {
        border: 'zs:border-yellow-300 zs:dark:border-yellow-600',
        borderHover: 'zs:hover:border-yellow-500 zs:dark:hover:border-yellow-400',
        inputBg: 'zs:bg-white zs:dark:bg-slate-900',
        text: 'zs:text-amber-800 zs:dark:text-amber-300',
      },
      ring: {
        ring: 'zs:focus-within:ring-yellow-400 zs:dark:focus-within:ring-yellow-600',
      },
      buttonSolid: {
        btnBG: 'zs:bg-amber-500 zs:dark:bg-amber-700',
        btnBGHover: 'zs:hover:bg-amber-600',
      },
      buttonOutline: {
        border: 'zs:border-amber-500 zs:dark:border-amber-600',
        btnBGHover: 'zs:hover:bg-amber-600',
        text: 'zs:text-amber-500 zs:dark:text-amber-600'
      },
      select: {
        bgSelect: 'zs:bg-amber-200 zs:dark:bg-amber-800',
        cleartext: 'zs:text-amber-800 zs:dark:text-amber-500',
        cleartexthover: 'zs:hover:text-amber-600 zs:dark:hover:text-amber-300',
      },
      checkbox: {
        checkBoxText: 'zs:text-amber-500 zs:dark:text-amber-700',
        checkBoxTextHover: 'zs:hover:text-amber-600',
      },
      card: {
        border: 'zs:border-yellow-300 zs:dark:border-yellow-700',
        borderHover: 'zs:hover:border-yellow-600 zs:dark:hover:border-yellow-500',
      },
      modal: {
        border: 'zs:border-yellow-300 zs:dark:border-yellow-600',
        text: 'zs:text-amber-800 zs:dark:text-amber-300',
      },
      page404: {
        btnBG: 'zs:bg-amber-500 zs:dark:bg-amber-700',
        btnBGHover: 'zs:hover:bg-amber-600',
        iconText: 'zs:text-amber-500 zs:dark:text-amber-700',
      },
    },
  ],
  [
    'info',
    {
      input: {
        border: 'zs:border-cyan-300 zs:dark:border-cyan-600',
        borderHover: 'zs:hover:border-cyan-500 zs:dark:hover:border-cyan-400',
        inputBg: 'zs:bg-white zs:dark:bg-slate-900',
        text: 'zs:text-cyan-800 zs:dark:text-cyan-300',
      },
      ring: {
        ring: 'zs:focus-within:ring-cyan-400 zs:dark:focus-within:ring-cyan-600',
      },
      buttonSolid: {
        btnBG: 'zs:bg-cyan-500 zs:dark:bg-cyan-700',
        btnBGHover: 'zs:hover:bg-cyan-600',
      },
      buttonOutline: {
        border: 'zs:border-cyan-500 zs:dark:border-cyan-600',
        btnBGHover: 'zs:hover:bg-cyan-600',
        text: 'zs:text-cyan-500 zs:dark:text-cyan-600'
      },
      select: {
        bgSelect: 'zs:bg-cyan-200 zs:dark:bg-cyan-800',
        cleartext: 'zs:text-cyan-800 zs:dark:text-cyan-500',
        cleartexthover: 'zs:hover:text-cyan-600 zs:dark:hover:text-cyan-300',
      },
      checkbox: {
        checkBoxText: 'zs:text-cyan-500 zs:dark:text-cyan-700',
        checkBoxTextHover: 'zs:hover:text-cyan-600',
      },
      card: {
        border: 'zs:border-cyan-300 zs:dark:border-cyan-700',
        borderHover: 'zs:hover:border-cyan-600 zs:dark:hover:border-cyan-500',
      },
      modal: {
        border: 'zs:border-cyan-300 zs:dark:border-cyan-600',
        text: 'zs:text-cyan-800 zs:dark:text-cyan-300',
      },
      page404: {
        btnBG: 'zs:bg-cyan-500 zs:dark:bg-cyan-700',
        btnBGHover: 'zs:hover:bg-cyan-600',
        iconText: 'zs:text-cyan-500 zs:dark:text-cyan-700',
      },
    },
  ],
  [
    'dark',
    {
      input: {
        border: 'zs:border-slate-900 zs:dark:border-slate-700',
        borderHover: 'zs:hover:border-gray-500 zs:dark:hover:border-slate-500',
        inputBg: 'zs:bg-slate-300 zs:dark:bg-slate-900',
        text: 'zs:text-slate-900 zs:dark:text-slate-300',
      },
      ring: {
        ring: 'zs:focus-within:ring-slate-700 zs:dark:focus-within:ring-slate-600',
      },
      buttonSolid: {
        btnBG: 'zs:bg-slate-900 zs:dark:bg-slate-700',
        btnBGHover: 'zs:hover:bg-slate-800 zs:dark:hover:bg-slate-700/70',
      },
      buttonOutline: {
        border: 'zs:border-slate-900 zs:dark:border-slate-500',
        btnBGHover: 'zs:hover:bg-slate-800 zs:dark:hover:bg-slate-700/70',
        text: 'zs:text-slate-900 zs:dark:text-slate-500'
      },
      select: {
        bgSelect: 'zs:bg-slate-400 zs:dark:bg-slate-800',
        cleartext: 'zs:text-slate-700 zs:dark:text-slate-500',
        cleartexthover: 'zs:hover:text-slate-900 zs:dark:hover:text-slate-700',
      },
      checkbox: {
        checkBoxText: 'zs:text-slate-900 zs:dark:text-slate-700',
        checkBoxTextHover: 'zs:hover:text-slate-700/70',
      },
      card: {
        border: 'zs:border-slate-900 zs:dark:border-slate-700',
        borderHover: 'zs:hover:border-gray-600 zs:dark:hover:border-slate-500',
      },
      modal: {
        border: 'zs:border-slate-900 zs:dark:border-slate-700',
        text: 'zs:text-slate-900 zs:dark:text-slate-300',
      },
      page404: {
        btnBG: 'zs:bg-slate-900 zs:dark:bg-slate-700',
        btnBGHover: 'zs:hover:bg-slate-800 zs:dark:hover:bg-slate-700/70',
        iconText: 'zs:text-slate-900 zs:dark:text-slate-700',
      },
    },
  ],
  [
    'violet',
    {
      input: {
        border: 'zs:border-violet-300 zs:dark:border-violet-600',
        borderHover: 'zs:hover:border-violet-500 zs:dark:hover:border-violet-400',
        inputBg: 'zs:bg-white zs:dark:bg-slate-900',
        text: 'zs:text-violet-800 zs:dark:text-violet-300',
      },
      ring: {
        ring: 'zs:focus-within:ring-violet-400 zs:dark:focus-within:ring-violet-600',
      },
      buttonSolid: {
        btnBG: 'zs:bg-violet-500 zs:dark:bg-violet-700',
        btnBGHover: 'zs:hover:bg-violet-600',
      },
      buttonOutline: {
        border: 'zs:border-violet-500 zs:dark:border-violet-600',
        btnBGHover: 'zs:hover:bg-violet-600',
        text: 'zs:text-violet-500 zs:dark:text-violet-600'
      },
      select: {
        bgSelect: 'zs:bg-violet-200 zs:dark:bg-violet-800',
        cleartext: 'zs:text-violet-800 zs:dark:text-violet-500',
        cleartexthover: 'zs:hover:text-violet-600 zs:dark:hover:text-violet-300',
      },
      checkbox: {
        checkBoxText: 'zs:text-violet-500 zs:dark:text-violet-700',
        checkBoxTextHover: 'zs:hover:text-violet-600',
      },
      card: {
        border: 'zs:border-violet-300 zs:dark:border-violet-700',
        borderHover: 'zs:hover:border-violet-600 zs:dark:hover:border-violet-500',
      },
      modal: {
        border: 'zs:border-violet-300 zs:dark:border-violet-600',
        text: 'zs:text-violet-800 zs:dark:text-violet-300',
      },
      page404: {
        btnBG: 'zs:bg-violet-500 zs:dark:bg-violet-700',
        btnBGHover: 'zs:hover:bg-violet-600',
        iconText: 'zs:text-violet-500 zs:dark:text-violet-700',
      },
    },
  ],
  [
    'teal',
    {
      input: {
        border: 'zs:border-teal-300 zs:dark:border-teal-600',
        borderHover: 'zs:hover:border-teal-500 zs:dark:hover:border-teal-400',
        inputBg: 'zs:bg-white zs:dark:bg-slate-900',
        text: 'zs:text-teal-800 zs:dark:text-teal-300',
      },
      ring: {
        ring: 'zs:focus-within:ring-teal-400 zs:dark:focus-within:ring-teal-600',
      },
      buttonSolid: {
        btnBG: 'zs:bg-teal-500 zs:dark:bg-teal-700',
        btnBGHover: 'zs:hover:bg-teal-600',
      },
      buttonOutline: {
        border: 'zs:border-teal-500 zs:dark:border-teal-600',
        btnBGHover: 'zs:hover:bg-teal-600',
        text: 'zs:text-teal-500 zs:dark:text-teal-600'
      },
      select: {
        bgSelect: 'zs:bg-teal-200 zs:dark:bg-teal-800',
        cleartext: 'zs:text-teal-800 zs:dark:text-teal-500',
        cleartexthover: 'zs:hover:text-teal-600 zs:dark:hover:text-teal-300',
      },
      checkbox: {
        checkBoxText: 'zs:text-teal-500 zs:dark:text-teal-700',
        checkBoxTextHover: 'zs:hover:text-teal-600',
      },
      card: {
        border: 'zs:border-teal-300 zs:dark:border-teal-700',
        borderHover: 'zs:hover:border-teal-600 zs:dark:hover:border-teal-500',
      },
      modal: {
        border: 'zs:border-teal-300 zs:dark:border-teal-600',
        text: 'zs:text-teal-800 zs:dark:text-teal-300',
      },
      page404: {
        btnBG: 'zs:bg-teal-500 zs:dark:bg-teal-700',
        btnBGHover: 'zs:hover:bg-teal-600',
        iconText: 'zs:text-teal-500 zs:dark:text-teal-700',
      },
    },
  ],
]);

// Helper functions for backward compatibility
export const inputPaletteMap = new Map(Array.from(unifiedPaletteMap).map(([key, value]) => [key, value.input]));
export const ringPaletteMap = new Map(Array.from(unifiedPaletteMap).map(([key, value]) => [key, value.ring]));
export const buttonSolidPaletteMap = new Map(Array.from(unifiedPaletteMap).map(([key, value]) => [key, value.buttonSolid]));
export const buttonOutlinePaletteMap = new Map(Array.from(unifiedPaletteMap).map(([key, value]) => [key, value.buttonOutline]));
export const selectPaletteMap = new Map(Array.from(unifiedPaletteMap).map(([key, value]) => [key, value.select]));
export const checkboxTextPaletteMap = new Map(Array.from(unifiedPaletteMap).map(([key, value]) => [key, value.checkbox]));
export const cardPaletteMap = new Map(Array.from(unifiedPaletteMap).map(([key, value]) => [key, value.card]));
export const modalPaletteMap = new Map(Array.from(unifiedPaletteMap).map(([key, value]) => [key, value.modal]));
export const page404PaletteMap = new Map(Array.from(unifiedPaletteMap).map(([key, value]) => [key, value.page404]));

// ==================================================================================
// ==================================================================================

export type BaseColors =
  | 'slate' | 'gray'   | 'zinc'    | 'neutral' | 'stone'
  | 'red'   | 'orange' | 'amber'   | 'yellow'  | 'rose'
  | 'lime'  | 'green'  | 'emerald' | 'teal'
  | 'cyan'  | 'sky'    | 'blue'    | 'indigo'
  | 'violet'| 'purple' | 'fuchsia' | 'pink';

export type BaseColorPrefixes = 'text' | 'bg' | 'border';

export const ColorMapping: Map<BaseColors, Record<BaseColorPrefixes, string>> = new Map([
  ['slate',   { text: 'zs:text-slate-600 zs:dark:text-slate-400',     bg: 'zs:bg-slate-600 zs:dark:bg-slate-400',     border: 'zs:border-slate-600 zs:dark:border-slate-400'      }],
  ['gray',    { text: 'zs:text-gray-600 zs:dark:text-gray-400',       bg: 'zs:bg-gray-600 zs:dark:bg-gray-400',       border: 'zs:border-gray-600 zs:dark:border-gray-400'        }],
  ['zinc',    { text: 'zs:text-zinc-600 zs:dark:text-zinc-400',       bg: 'zs:bg-zinc-600 zs:dark:bg-zinc-400',       border: 'zs:border-zinc-600 zs:dark:border-zinc-400'        }],
  ['neutral', { text: 'zs:text-neutral-600 zs:dark:text-neutral-400', bg: 'zs:bg-neutral-600 zs:dark:bg-neutral-400', border: 'zs:border-neutral-600 zs:dark:border-neutral-400'  }],
  ['stone',   { text: 'zs:text-stone-600 zs:dark:text-stone-400',     bg: 'zs:bg-stone-600 zs:dark:bg-stone-400',     border: 'zs:border-stone-600 zs:dark:border-stone-400'      }],
  ['red',     { text: 'zs:text-red-600 zs:dark:text-red-400',         bg: 'zs:bg-red-600 zs:dark:bg-red-400',         border: 'zs:border-red-600 zs:dark:border-red-400'          }],
  ['orange',  { text: 'zs:text-orange-600 zs:dark:text-orange-400',   bg: 'zs:bg-orange-600 zs:dark:bg-orange-400',   border: 'zs:border-orange-600 zs:dark:border-orange-400'    }],
  ['amber',   { text: 'zs:text-amber-600 zs:dark:text-amber-400',     bg: 'zs:bg-amber-600 zs:dark:bg-amber-400',     border: 'zs:border-amber-600 zs:dark:border-amber-400'      }],
  ['yellow',  { text: 'zs:text-yellow-600 zs:dark:text-yellow-400',   bg: 'zs:bg-yellow-600 zs:dark:bg-yellow-400',   border: 'zs:border-yellow-600 zs:dark:border-yellow-400'    }],
  ['lime',    { text: 'zs:text-lime-600 zs:dark:text-lime-400',       bg: 'zs:bg-lime-600 zs:dark:bg-lime-400',       border: 'zs:border-lime-600 zs:dark:border-lime-400'        }],
  ['green',   { text: 'zs:text-green-600 zs:dark:text-green-400',     bg: 'zs:bg-green-600 zs:dark:bg-green-400',     border: 'zs:border-green-600 zs:dark:border-green-400'      }],
  ['emerald', { text: 'zs:text-emerald-600 zs:dark:text-emerald-400', bg: 'zs:bg-emerald-600 zs:dark:bg-emerald-400', border: 'zs:border-emerald-600 zs:dark:border-emerald-400'  }],
  ['teal',    { text: 'zs:text-teal-600 zs:dark:text-teal-400',       bg: 'zs:bg-teal-600 zs:dark:bg-teal-400',       border: 'zs:border-teal-600 zs:dark:border-teal-400'        }],
  ['cyan',    { text: 'zs:text-cyan-600 zs:dark:text-cyan-400',       bg: 'zs:bg-cyan-600 zs:dark:bg-cyan-400',       border: 'zs:border-cyan-600 zs:dark:border-cyan-400'        }],
  ['sky',     { text: 'zs:text-sky-600 zs:dark:text-sky-400',         bg: 'zs:bg-sky-600 zs:dark:bg-sky-400',         border: 'zs:border-sky-600 zs:dark:border-sky-400'          }],
  ['blue',    { text: 'zs:text-blue-600 zs:dark:text-blue-400',       bg: 'zs:bg-blue-600 zs:dark:bg-blue-400',       border: 'zs:border-blue-600 zs:dark:border-blue-400'        }],
  ['indigo',  { text: 'zs:text-indigo-600 zs:dark:text-indigo-400',   bg: 'zs:bg-indigo-600 zs:dark:bg-indigo-400',   border: 'zs:border-indigo-600 zs:dark:border-indigo-400'    }],
  ['violet',  { text: 'zs:text-violet-600 zs:dark:text-violet-400',   bg: 'zs:bg-violet-600 zs:dark:bg-violet-400',   border: 'zs:border-violet-600 zs:dark:border-violet-400'    }],
  ['purple',  { text: 'zs:text-purple-600 zs:dark:text-purple-400',   bg: 'zs:bg-purple-600 zs:dark:bg-purple-400',   border: 'zs:border-purple-600 zs:dark:border-purple-400'    }],
  ['fuchsia', { text: 'zs:text-fuchsia-600 zs:dark:text-fuchsia-400', bg: 'zs:bg-fuchsia-600 zs:dark:bg-fuchsia-400', border: 'zs:border-fuchsia-600 zs:dark:border-fuchsia-400'  }],
  ['pink',    { text: 'zs:text-pink-600 zs:dark:text-pink-400',       bg: 'zs:bg-pink-600 zs:dark:bg-pink-400',       border: 'zs:border-pink-600 zs:dark:border-pink-400'        }],
  ['rose',    { text: 'zs:text-rose-600 zs:dark:text-rose-400',       bg: 'zs:bg-rose-600 zs:dark:bg-rose-400',       border: 'zs:border-rose-600 zs:dark:border-rose-400'        }],
]);
