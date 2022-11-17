const request = async (url, method, headers, body) => {
    try {
        const response = await fetch(url, {
            method,
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export default request
