export const getUSDRate = async (url) => {
    return fetch(url)
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            throw error
        })
}

export const getTokenUSDPrice = async (url) => {
    return fetch(url)
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            throw error
        })
}
