import 'dotenv/config';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export class MailService {
  /**
   * Send an activation email to the user
   * @param {string} to - The recipient's email address
   * @param {string} link - The activation link
   * @returns {Promise<void>}
   */
  public static async sendActivationMail(to: string, link: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 20000,
      // debug: true,
    } as SMTPTransport.Options);

    /**
     * Main function to send the email
     * @returns {Promise<void>}
     */
    async function main(): Promise<void> {
      const info = await transporter.sendMail({
        from: '"gmina.by" <support@gmina.by>',
        to: to,
        subject: "✔ Активация учетной записи на gmina.by",
        text: '',
        html: `
          <div>
            <h1>Активируйте учетную запись</h1>
            <a href="http://${process.env.API_URL}/user/activate/${link}">ссылка для активации</a>
          </div>
        `
      });
      console.log("Message sent: %s", info.messageId);
    }

    await main().catch(console.error);
  }
}
