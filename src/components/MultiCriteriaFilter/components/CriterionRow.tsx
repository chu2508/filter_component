import React, { ChangeEventHandler, ComponentType, ReactElement } from "react";
import { CriterionOption, CriterionValue, FilterType, InputType } from "../types";

interface CriterionRowProps {
  /** 这一行的条件配置*/
  option: CriterionOption;
  /** 这一行的数据*/
  value: CriterionValue;
  /** 用来获取对应输入类型的 输入组件 */
  input: (type: InputType) => ComponentType<{ onChange?: (value: any) => void; value?: any }>;
  /** 过滤条件类型或是设定值改变时触发 */
  onChange?: (value: { type: FilterType; value?: any }, index: number) => void;
}
const CriterionRow = (props: CriterionRowProps) => {
  const { option, value, input } = props;
  return (
    <div>
      <div>{option.fieldLabel}</div>
      <div>
        {/* 渲染过滤条件类型选择器 */}
        {value.filterValues.map((item, index) => {
          const filterTypeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
            const afterType = Number(event.target.value) as FilterType;
            if (afterType !== value.filterValues[index].type) {
              const inputType = option.filterOptions.find((opt) => opt.filterType === item.type)?.inputType;
              const value = inputType ? matchInputTypeDefaultValue(inputType) : undefined;
              props.onChange?.({ type: afterType, value }, index);
            }
          };
          return (
            <div key={index}>
              <select data-testid={'filter_type_select' + index} value={item.type} onChange={filterTypeChange}>
                {option.filterOptions.map((filterOption, index) => (
                  <option value={filterOption.filterType} key={index}>
                    {filterOption.filterLabel}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      <div>
        {/* 渲染设定值输入组件 */}
        {value.filterValues.map((item, index) => {
          const inputType = option.filterOptions.find((opt) => opt.filterType === item.type)?.inputType;

          if (inputType === undefined) return null;

          const onInputChange = (value: any) => {
            props.onChange?.({ type: item.type, value }, index);
          };
          const Component = input(inputType);
          return <Component key={index} onChange={onInputChange} value={item.value} />;
        })}
      </div>
    </div>
  );
};

const matchInputTypeDefaultValue = (type: InputType): any => {
  switch (type) {
    case InputType.NONE:
      return undefined;
  }
};

export default CriterionRow;
