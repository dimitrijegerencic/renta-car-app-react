export const userRoles = {
    EMPLOYEE: 1,
    USER: 2
}

export const storageKeys = {
    USER: 'user-key',
    ROLE: 'user-role'
}

export const reactQueryConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            cacheTime: 1000 * 60 * 30,
            retry: 0
        }
    }
}

