# Claude Development Log

This document tracks the development work done with Claude AI on the Movies App project.

## Project Overview

A modern movie discovery application built with Next.js 16 and React 19, featuring Server-Side Rendering (SSR), secure API handling, and optimized performance.

## Recent Updates

### Vercel NOT_FOUND Error Research (2025-11-18)

**Overview**: El error `NOT_FOUND` (404) en Vercel ocurre cuando un recurso solicitado no puede ser encontrado. Esto puede suceder si el recurso fue movido, eliminado, o hay un error en la URL.

#### Causas Comunes del Error NOT_FOUND

1. **Framework Preset Incorrecto**
   - Vercel detecta automáticamente el framework, pero puede fallar
   - Solución: Dashboard → Settings → Build & Development Settings → Framework Preset = Next.js

2. **Output Directory Mal Configurado**
   - Si el Output Directory está incorrecto, Vercel sirve archivos de una carpeta incorrecta/vacía
   - Para Next.js, el output directory es `.next` (automático)
   - NO sobrescribir a menos que sea absolutamente necesario

3. **Root Directory Incorrecto**
   - Si la app Next.js está en un subdirectorio, debe configurarse en Vercel
   - Dashboard → Settings → General → Root Directory

4. **Error routes-manifest.json**
   - Este archivo se genera durante `next build`
   - Causas: Build fallido, Output Directory incorrecto, problemas de caché
   - Solución: Verificar que `next build` se ejecute correctamente

5. **vercel.json Conflictivo**
   - Configuraciones en vercel.json pueden interferir con Next.js
   - A veces eliminar vercel.json y usar valores por defecto resuelve el problema

6. **Versión de Next.js**
   - Usar 'latest' en package.json puede causar problemas
   - Mejor fijar a una versión específica (actualmente 16.0.3)

#### Pasos de Troubleshooting

1. Verificar que la URL del deployment sea correcta
2. Confirmar que el deployment existe y no fue eliminado
3. Revisar logs del deployment para identificar errores
4. Verificar permisos de acceso
5. Comprobar configuración en Dashboard de Vercel:
   - Framework Preset: Next.js
   - Node.js Version: 22.x
   - Build Command: `next build`
   - Output Directory: (vacío/default para Next.js)

#### Configuración Actual del Proyecto

**vercel.json**:
```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  }
}
```

**package.json scripts**:
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

Esta configuración es correcta para Next.js 16. El proyecto NO debe tener ningún archivo de Create React App como:
- `public/index.html`
- carpeta `src/`
- `react-scripts` en dependencies
- `serviceWorker.js`
- `reportWebVitals.js`

**Estado actual**: El proyecto está completamente migrado a Next.js 16 sin rastros de CRA.

---

### Node.js Version Configuration (2025-11-18)

**Issue**: Vercel deployment failing with error:
```
Error: Found invalid Node.js Version: "12.x". Please set Node.js Version to 18.x
```

**Solution Implemented**:
1. Added `engines` field to `package.json` specifying Node.js 22.x
2. Created `vercel.json` configuration file for Vercel deployment settings
3. Updated README.md with correct version numbers (Next.js 16, React 19)
4. Configured Vercel project settings to use Node.js 22.x

**Files Modified**:
- `package.json` - Added engines field with Node.js 22.x requirement
- `vercel.json` - New file with Vercel-specific configuration
- `README.md` - Updated tech stack versions

### Previous Updates

#### Next.js 16 and React 19 Upgrade
- Upgraded from Next.js 15 to Next.js 16.0.3
- Upgraded from React 18 to React 19.2.0
- All dependencies updated to compatible versions

#### UI/UX Improvements
- Enhanced movie page styling and layout
- Improved responsive design
- Optimized component rendering

#### Initial Next.js Setup
- Built with Next.js for Server-Side Rendering (SSR)
- Created backend API routes for secure API key handling
- Added image optimization with Next.js Image component

## Tech Stack

### Core Framework
- **Next.js 16.0.3** - React framework with SSR capabilities
- **React 19.2.0** - Latest UI library
- **React DOM 19.2.0** - React rendering

### Styling & UI
- **Styled Components 6.1.13** - CSS-in-JS with SSR support

### HTTP & Data
- **Axios 1.7.2** - Promise-based HTTP client
- **qs 6.13.0** - Query string parsing

### Development Tools
- **ESLint 9.14.0** - Code linting
- **TypeScript Types** - Type definitions for better DX

## Architecture

### API Security Pattern
All external API calls (TMDb) are made from Next.js API routes (backend):
```
Client → Next.js API Route → TMDb API
```

Benefits:
- API keys never exposed to client
- Secure server-side authentication
- Ability to add caching and rate limiting

### Server-Side Rendering
All pages use `getServerSideProps` for:
- Better SEO
- Faster initial page load
- Up-to-date data on every request

## Deployment Configuration

### Vercel Settings
- **Node.js Version**: 22.x (configured in package.json and Vercel settings)
- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Install Command**: `npm install`

### Environment Variables Required
```env
TMDB_API_TOKEN=your_bearer_token_here
```

Set in Vercel project settings or `.env.local` for local development.

## Development Workflow

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Key Features Implemented

1. **Trending Movies Page** - Weekly trending movies with SSR
2. **Movie Search** - Real-time search with debouncing
3. **Movie Details** - Full movie information with cast
4. **Responsive Design** - Mobile-first approach
5. **Image Optimization** - Next.js Image component
6. **API Security** - Backend API routes
7. **Performance** - Code splitting, font optimization

## Known Issues & Limitations

- None currently identified

## Future Enhancements

Potential improvements:
- Add caching layer for API responses
- Implement user authentication and favorites
- Add movie recommendations
- Implement infinite scroll for movie lists
- Add filters (genre, year, rating)
- Add watchlist functionality

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TMDb API Documentation](https://developers.themoviedb.org/3)
- [React 19 Documentation](https://react.dev/)
- [Vercel Deployment Docs](https://vercel.com/docs)

---

*Last Updated: 2025-11-18*
