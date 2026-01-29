# JP Casabianca Portfolio

![CI](https://github.com/jpcasa/jpc-untitled-ui/actions/workflows/ci.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

Personal portfolio website for JP Casabianca - UI/UX Designer & Fullstack Engineer.

**[Live Site](https://www.jpcasabianca.com)** • **[LinkedIn](https://linkedin.com/in/jpcasabianca)** • **[GitHub](https://github.com/jpcasabianca)**

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4.1
- **UI Components:** Untitled UI React + React Aria
- **Testing:** Vitest + React Testing Library
- **SEO:** react-helmet-async, JSON-LD, sitemap.xml

## Features

- Responsive design with mobile navigation
- Dark/light header modes based on scroll position
- Lazy-loaded routes for optimal performance
- Web Vitals monitoring
- Error boundary for graceful error handling
- Comprehensive test suite
- CI/CD pipeline with GitHub Actions

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Build for production
pnpm build

# Preview production build
pnpm preview
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── base/       # Base components (Button, Input, etc.)
│   ├── layout/     # Layout components (TopBar, Footer)
│   └── shared/     # Shared components (OptimizedImage, etc.)
├── data/           # JSON data files
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── providers/      # Context providers
├── router/         # Route configuration
├── test/           # Test setup and utilities
└── utils/          # Utility functions
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm lint` | Check code formatting |
| `pnpm format` | Format code with Prettier |

## Built With

This project uses [Untitled UI React](https://www.untitledui.com/react) - the world's largest collection of open-source React UI components.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Open to remote opportunities (EST timezone)** - [hola@jpcasabianca.com](mailto:hola@jpcasabianca.com)
