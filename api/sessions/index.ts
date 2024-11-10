import {SESSIONS} from "@/env";


export default async function sessions() {
    const response = await fetch(SESSIONS, {
        method: "POST",
    });
    const data = await response.json();
    return data.packageId;
}