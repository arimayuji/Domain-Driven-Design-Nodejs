import { expect } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to edit a question", async () => {
		const newQuestion = makeQuestion(
			{ authorId: new UniqueEntityId("author-1") },
			new UniqueEntityId("question-1")
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		await sut.execute({
			authorId: "author-1",
			questionId: newQuestion.id.toString(),
			title: "Pergunta Teste",
			content: "Conteúdo Teste",
		});

		expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
			title: "Pergunta Teste",
			content: "Conteúdo Teste",
		});
	});

	it("should not be able to edit a question from another user", async () => {
		const newQuestion = makeQuestion(
			{ authorId: new UniqueEntityId("author-1") },
			new UniqueEntityId("question-1")
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			authorId: "author-2",
			questionId: newQuestion.id.toString(),
			title: "Pergunta Teste",
			content: "Conteúdo Teste",
		});
		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
