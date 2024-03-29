export default () => ({
    mail: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
        from: process.env.MAIL_FROM,
        templatePath: process.env.MAIL_TEMPLATE_PATH
    },
    baseUri: process.env.BASE_URI,
    security: {
        secret: process.env.JWT_SECRET
    },
})
