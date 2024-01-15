import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-respository";

interface FetchLatestQuestionsUseCaseRequest {
	page: number;
}

interface FetchLatestQuestionsUseCaseResponse {
	questions: Question[];
}

export class FetchLatestQuestionsUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		page,
	}: FetchLatestQuestionsUseCaseRequest): Promise<FetchLatestQuestionsUseCaseResponse> {
		const questions = await this.questionsRepository.findManyLatest({ page });

		return { questions };
	}
}
