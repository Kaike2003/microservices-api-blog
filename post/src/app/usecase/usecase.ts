

export interface usecase<Input, Output> {
    execute(input: Input): Promise<Output>
}