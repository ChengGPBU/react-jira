module.exports = (req, res, next) => {
  console.log('~~~~~~~~~~~~~', req.methed)
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.name === 'jack' && req.body.password === '123456') {
      return res.status(200).json({
        user: {
          token: '1111',
        },
      })
    } else {
      return res.status(400).json({ message: 'error' })
    }
  }
  next()
}
