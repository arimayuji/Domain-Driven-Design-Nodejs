import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface AnswerProps {
	content: string;
	questionId: UniqueEntityId;
	authorId: UniqueEntityId;
	createdAt: Date;
	updatedAt?: Date;
}
export class Answer extends Entity<AnswerProps> {
	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	get content() {
		return this.props.content;
	}

	get questionId() {
		return this.props.questionId;
	}

	get authorId() {
		return this.props.authorId;
	}

	get excerpt() {
		return this.content.substring(0, 120).trimEnd().concat("...");
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<AnswerProps, "createdAt">,
		id?: UniqueEntityId
	) {
		const answer = new Answer(
			{
				...props,
				createdAt: new Date(),
			},
			id
		);

		return answer;
	}
}