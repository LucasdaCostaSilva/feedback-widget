import nodemailer from 'nodemailer';
import { EmailAdapter, SendEmailData } from "../EmailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a03c03b4489ce9",
    pass: "12be122b4944ad"
  }
});

export class EmailAdapterImpl implements EmailAdapter {
  async sendEmail({ subject, body }: SendEmailData) {
    await transport.sendMail({
      from: "Equipe feedback <suporte@feedget.com>",
      to: "Lucas <landir@gmail.com>",
      subject: subject,
      html: body
    })
  }
}
