# Environment Variables Setup

This project uses environment variables to configure API endpoints and other settings.

## Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` as needed for your environment.

## Available Environment Variables

### API Configuration

- **VITE_API_BASE_URL**: Base URL for the API
  - Default: `https://fakestoreapi.com`
  - Example: `https://api.yourbackend.com`

- **VITE_API_PRODUCTS_ENDPOINT**: Endpoint path for products
  - Default: `/products`
  - Example: `/api/v1/products`

## Usage in Code

Import the `env` object from `@/config/env`:

```typescript
import { env } from '@/config/env'

// Use individual values
const baseUrl = env.apiBaseUrl

// Use computed URLs
const productsUrl = env.productsUrl
```

## Important Notes

- All environment variables must be prefixed with `VITE_` to be exposed to the client-side code
- The `.env` file is ignored by git and should never be committed
- Use `.env.example` as a template for other developers
- Environment variables are replaced at build time, so you need to restart the dev server after changing them
