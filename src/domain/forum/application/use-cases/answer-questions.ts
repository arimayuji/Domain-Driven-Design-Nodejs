import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answer-respository";
import { Either, right } from "@/core/either";

interface AnswerQuestionUseCaseRequest {
	questionId: string;
	authorId: string;
	content: string;
}

type AnswerQuestionUseCaseResponse = Either<
	null,
	{
		answer: Answer;
	}
>;

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		questionId,
		authorId,
		content,
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			authorId: new UniqueEntityId(authorId),
			content,
			questionId: new UniqueEntityId(questionId),
		});

		await this.answersRepository.create(answer);

		return right({answer});
	}
}
