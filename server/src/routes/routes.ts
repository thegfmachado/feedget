import { Router } from 'express';
import { NodemailerMailAdapter } from '../adapter/nodemailer-mail-adapter/nodemail-mail-adapter';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from '../use-cases/submit-feedback-use-case';

export const routes = Router();

routes.post('/feedbacks', async (req, res) => {
  const { comment, type, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const nodemailerAdapter = new NodemailerMailAdapter();
  const submitFeedback = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerAdapter);

  const feedback = await submitFeedback.execute({
    type,
    comment,
    screenshot,
  })

  res.status(201).json({ data: feedback });
})
