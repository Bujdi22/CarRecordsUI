export default function getBaseUrl ():string {
    return process.env.NODE_ENV === 'production'
        ? 'https://api.autojournalapp.com' // Production base URL
        : 'http://localhost:8080'; // Proxy for development
}