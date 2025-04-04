````markdown
# Codelang

Codelang is a React application for working with code, built with Webpack, TypeScript, and Redux.

## 📦 Installation

Make sure you have **Node.js** installed (latest LTS version recommended). Then run:

```sh
git clone https://github.com/andrei-asipik/codelang.git
cd codelang
npm install
```
````

## ⚙️ Environment Setup

Before running the project in development mode, you **must** create a `.env` file in the root directory.

Then add the required environment variables inside `.env`.

## 🚀 Running the Project

### Development Mode

```sh
npm start
```

The app will be available at localhost port from .env

### Production Build

```sh
npm run build
```

## 📜 Scripts

- `npm start` — Runs the app in development mode.
- `npm run build` — Builds the production-ready version.
- `npm run lint` — Checks code quality with ESLint.
- `npm run lint:fix` — Automatically fixes linting issues.

## 📂 Project Structure

```
/src
├── /components (UI-only components)
│   ├── /atoms        # Minimal, independent components
│   ├── /molecules    # Components made of multiple atoms
│   ├── /organisms    # More complex UI sections
│   ├── /templates    # Page templates including organisms and layout
│   ├── /pages        # Full pages with templates and routing logic
├── /routes           # Route configurations
├── /store            # Global state management (Redux Toolkit)
├── /services         # API logic
├── /hooks            # Reusable custom hooks
├── /utils            # Utility functions/helpers
├── /styles           # Global styles and variables
├── App.tsx           # Root application component
├── index.tsx         # Entry point
```

## 🛠️ Technologies Used

- **React** + **React Router**
- **Redux Toolkit**
- **TypeScript**
- **Webpack**
- **ESLint + Prettier**
- **Ant Design**
- **Husky** (pre-commit hooks)
- **dotenv-webpack** (for environment variables)

## 📄 License

This project is licensed under the **MIT** License.

```

```
