export default interface InputComponentProps<T = any> {
  onChange?: (value: T) => void;
  value?: T;
}
