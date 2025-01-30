export function humanize(str: string): string {
    const frags = str.split('_');
    for (let i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}

export function strip(str: string): string {
    return str.replace(/[^a-zA-Z0-9]/g, '');
}

export function searchStringInArray(needle: string, haystack: string[]) : boolean {
    needle = strip(needle.toLowerCase());
    haystack = haystack.map((s) => strip(s.toLowerCase()));

    return haystack.some((s) => s.includes(needle));
}