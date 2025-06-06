export const useApi = () => {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBase || '';

    const isClient = import.meta.client;
    const isServer = import.meta.server;

    const get = async <T>(endpoint: string, params?: Record<string, any>, cache?: boolean = true) => {
        const key = `api:${endpoint}:${JSON.stringify(params || {})}`;

        // Reuse data if it already exists
        const state = useState<T | null>(key, () => null);

        // If already fetched (e.g. from SSR), return cached data
        if (cache) return state.value;

        const url = `${baseUrl}${endpoint}`;

        if (isServer) {
            const { data, error } = await useFetch<T>(url, {
                method: 'GET',
                params,
            });
            if (error.value) throw error.value;
            state.value = data.value as T;
            return state.value;
        }

        if (isClient) {
            const data = await $fetch<T>(url, {
                method: 'GET',
                params,
            });
            state.value = data;
            return data;
        }

        // fallback
        return null as unknown as T;
    };

    // POST, PUT, DELETE: no caching (usually non-idempotent)
    const post = async <T>(endpoint: string, body?: any) => {
        const url = `${baseUrl}${endpoint}`;
        return await $fetch<T>(url, { method: 'POST', body });
    };

    const put = async <T>(endpoint: string, body?: any) => {
        const url = `${baseUrl}${endpoint}`;
        return await $fetch<T>(url, { method: 'PUT', body });
    };

    const del = async <T>(endpoint: string) => {
        const url = `${baseUrl}${endpoint}`;
        return await $fetch<T>(url, { method: 'DELETE' });
    };

    return {
        get,
        post,
        put,
        del,
    };
};
