import React from "react";
import { CriterionOption, CriterionValue, FilterType, InputType } from "./types";

interface MultiCriteriaFilterProps {
  options: CriterionOption[];
  values?: CriterionValue[];
}
const MultiCriteriaFilter = (props: MultiCriteriaFilterProps) => {
  const { values = [] } = props;
  return <div>
  </div>;
};

const option: CriterionOption = {
  fieldLabel: "Test field",
  fieldKeyName: "test",
  filterOptions: [
    { filterType: FilterType.NOT_NULLABLE, filterLabel: "NotNullable", inputType: InputType.NONE },
    { filterType: FilterType.NULLABLE, filterLabel: "Nullable", inputType: InputType.NONE },
  ],
};
const value: CriterionValue = { fieldKeyName: "test", filterValues: [{ type: FilterType.NULLABLE }] };

export default MultiCriteriaFilter;
