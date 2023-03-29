import { createTestAccount, createTransport, getTestMessageUrl, Transporter } from "nodemailer";
import { appConfig, mailerConfig } from "src/config";
import { SendMailPayload } from "src/interfaces/mailer/mailer.interface";


class Mailer {
    private transporter: Transporter;
    
    private isProduction: boolean = appConfig.isProd
    private host = mailerConfig.host;

    constructor() {
        this.mailConfig().then(() => {
            this.transporter.verify((err, success) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Server is ready to take our messages");
                }
            })
        }).catch(err => console.log(err))
    }

    private async mailConfig() {
        return this.isProduction ? this.prodConfig() : this.devConfig();
    }

    private async devConfig() {
        const account = await createTestAccount();
        this.transporter = createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
    }

    private async prodConfig() {
        this.transporter = createTransport({
            host: this.host,
            port: 465,
            secure: true,
            auth: mailerConfig.auth
        });
    }

    async sendMessage(payload: SendMailPayload) {
        const info = await this.transporter.sendMail(payload)
        const messageUrl = getTestMessageUrl(info);
        console.log("❗ ~ file: mailer.util.ts:56 ~ Mailer ~ sendMessage ~ messageUrl:", messageUrl)
        return messageUrl;
    }
}

const mailer = new Mailer();
export default mailer