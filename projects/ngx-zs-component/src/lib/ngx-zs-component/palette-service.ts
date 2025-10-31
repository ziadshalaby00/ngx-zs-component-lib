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

export interface FormPaletteEntry {
  border: string;
  borderHover: string;

  inputBg: string;
  bgSelect: string;
  ring: string;

  btnBG: string;
  btnBGHover: string;

  text: string;
  textHover: string;

  checkBoxText?: string;
  checkBoxTextHover?: string;
}

export const FormPaletteMap = new Map<FormStyle, FormPaletteEntry>([
  [
    'secondary',
    {
      border: 'zs:border-slate-300 zs:dark:border-slate-600',
      borderHover: 'zs:hover:border-slate-500 zs:dark:hover:border-slate-400',

      inputBg: 'zs:bg-slate-50 zs:dark:bg-slate-900',
      ring: 'zs:focus-within:ring-slate-400 zs:dark:focus-within:ring-slate-600',

      bgSelect: 'zs:bg-slate-200 zs:dark:bg-slate-800',

      text: 'zs:text-slate-800 zs:dark:text-slate-300',
      textHover: 'zs:hover:text-slate-700 zs:dark:hover:text-slate-400',

      btnBG: 'zs:bg-slate-500 zs:dark:bg-slate-700',
      btnBGHover: 'zs:hover:bg-slate-600',

      checkBoxText: 'zs:text-slate-500 zs:dark:text-slate-700',
      checkBoxTextHover: 'zs:hover:text-slate-600',
    },
  ],
  [
    'primary',
    {
      border: 'zs:border-blue-200 zs:dark:border-blue-700',
      borderHover: 'zs:hover:border-blue-400 zs:dark:hover:border-blue-500',

      inputBg: 'zs:bg-white zs:dark:bg-slate-900',
      ring: 'zs:focus-within:ring-blue-400 zs:dark:focus-within:ring-blue-500',

      bgSelect: 'zs:bg-blue-200 zs:dark:bg-blue-800',

      text: 'zs:text-blue-900 zs:dark:text-blue-100',
      textHover: 'zs:hover:text-blue-700 zs:dark:hover:text-blue-300',

      btnBG: 'zs:bg-blue-500 zs:dark:bg-blue-700',
      btnBGHover: 'zs:hover:bg-blue-600',
      
      checkBoxText: 'zs:text-blue-500 zs:dark:text-blue-700',
      checkBoxTextHover: 'zs:hover:text-blue-600',
    },
  ],
  [
    'success',
    {
      border: 'zs:border-green-300 zs:dark:border-green-600',
      borderHover: 'zs:hover:border-green-500 zs:dark:hover:border-green-400',

      inputBg: 'zs:bg-white zs:dark:bg-slate-900',
      ring: 'zs:focus-within:ring-green-400 zs:dark:focus-within:ring-green-600',

      bgSelect: 'zs:bg-green-200 zs:dark:bg-green-800',

      text: 'zs:text-green-800 zs:dark:text-green-300',
      textHover: 'zs:hover:text-green-700 zs:dark:hover:text-green-400',

      btnBG: 'zs:bg-green-500 zs:dark:bg-green-700',
      btnBGHover: 'zs:hover:bg-green-600',

      checkBoxText: 'zs:text-green-500 zs:dark:text-green-700',
      checkBoxTextHover: 'zs:hover:text-green-600',
    },
  ],
  [
    'danger',
    {
      border: 'zs:border-red-300 zs:dark:border-red-600',
      borderHover: 'zs:hover:border-red-500 zs:dark:hover:border-red-400',

      inputBg: 'zs:bg-white zs:dark:bg-slate-900',
      ring: 'zs:focus-within:ring-red-400 zs:dark:focus-within:ring-red-600',

      bgSelect: 'zs:bg-red-200 zs:dark:bg-red-800',

      text: 'zs:text-red-800 zs:dark:text-red-300',
      textHover: 'zs:hover:text-red-700 zs:dark:hover:text-red-400',

      btnBG: 'zs:bg-red-500 zs:dark:bg-red-700',
      btnBGHover: 'zs:hover:bg-red-600',

      checkBoxText: 'zs:text-red-500 zs:dark:text-red-700',
      checkBoxTextHover: 'zs:hover:text-red-600',
    },
  ],
  [
    'warning',
    {
      border: 'zs:border-yellow-300 zs:dark:border-yellow-600',
      borderHover: 'zs:hover:border-yellow-500 zs:dark:hover:border-yellow-400',

      inputBg: 'zs:bg-white zs:dark:bg-slate-900',
      ring: 'zs:focus-within:ring-yellow-400 zs:dark:focus-within:ring-yellow-600',

      bgSelect: 'zs:bg-amber-200 zs:dark:bg-amber-800',

      text: 'zs:text-amber-800 zs:dark:text-amber-300',
      textHover: 'zs:hover:text-amber-700 zs:dark:hover:text-amber-400',

      btnBG: 'zs:bg-amber-500 zs:dark:bg-amber-700',
      btnBGHover: 'zs:hover:bg-amber-600',

      checkBoxText: 'zs:text-amber-500 zs:dark:text-amber-700',
      checkBoxTextHover: 'zs:hover:text-amber-600',
    },
  ],
  [
    'info',
    {
      border: 'zs:border-cyan-300 zs:dark:border-cyan-600',
      borderHover: 'zs:hover:border-cyan-500 zs:dark:hover:border-cyan-400',

      inputBg: 'zs:bg-white zs:dark:bg-slate-900',
      ring: 'zs:focus-within:ring-cyan-400 zs:dark:focus-within:ring-cyan-600',

      bgSelect: 'zs:bg-cyan-200 zs:dark:bg-cyan-800',

      text: 'zs:text-cyan-800 zs:dark:text-cyan-300',
      textHover: 'zs:hover:text-cyan-700 zs:dark:hover:text-cyan-400',

      btnBG: 'zs:bg-cyan-500 zs:dark:bg-cyan-700',
      btnBGHover: 'zs:hover:bg-cyan-600',

      checkBoxText: 'zs:text-cyan-500 zs:dark:text-cyan-700',
      checkBoxTextHover: 'zs:hover:text-cyan-600',
    },
  ],
  [
    'dark',
    {
      border: 'zs:border-slate-900 zs:dark:border-slate-700',
      borderHover: 'zs:hover:border-gray-500 zs:dark:hover:border-slate-500',

      inputBg: 'zs:bg-slate-300 zs:dark:bg-slate-900',
      ring: 'zs:focus-within:ring-slate-700 zs:dark:focus-within:ring-slate-600',

      bgSelect: 'zs:bg-slate-400 zs:dark:bg-slate-800',

      text: 'zs:text-slate-900 zs:dark:text-slate-300',
      textHover: 'zs:hover:text-slate-700 zs:dark:hover:text-slate-400',

      btnBG: 'zs:bg-slate-900 zs:dark:bg-slate-700',
      btnBGHover: 'zs:hover:bg-slate-800',

      checkBoxText: 'zs:text-slate-900 zs:dark:text-slate-700',
      checkBoxTextHover: 'zs:hover:text-slate-800'
    },
  ],
  [
    'violet',
    {
      border: 'zs:border-violet-300 zs:dark:border-violet-600',
      borderHover: 'zs:hover:border-violet-500 zs:dark:hover:border-violet-400',

      inputBg: 'zs:bg-white zs:dark:bg-slate-900',
      ring: 'zs:focus-within:ring-violet-400 zs:dark:focus-within:ring-violet-600',

      bgSelect: 'zs:bg-violet-200 zs:dark:bg-violet-800',

      text: 'zs:text-violet-800 zs:dark:text-violet-300',
      textHover: 'zs:hover:text-violet-700 zs:dark:hover:text-violet-400',

      btnBG: 'zs:bg-violet-500 zs:dark:bg-violet-700',
      btnBGHover: 'zs:hover:bg-violet-600',

      checkBoxText: 'zs:text-violet-500 zs:dark:text-violet-700',
      checkBoxTextHover: 'zs:hover:text-violet-600',
    },
  ],
  [
    'teal',
    {
      border: 'zs:border-teal-300 zs:dark:border-teal-600',
      borderHover: 'zs:hover:border-teal-500 zs:dark:hover:border-teal-400',

      inputBg: 'zs:bg-white zs:dark:bg-slate-900',
      ring: 'zs:focus-within:ring-teal-400 zs:dark:focus-within:ring-teal-600',

      bgSelect: 'zs:bg-teal-200 zs:dark:bg-teal-800',

      text: 'zs:text-teal-800 zs:dark:text-teal-300',
      textHover: 'zs:hover:text-teal-700 zs:dark:hover:text-teal-400',

      btnBG: 'zs:bg-teal-500 zs:dark:bg-teal-700',
      btnBGHover: 'zs:hover:bg-teal-600',

      checkBoxText: 'zs:text-teal-500 zs:dark:text-teal-700',
      checkBoxTextHover: 'zs:hover:text-teal-600',
    },
  ],
]);

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
