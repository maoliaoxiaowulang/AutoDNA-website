# AutoDNA Website

Official website for the AutoDNA project — an AI-native autonomous laboratory for biomolecular engineering.

## Prerequisites

- Node.js >= 20
- npm >= 10

## Getting Started

```bash
cd website
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. The dev server supports hot reload.

## Available Scripts

All commands should be run inside the `website/` directory.

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production (output to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint (0 warnings allowed) |
| `npm run format` | Auto-format all source files with Prettier |
| `npm run format-check` | Check formatting without modifying files |

## Contributing

### Workflow

1. **Create a branch** from `main` — never commit directly to `main`
   ```bash
   git checkout -b your-feature-name
   ```

2. **Make changes**, then run lint and format check before committing:
   ```bash
   npm run lint
   npm run format-check
   # or auto-fix formatting:
   npm run format
   ```

3. **Open a Pull Request** — CI will automatically run lint, format-check, and build. The PR cannot be merged if CI fails.

4. **One PR, one thing** — keep each PR focused on a single change to make review easy.

