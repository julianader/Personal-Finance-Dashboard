/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Custom CSS variable colors
                background: {
                    primary: 'var(--bg-primary)',
                    secondary: 'var(--bg-secondary)',
                    tertiary: 'var(--bg-tertiary)',
                },
                text: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                    tertiary: 'var(--text-tertiary)',
                    accent: 'var(--text-accent)',
                },
                border: {
                    primary: 'var(--border-primary)',
                    secondary: 'var(--border-secondary)',
                },
                surface: {
                    primary: 'var(--surface-primary)',
                    secondary: 'var(--surface-secondary)',
                    hover: 'var(--surface-hover)',
                },
                // Brand colors
                primary: {
                    500: '#4f46e5',
                    600: '#4f46e5',
                    700: '#4338ca',
                },
                accent: {
                    500: '#f97316',
                },
                success: '#10b981',
                danger: '#ef4444',
            },
        },
    },
    plugins: [],
}
