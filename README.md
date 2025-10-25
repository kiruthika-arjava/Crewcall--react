# CrewCall React

A React web application for event collaboration and management.

## Getting Started

This project has been converted from Flutter to React.

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

### Features

- Welcome page with sign-up options
- Bottom navigation with Home, Events, and Profile tabs
- Material-UI components for consistent design
- React Router for navigation
- Local storage for tab persistence

### Project Structure

```
src/
  pages/
    WelcomePage.js     - Landing page with sign-up options
    MainNavigation.js  - Main app with bottom navigation
    HomePage.js        - Home tab content
    EventsPage.js      - Events tab content
    ProfilePage.js     - Profile tab content
  App.js              - Main app component with routing
  index.js            - React entry point
```