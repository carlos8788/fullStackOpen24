const tokenExtractor = (request, response, next) => {

  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }
  // código que extrae el token
  const token = getTokenFrom(request)
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }
  request.token = token
  next()
}

module.exports = {
  tokenExtractor
}