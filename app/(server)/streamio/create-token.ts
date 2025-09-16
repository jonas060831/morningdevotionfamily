
const createStreamToken = async (userId: string, role: "admin" | "user" ): Promise<any> => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: userId, role: role }) // Wrap in object
    }
    const res = await fetch('/api/getstream/create-token', options)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return { success: false, error: (error as Error).message }
  }
}

export { createStreamToken }