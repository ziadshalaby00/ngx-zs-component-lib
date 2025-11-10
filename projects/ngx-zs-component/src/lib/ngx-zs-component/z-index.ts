export type KeyType = 
| 'alert'
| 'spinner'
| 'modal'
| 'themeToggle'
| 'navbar'
| 'sideBar'
| 'scrollToTop'
| 'navItemDropdown'
| 'selectDropdown'

export type ZIndicesType = Record<KeyType, `zs:z-${number}`>

export const zIndices: ZIndicesType = {
    alert: 'zs:z-1800',
    spinner: 'zs:z-1600',
    modal: 'zs:z-1400',
    themeToggle: 'zs:z-1200',
    navbar: 'zs:z-1000',
    sideBar: 'zs:z-800',
    scrollToTop: 'zs:z-600',
    navItemDropdown: 'zs:z-200',
    selectDropdown: 'zs:z-200'
};

