
export type PropsPost = {
    id: string
    title: string
    description: string
    userId: string
    createdAt: Date
    updatedAt: Date
}

export class Post {

    private constructor(private readonly props: PropsPost) { }

    static create({ description, title, userId }: Pick<PropsPost, "title" | "description" | "userId">): Post {
        return new Post({
            id: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            userId,
            title,
            description
        })
    }

    static with(post: PropsPost) {
        return new Post(post)
    }

    toJSON() {
        return {
            id: this.props.id,
            tile: this.props.title,
            description: this.props.description,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
            userId: this.props.userId
        }
    }

    get id(): string {
        return this.props.id
    }

    get title(): string {
        return this.props.title
    }

    get description(): string {
        return this.props.description
    }

    get userId(): string {
        return this.props.userId
    }

    get createdAt(): Date {
        return this.props.createdAt
    }

    get updatedAt(): Date {
        return this.props.updatedAt
    }

}