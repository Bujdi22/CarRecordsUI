import moment from "moment/moment";

export function formatDate(date: string): string {
    return moment(date).format('LL')
}

export function formatCreatedAt(date: string): string {
    return moment(date).format('LLLL')
}

export function formatUpdatedAt(date: string): string {
    return moment(date).fromNow()
}
export function getYear(): string {
    return moment().format('YYYY');
}