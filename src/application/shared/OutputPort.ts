export interface OutputPort<Output> {
    present(output: Output): void;
}
