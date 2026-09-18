let requestCount = 0

function requestCounter(req, res, next) {
    requestCount++
    console.log(`Number of requests: ${requestCount}`)
    next()
}

module.exports = requestCounter