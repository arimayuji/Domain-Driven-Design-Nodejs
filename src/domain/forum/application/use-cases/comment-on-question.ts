import { QuestionsRepository } from "../repositories/questions-respository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface CommentOnQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
	content: string;
}

interface CommentOnQuestionUseCaseResponse {
	questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
	constructor(
		private questionsRepository: QuestionsRepository,
		private questionCommentsRepository: QuestionCommentsRepository
	) {}

	async execute({
		authorId,
		content,
		questionId,
	}: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error("Question not Found");
		}

		const questionComment = QuestionComment.create({
			authorId: new UniqueEntityId(authorId),
			content,
			questionId: new UniqueEntityId(questionId),
		});

		await this.questionCommentsRepository.create(questionComment);

		return { questionComment };
	}
}
