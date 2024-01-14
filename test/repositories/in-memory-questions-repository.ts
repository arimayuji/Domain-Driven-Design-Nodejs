import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-respository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[] = [];

	async create(question: Question) {
		this.items.push(question);
	}
	async save(question: Question) {
		const itemIndex = this.items.findIndex((item) => item.id === question.id);

		this.items[itemIndex] = question;
	}
	async findBySlug(slug: string) {
		const question = this.items.find((item) => item.slug.value === slug);

		if (!question) {
			return null;
		}
		return question;
	}

	async deleteById(question: Question) {
		const itemIndex = this.items.findIndex((item) => item.id === question.id);

		this.items.splice(itemIndex, 1);
	}

	async findById(id: string) {
		const question = this.items.find((item) => item.id.toString() === id);

		if (!question) {
			return null;
		}

		return question;
	}
}