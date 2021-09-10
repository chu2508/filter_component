import { fireEvent, render } from "@testing-library/react";
import { CriterionOption, CriterionValue, FilterType, InputType } from "../types";
import CriterionRow from "./CriterionRow";

describe("CriterionRow", () => {
  test("应该正确的初始化渲染组件", () => {
    const option: CriterionOption = {
      fieldLabel: "Test field",
      fieldKeyName: "test",
      filterOptions: [
        { filterType: FilterType.NOT_NULLABLE, filterLabel: "NotNullable", inputType: InputType.NONE },
        { filterType: FilterType.NULLABLE, filterLabel: "Nullable", inputType: InputType.NONE },
      ],
    };
    const value: CriterionValue = { fieldKeyName: "test", filterValues: [{ type: FilterType.NULLABLE }] };
    const mockInput = jest.fn();
    mockInput.mockReturnValue(() => null);

    const { queryByText } = render(<CriterionRow option={option} value={value} input={mockInput} />);

    expect(queryByText(option.fieldLabel)).toBeInTheDocument();
    expect(queryByText(option.filterOptions[1].filterLabel as string)).toBeInTheDocument();
    expect(queryByText(option.filterOptions[0].filterLabel as string)).toBeInTheDocument();
    expect((queryByText(option.filterOptions[1].filterLabel as string) as HTMLOptionElement).selected).toBeTruthy();
    expect((queryByText(option.filterOptions[0].filterLabel as string) as HTMLOptionElement).selected).toBeFalsy();
    expect(mockInput).toBeCalledTimes(1);
    expect(mockInput).toBeCalledWith(InputType.NONE);
  });

  test("当过滤条件类型选项改变时，应该触发onChange回调", () => {
    const option: CriterionOption = {
      fieldLabel: "Test field",
      fieldKeyName: "test",
      filterOptions: [
        { filterType: FilterType.NOT_NULLABLE, filterLabel: "NotNullable", inputType: InputType.NONE },
        { filterType: FilterType.NULLABLE, filterLabel: "Nullable", inputType: InputType.NONE },
      ],
    };
    const value: CriterionValue = { fieldKeyName: "test", filterValues: [{ type: FilterType.NULLABLE }] };
    const mockOnChange = jest.fn();

    const { getByTestId } = render(
      <CriterionRow option={option} value={value} input={() => () => null} onChange={mockOnChange} />
    );

    fireEvent.change(getByTestId("filter_type_select" + 0), { target: { value: FilterType.NOT_NULLABLE } });

    expect(mockOnChange).toBeCalledWith({ type: FilterType.NOT_NULLABLE }, 0);
  });

  test("当设定值改变时，应该触发onChange回调", () => {
    const option: CriterionOption = {
      fieldLabel: "Test field",
      fieldKeyName: "test",
      filterOptions: [
        { filterType: FilterType.NOT_NULLABLE, filterLabel: "NotNullable", inputType: InputType.NONE },
        { filterType: FilterType.NULLABLE, filterLabel: "Nullable", inputType: InputType.NONE },
      ],
    };
    const value: CriterionValue = { fieldKeyName: "test", filterValues: [{ type: FilterType.NULLABLE }] };
    const mockOnChange = jest.fn();
    const MockInput = ({ onChange }: any) => <input data-testid="input" onChange={(e) => onChange?.(e.target.value)} />;

    const { getByTestId } = render(
      <CriterionRow option={option} value={value} input={() => MockInput} onChange={mockOnChange} />
    );

    fireEvent.change(getByTestId("input"), { target: { value: "test value" } });

    expect(mockOnChange).toBeCalledWith({ type: FilterType.NULLABLE, value: "test value" }, 0);
  });
});
