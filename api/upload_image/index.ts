

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Обработчик успешного чтения файла
        reader.onload = () => {
            if (reader.result) {
                // Результат чтения файла в формате Base64
                const base64String = (reader.result as string).split(',')[1]; // Убираем префикс типа данных
                resolve(base64String);
            } else {
                reject(new Error("File reading failed"));
            }
        };

        // Обработчик ошибки чтения файла
        reader.onerror = (error) => {
            reject(error);
        };

        // Чтение файла как Data URL
        reader.readAsDataURL(file);
    });
}

export default async function upload_image(packageId: string, file: File, filePath: string) {
    const response = await fetch("https://crisply-protected-ribbonfish.cloudpub.ru/images/upload_image", {
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