

export default async function list_packages() {
    const response = await fetch("https://crisply-protected-ribbonfish.cloudpub.ru/archive/list_packages");
    const data = await response.json();
    return data.packages;
}