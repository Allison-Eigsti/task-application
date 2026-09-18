function notFound(req, res, next) {
    res.status(404).json({ error: '404 Not Found' })
}

module.exports = notFound