import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"
import { Feedback } from "@prisma/client";

export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

describe('Submit feedback', () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendEmailSpy },
  );

  it('should be able to submit feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,sdasdasdasd684ad6a84sdsa4d6as4d6as78d6asd7'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  })

  it('should not be able to submit feedback without a type or a comment', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: '',
      screenshot: 'data:image/png;base64,sdasdasdasd684ad6a84sdsa4d6as4d6as78d6asd7'
    })).rejects.toThrow();
  })

  it('should not be able to submit feedback with an invalid screenshot ', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'sdasdasdasd684ad6a84sdsa4d6as4d6as78d6asd7'
    })).rejects.toThrow();
  })
})
