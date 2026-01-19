import imageCompression from "browser-image-compression";

export default async function compressImage(file: File): Promise<File> {
    const options = {
        maxSizeMB: 5,
        useWebWorker: true,
    };

    const compressedBlob = await imageCompression(file, options);

    // Ensure it's a proper File with name + type
    return new File([compressedBlob], file.name, {
        type: file.type,
        lastModified: Date.now(),
    });
}