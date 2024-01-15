import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionCommentsUseCaseRequest {
	questionId: string;
	page: number;
}

interface FetchQuestionCommentsUseCaseResponse {
	questionComments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
	constructor(private answersRepository: QuestionCommentsRepository) {}

	async execute({
		questionId,
		page,
	}: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
		const questionComments = await this.answersRepository.findManyByQuestionId(
			questionId,
			{ page }
		);

		return { questionComments };
	}
}
