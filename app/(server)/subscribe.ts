const subscribeNewUser = async (formData: any): Promise<any> => {

    try {

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        const res = await fetch('/api/users/subscribe', options)

        const data = await res.json()

        return data

    } catch (error) {
        console.error(error)
        return { success: false, error: (error as Error).message }
    }
}

export { subscribeNewUser }