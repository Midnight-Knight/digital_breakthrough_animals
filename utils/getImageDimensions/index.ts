export default async function getImageDimensions(file: File): Promise<{ width: number; height: number; src: string }> {
    const img = new Image();
    const url = URL.createObjectURL(file);

    return new Promise((resolve, reject) => {
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            resolve({ width: width, height: height, src: url });
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Не удалось загрузить изображение"));
        };

        img.src = url;
    });
}