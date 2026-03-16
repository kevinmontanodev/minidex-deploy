export const updateTrainerData = async (name: string, username:string) => {
    try {
        const res = await fetch("/api/trainer/update", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ name, username })
        })
        
        const data = await res.json()

        if (res.ok){
            return {trainer : data, success: true}
        }
        
        return {success: false, message: data.message || "Failed to update trainer"}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}