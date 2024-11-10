import {UPLOAD_IMAGE} from "@/env";


function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result) {
                const base64String = (reader.result as string).split(',')[1]; // Убираем префикс типа данных
                resolve(base64String);
            } else {
                reject(new Error("File reading failed"));
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

export default async function upload_image(packageId: string, file: File, filePath: string) {
    const response = await fetch(UPLOAD_IMAGE, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            packageId: packageId,
            imageTitle: file.name,
            imagePath: filePath,
            imageBase64: await fileToBase64(file)
        })
    });
    const data = await response.json();

    return data;
}