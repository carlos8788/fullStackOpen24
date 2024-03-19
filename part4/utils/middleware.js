const jwt = require('jsonwebtoken')

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

const userExtractor = (request, response, next) => {
  const decoded = jwt.verify(request.token, process.env.SECRET)
  if (!decoded) {
    return response.status(401).json({ error: 'token missing' })
  }
  request.user = decoded.id
  next()
}


module.exports = {
  tokenExtractor,
  userExtractor
}