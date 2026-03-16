export const buyEnvelope = async() => {
    try {
        const res = await fetch("/api/shop/buy-envelope", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        })

        const data = await res.json()
        
        if (res.ok){
            return {success: true, data: data}
        }

        return {success: false, message: data.message}

    } catch (error) {
        return {success: false, message: "Server conection error"}
    }
}

export const buySpecialPokemon = async() => {
    try {
        const res = await fetch("/api/shop/buy-special-pokemon", {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        })

        const data  = await res.json()
  
        if (res.ok){
            return {success: true, data: data}
        }

        return {success: false, message: data.message}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}