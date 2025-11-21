export interface EmptyStateProps {
    icon: Component
    title: string
    description: string
    actionText?: string
    actionLink?: string
}

export interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg'
}