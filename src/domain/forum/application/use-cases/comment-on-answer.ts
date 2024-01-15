import { AnswersRepository } from "../repositories/answer-respository";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface CommentOnAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

interface CommentOnAnswerUseCaseResponse {
	answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private answerCommentsRepository: AnswerCommentsRepository
	) {}

	async execute({
		authorId,
		content,
		answerId,
	}: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer not Found");
		}

		const answerComment = AnswerComment.create({
			authorId: new UniqueEntityId(authorId),
			content,
			answerId: new UniqueEntityId(answerId),
		});

		await this.answerCommentsRepository.create(answerComment);

		return { answerComment };
	}
}
