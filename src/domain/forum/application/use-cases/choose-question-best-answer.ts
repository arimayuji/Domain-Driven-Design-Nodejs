import { AnswersRepository } from "../repositories/answer-respository";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-respository";

interface ChooseQuestionBestAnswerUseCaseRequest {
	answerId: string;
	authorId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
	question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private questionsRepository: QuestionsRepository
	) {}

	async execute({
		answerId,
		authorId,
	}: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer not found");
		}

		const question = await this.questionsRepository.findById(
			answer.questionId.toString()
		);

		if (!question) {
			throw new Error("Question  not found");
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error("Not Allowed");
		}

		question.bestAnswerId = answer.id;

		return { question };
	}
}
