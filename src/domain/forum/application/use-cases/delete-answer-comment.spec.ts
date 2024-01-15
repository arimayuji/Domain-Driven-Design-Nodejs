import { expect } from "vitest";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer Comment", () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
	});

	it("should be able to delete a answer comment", async () => {
		const newAnswerComment = makeAnswerComment(
			{ authorId: new UniqueEntityId("author-1") },
			new UniqueEntityId("answer-1")
		);

		await inMemoryAnswerCommentsRepository.create(newAnswerComment);

		await sut.execute({
			authorId: "author-1",
			answerCommentId: "answer-1",
		});

		expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
	});

	it("should not be able to delete a answer comment from another user", async () => {
		const newAnswerComment = makeAnswerComment(
			{ authorId: new UniqueEntityId("author-1") },
			new UniqueEntityId("answer-1")
		);

		await inMemoryAnswerCommentsRepository.create(newAnswerComment);

		await expect(() => {
			return sut.execute({
				authorId: "author-2",
				answerCommentId: "answer-1",
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
