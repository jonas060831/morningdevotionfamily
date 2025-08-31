
const sendSubscriptionConfirmationEmailToClient = async (clientEmail: string, emailTemplate: string): Promise<{ success: true; message: string } | { success: false; error: string }> => {
    try {
        

        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clientEmail, emailTemplate })
        }

        const res = await fetch('/api/emails/clients/subscription-confirmation', options)

        const response = await res.json()

        return { success: true, message: response.data }

    } catch (error) {
        console.error(error);
        return {
        success: false,
        error: (error as Error).message,
        };
    }
}


export { sendSubscriptionConfirmationEmailToClient }