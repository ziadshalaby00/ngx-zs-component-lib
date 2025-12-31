export type KeyType = 
| 'alert'
| 'spinner'
| 'modal'
| 'themeToggle'
| 'navbar'
| 'navbarOverlay'
| 'sideBar'
| 'scrollToTop'
| 'navItemDropdown'
| 'selectDropdown'

export type ZIndicesType = Record<KeyType, `zs:z-${number}`>

export const zIndices: ZIndicesType = {
    alert: 'zs:z-2000',
    spinner: 'zs:z-1800',
    modal: 'zs:z-1600',
    themeToggle: 'zs:z-1400',
    navbar: 'zs:z-1200',
    navbarOverlay: 'zs:z-1100',
    sideBar: 'zs:z-800',
    scrollToTop: 'zs:z-600',
    navItemDropdown: 'zs:z-200',
    selectDropdown: 'zs:z-200'
};

