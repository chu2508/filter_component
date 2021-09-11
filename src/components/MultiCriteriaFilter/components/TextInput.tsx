import { InputComponentProps } from "../types";

const TextInput = (props: InputComponentProps<string>) => {
  return <input onChange={(e) => props.onChange?.(e.target.value)} value={props.value || ""} />;
};

export default TextInput;
