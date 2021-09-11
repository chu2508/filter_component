import React, { ComponentType, useState } from "react";
import CriterionRow from "./components/CriterionRow";
import TextInput from "./components/TextInput";
import { CriterionOption, CriterionValue, InputComponentProps, InputType } from "./types";

interface MultiCriteriaFilterProps {
  options: CriterionOption[];
  values?: CriterionValue[];
}
const MultiCriteriaFilter = (props: MultiCriteriaFilterProps) => {
  const { values = [], options } = props;
  const [criterionValues, setCriterionValues] = useState(values);
  const onAddCriterionRow = () => {
    const option = options[0];

    const value: CriterionValue = { fieldKeyName: option.fieldKeyName, filterValues: [{ type: option.filterOptions[0].filterType }] };
    setCriterionValues((values) => [...values, value]);
  };
  return (
    <div>
      <div>{options.length > 0 && <button onClick={onAddCriterionRow}>Add</button>}</div>
      <div>
        {criterionValues.map((value, index) => {
          const option = options.find((opt) => opt.fieldKeyName === value.fieldKeyName);

          return option ? (
            <CriterionRow
              key={index}
              option={option}
              value={value}
              input={matchInputTypeComponent}
              onChange={(val, idx) => {
                setCriterionValues((values) => {
                  values[index] = { ...values[index] };
                  values[index].filterValues[idx] = val;
                  return [...values];
                });
              }}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

const matchInputTypeComponent = (type: InputType): ComponentType<InputComponentProps> => {
  switch (type) {
    case InputType.NONE:
      return () => null;
    case InputType.TEXT_INPUT:
      return TextInput;
    default:
      return () => null;
  }
};

export default MultiCriteriaFilter;
