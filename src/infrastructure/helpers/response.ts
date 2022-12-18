function buildResponse(data, res) {
    if(!data || data.length === 0) return res.status(404).end()
    res.json(data)
}

export default buildResponse