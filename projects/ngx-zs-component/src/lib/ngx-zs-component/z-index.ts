export type KeyType = 
| 'alert'
| 'spinner'
| 'modal'
| 'themeToggle'
| 'navbar'
| 'scrollToTop'
| 'navItemDropdown'
| 'selectDropdown'

export type ZIndicesType = Record<KeyType, `zs:z-${number}`>

export const zIndices: ZIndicesType = {
    alert: 'zs:z-1600',
    spinner: 'zs:z-1400',
    modal: 'zs:z-1200',
    themeToggle: 'zs:z-1000',
    navbar: 'zs:z-800',
    scrollToTop: 'zs:z-600',
    navItemDropdown: 'zs:z-200',
    selectDropdown: 'zs:z-200'
};

