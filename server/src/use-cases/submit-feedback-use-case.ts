import { MailAdapter } from "../adapter/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) { }

  async execute(data: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = data;

    if (!type || !comment) {
      throw new Error('Feedback must have a type and comment.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    const feedback = await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `${screenshot ? `<img src="${screenshot}" />` : ''}`,
        `</div>`,
      ].join('\n'),
    })

    return feedback;
  }
}
