import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: 'prr5m4fr',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01'
})