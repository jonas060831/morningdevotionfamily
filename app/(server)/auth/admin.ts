const signInAdmin = async (formData: Record<string,any>): Promise<any> => {

    try {
      
      const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }

      const res = await fetch('/api/auth/login', options)

      const response = await res.json()

      return response

    
    } catch (error) {
      console.error(error)
      return { success: false, error: (error as Error).message }
    }
}


export { signInAdmin }