/**
 * Centralized mock data — swap these imports for real API calls later.
 */

// ── Complaint tracking data ──────────────────────────────────────────
export const MOCK_COMPLAINTS = {
    'RM-2025-48291': {
        id: 'RM-2025-48291',
        title: 'Cleanliness Issue',
        icon: 'cleaning_services',
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
        category: 'Cleanliness',
        coach: 'Coach B4, Seat 22',
        train: '12951 Mumbai Rajdhani',
        filedDate: '24 Oct 2026',
        status: 'In Progress',
        statusBg: 'bg-amber-100 dark:bg-amber-900/30',
        statusColor: 'text-amber-700 dark:text-amber-400',
        priority: 'High',
        priorityColor: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        assignedTo: 'DRM Office, New Delhi',
        lastUpdated: '2 hours ago',
        progress: 65,
        timeline: [
            { label: 'Complaint Filed', time: '24 Oct, 09:15 AM', done: true, active: false },
            { label: 'Under Review', time: '24 Oct, 09:45 AM', done: true, active: false },
            { label: 'In Progress', time: '24 Oct, 10:30 AM', done: false, active: true, note: 'Station Master - NDLS' },
            { label: 'Resolved', time: 'Expected by 02:00 PM', done: false, active: false },
        ],
    },
    'RM-2025-47120': {
        id: 'RM-2025-47120',
        title: 'Unauthorized Passenger Entry',
        icon: 'security',
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600',
        category: 'Security',
        coach: 'Coach S6',
        train: '12301 Howrah Rajdhani',
        filedDate: '22 Oct 2026',
        status: 'Resolved',
        statusBg: 'bg-green-100 dark:bg-green-900/30',
        statusColor: 'text-green-700 dark:text-green-400',
        priority: 'Medium',
        priorityColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        assignedTo: 'RPF Team, Howrah',
        lastUpdated: '1 day ago',
        progress: 100,
        timeline: [
            { label: 'Complaint Filed', time: '22 Oct, 07:10 AM', done: true, active: false },
            { label: 'Under Review', time: '22 Oct, 07:30 AM', done: true, active: false },
            { label: 'In Progress', time: '22 Oct, 08:00 AM', done: true, active: false, note: 'RPF Team deployed' },
            { label: 'Resolved', time: '22 Oct, 09:45 AM', done: true, active: false },
        ],
    },
}

// ── Previous complaints list ──────────────────────────────────────────
export const PREVIOUS_COMPLAINTS = [
    {
        id: 'RM-2025-47120',
        icon: 'security',
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600',
        title: 'Unauthorized Passenger Entry',
        date: '22 Oct 2026',
        status: 'Resolved',
        priority: 'Medium',
        priorityColor: 'text-blue-600',
    },
    {
        id: 'RM-2025-46001',
        icon: 'restaurant',
        iconBg: 'bg-green-100 dark:bg-green-900/30',
        iconColor: 'text-green-600',
        title: 'Meal Quality Feedback',
        date: '18 Oct 2026',
        status: 'Resolved',
        priority: 'Low',
        priorityColor: 'text-green-600',
    },
]

// ── Chat support initial messages ─────────────────────────────────────
export const INITIAL_CHAT_MESSAGES = [
    {
        id: 1,
        from: 'bot',
        text: "Hi Ramesh! 👋 We received your complaint about a cleanliness issue. The housekeeping team has been notified. Can you tell us which coach you are in?",
        time: '10:05 AM',
    },
    {
        id: 2,
        from: 'user',
        text: 'S4',
        time: '10:06 AM',
    },
    {
        id: 3,
        from: 'bot',
        text: 'Thank you! Our team is on the way. Expected resolution time is 1–2 hours. You will receive an update shortly.',
        time: '10:07 AM',
    },
]

// ── Feedback sentiments ───────────────────────────────────────────────
export const SENTIMENTS = [
    { icon: 'sentiment_very_dissatisfied', label: 'Terrible', activeColor: 'text-red-500', activeBg: 'bg-red-100' },
    { icon: 'sentiment_dissatisfied', label: 'Bad', activeColor: 'text-orange-500', activeBg: 'bg-orange-100' },
    { icon: 'sentiment_neutral', label: 'Okay', activeColor: 'text-yellow-500', activeBg: 'bg-yellow-100' },
    { icon: 'sentiment_satisfied', label: 'Good', activeColor: 'text-lime-500', activeBg: 'bg-lime-100' },
    { icon: 'sentiment_very_satisfied', label: 'Amazing', activeColor: 'text-green-500', activeBg: 'bg-green-100' },
]

// ── Profile data ──────────────────────────────────────────────────────
export const PROFILE_STATS = [
    { label: 'Total Filed', value: '12', icon: 'assignment' },
    { label: 'Resolved', value: '9', icon: 'check_circle' },
    { label: 'Pending', value: '3', icon: 'schedule' },
]

export const PROFILE_MENU_SECTIONS = [
    {
        title: 'Account',
        items: [
            { icon: 'person_edit', label: 'Edit Profile', color: 'text-blue-500', bg: 'bg-blue-50   dark:bg-blue-900/20' },
            { icon: 'lock', label: 'Change Password', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
            { icon: 'notifications', label: 'Notifications', color: 'text-amber-500', bg: 'bg-amber-50  dark:bg-amber-900/20' },
        ],
    },
    {
        title: 'Support',
        items: [
            { icon: 'help', label: 'Help & FAQ', color: 'text-teal-500', bg: 'bg-teal-50   dark:bg-teal-900/20' },
            { icon: 'policy', label: 'Privacy Policy', color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800' },
            { icon: 'info', label: 'About Rail Madad', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
        ],
    },
]

// ── File complaint methods ────────────────────────────────────────────
export const COMPLAINT_METHODS = [
    { icon: 'photo_camera', label: 'Take Photo', desc: 'Snap it', color: 'from-blue-500 to-blue-600', accept: 'image/*', capture: 'environment' },
    { icon: 'videocam', label: 'Record Video', desc: 'Film it', color: 'from-purple-500 to-purple-600', accept: 'video/*', capture: 'environment' },
    { icon: 'mic', label: 'Voice Note', desc: 'Say it', color: 'from-rose-500 to-rose-600', accept: 'audio/*', capture: null },
    { icon: 'edit_note', label: 'Type Details', desc: 'Write it', color: 'from-amber-500 to-amber-600', accept: null, capture: null },
]

// ── Complaint list config ─────────────────────────────────────────────
export const COMPLAINT_TABS = ['Active', 'Resolved', 'All']
export const COMPLAINT_FILTER_PILLS = ['All Recent', 'Cleanliness', 'Security', 'Catering']
