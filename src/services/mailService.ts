export class MailService {
  public static async sendActivationMail(to = 'hello', link = 'world') {
    console.log('mail send');
  }
}
