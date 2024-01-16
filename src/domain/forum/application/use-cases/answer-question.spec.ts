import { expect } from "vitest";
import { AnswerQuestionUseCase } from "./answer-questions";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});

	it("create an answer", async () => {
		const result = await sut.execute({
			questionId: "1",
			authorId: "1",
			content: "Nova Resposta",
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
	});
});
