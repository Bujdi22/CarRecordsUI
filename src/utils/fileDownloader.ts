import axiosInstance from "@/config/axiosConfig";

export function downloadFile(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    link.remove();
}

export async function downloadFileFromServer(url: string, filename: string) {
    const response = await axiosInstance.get(url, {responseType: 'blob'});
    const resolvedUrl = URL.createObjectURL(response.data);

    downloadFile(resolvedUrl, filename);
}