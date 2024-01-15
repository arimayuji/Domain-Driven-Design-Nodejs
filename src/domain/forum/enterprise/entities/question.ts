import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface QuestionProps {
	title: string;
	content: string;
	slug: Slug;
	authorId: UniqueEntityId;
	createdAt: Date;
	updatedAt?: Date;
	bestAnswerId?: UniqueEntityId;
}
export class Question extends Entity<QuestionProps> {
	private touch() {
		this.props.updatedAt = new Date();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	get content() {
		return this.props.content;
	}

	set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
		this.props.bestAnswerId = bestAnswerId;
		this.touch();
	}

	get bestAnswerId() {
		return this.props.bestAnswerId;
	}

	set title(title: string) {
		this.props.title = title;
		this.props.slug = Slug.createFromText(title);
		this.touch();
	}

	get title() {
		return this.props.title;
	}

	get authorId() {
		return this.props.authorId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get slug() {
		return this.props.slug;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<QuestionProps, "createdAt" | "slug">,
		id?: UniqueEntityId
	) {
		const question = new Question(
			{
				...props,
				slug: props.slug ?? Slug.createFromText(props.title),
				createdAt: props.createdAt ?? new Date(),
			},
			id
		);

		return question;
	}
}
