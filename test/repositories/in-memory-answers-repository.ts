import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answer-respository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = [];

	async create(Answer: Answer) {
		this.items.push(Answer);
	}

	async delete(answer: Answer) {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items.splice(itemIndex, 1);
	}

	async findById(id: string) {
		const answer = this.items.find((item) => item.id.toString() === id);

		if (!answer) {
			return null;
		}

		return answer;
	}

	async save(answer: Answer) {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items[itemIndex] = answer;
	}

	async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
		const resultsPerPage = 20;

		const answers = this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page - 1) * resultsPerPage, page * resultsPerPage);

		return answers;
	}
}
