export default {
    jwtSecret: process.env.JWT_SECRET || 'asd',
    DB: {
        URI: process.env.MONGODB_URI || 'tu db acá',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
};