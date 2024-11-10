import {GET_PACKAGE} from "@/env";


export default async function get_package(id: string) {
    const response = await fetch(GET_PACKAGE+id);
    const data = await response.json();
    return data;
}