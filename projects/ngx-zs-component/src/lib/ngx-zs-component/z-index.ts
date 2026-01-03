export type KeyType = 
| 'alert'
| 'spinner'
| 'modal'
| 'themeToggle'
| 'navbar'
| 'navbarOverlay'
| 'sideBar'
| 'sideBarOverlay'
| 'scrollToTop'
| 'navItemDropdown'
| 'selectDropdown'

export type ZIndicesType = Record<KeyType, `zs:z-${number}`>

export const zIndices: ZIndicesType = {
    alert: 'zs:z-2200',
    spinner: 'zs:z-2000',
    modal: 'zs:z-1800',
    themeToggle: 'zs:z-1600',
    navbar: 'zs:z-1400',
    navbarOverlay: 'zs:z-1300',
    sideBar: 'zs:z-1200',
    sideBarOverlay: 'zs:z-1100',
    scrollToTop: 'zs:z-800',
    navItemDropdown: 'zs:z-200',
    selectDropdown: 'zs:z-200'
};

