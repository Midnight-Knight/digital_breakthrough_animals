

export default async function get_package(id: string) {
    const response = await fetch('https://crisply-protected-ribbonfish.cloudpub.ru/archive/get_package?packageId='+id);
    const data = await response.json();
    return data;
}