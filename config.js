const config = {
    MONGODB_URI : String(process.env.MONGODB_URI),
    JWT_SECRET: String(process.env.JWT_SECRET)
}

module.exports = config;