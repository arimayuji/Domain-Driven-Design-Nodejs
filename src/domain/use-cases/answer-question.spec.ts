import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-questions";
import { AnswersRepository } from "../repositories/answer-respository";
import { Answer } from "../entities/answer";

const fakeAnswersRepository: AnswersRepository = {
	create: async (answer: Answer) => {
		return;
	},
};
test("create an answer", async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);
	const answer = await answerQuestion.execute({
		questionId: "1",
		authorId: "1",
		content: "Nova Resposta",
	});

	expect(answer.content).toEqual("Nova Resposta");
});
