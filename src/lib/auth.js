export function getPayload() {
    const token = localStorage.getItem('token')
  
    if (!token) return false
  
    const parts = token.split('.')
    // ! Grab public bit of token (parts[1]), decode it (atob), turn into an obj (json.parse)
    return JSON.parse(atob(parts[1]))
  }
  
  // ! This function returns true if both the user (e.g cheese user id) and the current user (in the token)
  // ! are the same userId.
  export function isAddedBy(userId) {
    const payload = getPayload()
    if (!payload) return false
    return userId === payload.userId
  }