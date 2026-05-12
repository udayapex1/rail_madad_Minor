export const COMPLAINT_METHODS = [
  {
    label: 'Camera',
    icon: 'photo_camera',
    desc: 'Capture live photo',
    color: 'from-blue-500 to-blue-600',
    accept: 'image/*',
    capture: 'environment'
  },
  {
    label: 'Video',
    icon: 'videocam',
    desc: 'Record a video',
    color: 'from-purple-500 to-purple-600',
    accept: 'video/*',
    capture: 'environment'
  },
  {
    label: 'Audio',
    icon: 'mic',
    desc: 'Voice recording',
    color: 'from-orange-500 to-orange-600',
    accept: 'audio/*',
  },
  {
    label: 'Manual',
    icon: 'edit_note',
    desc: 'Type description',
    color: 'from-slate-700 to-slate-800',
  }
]
