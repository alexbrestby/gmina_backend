import 'dotenv/config';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export class MailService {

  public static async sendActivationMail(to = '01.80@mail.ru', link = 'world') {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 20000,
      debug: true, // Включить отладку
    } as SMTPTransport.Options);

    async function main() {
      const info = await transporter.sendMail({
        from: '"gmina.by" <support@gmina.by>', // sender address
        to: to, // list of receivers
        subject: "✔ Активация учетной записи на gmina.by", // Subject line
        text: '', // plain text body
        html: `
          <div>
            <h1>Активируйте учетную запись</h1>
            <a href="https://${process.env.API_URL}/user/activate/${link}">ссылка для активации</a>
          </div>
              `
      });
      console.log("Message sent: %s", info.messageId);
    }

    // Вызов функции main
    await main().catch(console.error);
  }
}

