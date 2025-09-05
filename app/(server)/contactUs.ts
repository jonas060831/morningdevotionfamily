const sendContactMessageToAdmin = async (emailTemplate: string): Promise<any> => {

    try {
      
      const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailTemplate })
      }

      const res = await fetch('/api/forms/contact-us', options)

      const response = await res.json()

      return { success: true, message: response.data }

    
    } catch (error) {
      console.error(error)
      return { success: false, error: (error as Error).message }
    }
}

const sendContactUsConfirmationToClient = async (emailTemplate: string, clientEmail: string): Promise<any> => {
  try {
    
    const options = {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({ emailTemplate, clientEmail })
    }

    const res = await fetch('/api/forms/contact-us/confirmation', options)

    const response = await res.json()

    return { success: true, message: response.data }

  } catch (error) {
    console.error(error)
    return { success: false, error: (error as Error).message }
  }
}

export {sendContactMessageToAdmin, sendContactUsConfirmationToClient}