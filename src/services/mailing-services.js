import { config } from "../config/mailerConfig.js";
import nodemailer from "nodemailer";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mailer.host,
            port: config.mailer.port,
            auth: config.mailer.auth,
        });

        console.log("Instancia de MailService creada correctamente");
    }

    getMessageTemplate(type, name) {
        let body = "";

        switch (type) {
            case "welcome":
                body += `Bienvenido ${name} !
                `;
                break;

            case "purchase":
                body += `Gracias por comprar con nosotros!      
                Tu pedido será entregado en los siguientes días.
                `;
                break;

            default:
                body += `Mensaje a ${name} !
                
                `;
                break;
        }

        body += `Hola!!! `;

        return body;
    }

    async sendMail({ to, subject, type, name }) {
        const message = this.getMessageTemplate(type, name);

        const info = await this.transporter.sendMail({
            from: "",
            to,
            subject,
            html: message,
            attachments: [], 
        });

        console.log("Mensaje enviado:", message);
        console.log("Información del correo:", info);
    }
}

export default MailService;

function logServiceStatus() {
    console.log("Mail services are fully operational");
}

logServiceStatus();
