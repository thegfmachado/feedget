import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "dbdc69bd0f5519",
    pass: "4368ce9d163c2a"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const { body, subject } = data;

    await transport.sendMail({
      from: 'Equipe Feedget <contato@feedget.com>',
      to: 'Gabriel Machado <gabriel.ferreira.machado@hotmail.com>',
      subject,
      html: body
    })
  };
}
