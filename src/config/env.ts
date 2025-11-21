/**
 * Environment variables configuration
 * All environment variables must be prefixed with VITE_ to be exposed to the client
 */

export const env = {
    // API Configuration
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com',
    apiProductsEndpoint: import.meta.env.VITE_API_PRODUCTS_ENDPOINT || '/products',

    // Computed URLs
    get productsUrl() {
        return `${this.apiBaseUrl}${this.apiProductsEndpoint}`
    }
}

// Type-safe environment variables
export type Env = typeof env
