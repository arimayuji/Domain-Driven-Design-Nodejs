import { QuestionsRepository } from "../repositories/questions-respository";

interface DeleteQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		questionId,
		authorId,
	}: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error("Question not found");
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error("Not Allowed");
		}
		
		await this.questionsRepository.deleteById(question);

		return { question };
	}
}
