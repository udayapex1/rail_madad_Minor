# Rail Madad

A mobile-focused React web app for Indian Railways grievance redressal.

## Tech Stack

- **React 18** + **Vite** — fast dev server and build
- **Tailwind CSS 3** — utility-first styling
- **React Router 6** — client-side routing

## Project Structure

```
src/
├── components/
│   ├── BottomNav.jsx     # Bottom tab navigation bar
│   └── Header.jsx        # Reusable page header with optional back button
├── pages/
│   ├── WelcomeScreen.jsx  # Landing / splash
│   ├── Login.jsx          # Login form
│   ├── CreateAccount.jsx  # Registration form
│   ├── HomeDashboard.jsx  # Main dashboard
│   ├── FileComplaint.jsx  # File a new complaint
│   ├── MyComplaintsList.jsx # View & track complaints
│   ├── AIAnalysisResult.jsx # AI-powered complaint analysis
│   ├── ChatSupport.jsx    # Live chat with AI assistant
│   └── FeedbackRating.jsx # Star rating & feedback form
├── App.jsx               # Route definitions
├── main.jsx              # React entry point
└── index.css             # Tailwind directives + global styles
```

## Routes

| Path | Page |
|------|------|
| `/` | Welcome Screen |
| `/login` | Login |
| `/register` | Create Account |
| `/home` | Home Dashboard |
| `/file-complaint` | File Complaint |
| `/complaints` | My Complaints List |
| `/ai-analysis` | AI Analysis Result |
| `/chat` | Chat Support |
| `/feedback` | Feedback & Rating |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```
