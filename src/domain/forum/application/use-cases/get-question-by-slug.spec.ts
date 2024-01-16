import { expect } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question by Slug", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to get a question by slug", async () => {
		const newQuestion = makeQuestion();

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			slug: "example-question",
		});

		expect(result.isRight()).toBe(true);
		expect(result.value?.question.title).toEqual(newQuestion.title);
	});
});
