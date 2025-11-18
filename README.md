# Movies App - Next.js

A modern movie discovery application built with Next.js 15, featuring Server-Side Rendering (SSR), optimized images, and secure API key handling.

## Features

- **Server-Side Rendering (SSR)**: All pages use `getServerSideProps` for optimal SEO and performance
- **Backend API Routes**: All TMDb API calls are made from Next.js backend routes, keeping API keys secure
- **Optimized Images**: Using Next.js `Image` component for automatic image optimization
- **Trending Movies**: Browse weekly trending movies
- **Movie Search**: Search for any movie in the TMDb database
- **Movie Details**: View detailed information including cast, ratings, and more
- **Responsive Design**: Fully responsive with styled-components
- **Fast Performance**: Optimized fonts, images, and code splitting

## Tech Stack

- **Next.js 15** - React framework with SSR
- **React 18** - UI library
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **The Movie Database (TMDb) API** - Movie data source

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A TMDb API key (get one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movies
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your TMDb API token:
```env
TMDB_API_TOKEN=your_tmdb_bearer_token_here
```

**Important**: The API token is stored in `.env.local` which is gitignored. This ensures your API key is never exposed to the client or committed to version control.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
movies/
├── components/          # Reusable React components
│   ├── Header.jsx
│   ├── Loading.jsx
│   ├── MovieCard.jsx
│   ├── Pagination.jsx
│   └── ...
├── pages/
│   ├── api/            # Backend API routes (secure)
│   │   ├── movies/
│   │   │   ├── trending.js
│   │   │   ├── [id].js
│   │   │   └── [id]/cast.js
│   │   └── search.js
│   ├── movies/         # Movie pages with SSR
│   │   ├── index.js    # Trending movies
│   │   └── [id].js     # Movie details
│   ├── _app.js         # App wrapper
│   ├── _document.js    # Custom document
│   ├── index.js        # Home page
│   └── search.js       # Search results
├── public/             # Static assets
│   └── images/
├── .env.local          # Environment variables (not in git)
├── next.config.js      # Next.js configuration
└── package.json
```

## API Security

All API calls to TMDb are made from Next.js API routes (backend), not from the client:

- ✅ API token stored in `.env.local` (server-side only)
- ✅ Never exposed to browser/client
- ✅ API routes handle all external API calls
- ✅ Client components call `/api/*` endpoints

## Optimizations Implemented

1. **Server-Side Rendering**: All pages fetch data on the server for better SEO and initial load time
2. **Next.js Image Component**: Automatic image optimization, lazy loading, and responsive images
3. **Google Fonts Optimization**: Fonts loaded through Next.js for better performance
4. **Code Splitting**: Automatic code splitting by Next.js
5. **API Route Caching**: Consider implementing caching for frequently accessed data
6. **Styled Components**: CSS-in-JS with SSR support configured

## Differences from Original CRA Version

- **Removed Redux**: Simplified state management using SSR and React hooks
- **Backend API Routes**: All TMDb API calls moved to Next.js backend
- **SSR Instead of CSR**: Data fetched on server instead of client
- **Next.js Router**: Replaced react-router-dom with Next.js routing
- **Optimized Images**: Using Next.js Image instead of regular img tags
- **Removed Zendesk Pagination**: Implemented custom, lightweight pagination

## Environment Variables

Create a `.env.local` file with:

```env
# Required
TMDB_API_TOKEN=your_tmdb_bearer_token_here

# Optional (for SSR API calls)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production deployment, set `NEXT_PUBLIC_BASE_URL` to your production URL.

## License

This project is for educational purposes.

## Credits

Movie data provided by [The Movie Database (TMDb)](https://www.themoviedb.org/)
