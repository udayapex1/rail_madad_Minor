/**
 * Single source of truth for navigation items.
 * Used by both SideNav and BottomNav.
 */

export const NAV_ITEMS = [
    { label: 'Home', icon: 'home', path: '/home', fillOnActive: true },
    { label: 'Complaints', icon: 'assignment', path: '/complaints', fillOnActive: true },
    { label: 'AI Help', icon: 'smart_toy', path: '/ai-analysis', fillOnActive: true },
    { label: 'Chat', icon: 'support_agent', path: '/chat', fillOnActive: true },
    { label: 'Profile', icon: 'person', path: '/profile', fillOnActive: true },
]

/**
 * BottomNav uses a subset of NAV_ITEMS (no Chat on mobile bottom bar).
 */
export const BOTTOM_NAV_ITEMS = NAV_ITEMS.filter(
    (item) => item.label !== 'Chat'
)
