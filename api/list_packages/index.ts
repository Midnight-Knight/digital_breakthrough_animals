import {LIST_PACKAGE} from "@/env";

export default async function list_packages() {
    const response = await fetch(LIST_PACKAGE);
    const data = await response.json();
    return data.packages;
}