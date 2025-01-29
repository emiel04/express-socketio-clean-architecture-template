export interface UseCase<Input> {
    execute(input: Input): Promise<void>;
}
