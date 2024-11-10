

export default async function sessions() {
    const response = await fetch("https://crisply-protected-ribbonfish.cloudpub.ru/images/create_package", {
        method: "POST",
    });
    const data = await response.json();
    return data.packageId;
}