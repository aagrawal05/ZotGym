export const apiDomain = process.env.API_DOMAIN;

export async function fetchWithAuth(token, url, options) {
    if (options)
        return fetch(apiDomain + url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: token
            }
        })
    else 
        return fetch(apiDomain + url, {
            headers: {
                Authorization: token
            }
        })
};
