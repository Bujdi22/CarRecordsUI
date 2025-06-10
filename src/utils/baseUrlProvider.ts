export default function getBaseUrl ():string {
    return import.meta.env.VITE_API_URL || 'https://api.autojournalapp.com';
}