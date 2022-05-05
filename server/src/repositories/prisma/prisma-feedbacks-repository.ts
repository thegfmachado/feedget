import { prismaClient } from "../../db/client";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackCreateData) {
    const { type, comment, screenshot } = data;

    const feedback = await prismaClient.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    });

    return feedback;
  }
}
