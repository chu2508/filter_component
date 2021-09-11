import React from "react";
import "./App.css";
import MultiCriteriaFilter from "./components/MultiCriteriaFilter";
import { CriterionOption, CriterionValue, FilterType, InputType } from "./components/MultiCriteriaFilter/types";

const option: CriterionOption = {
  fieldLabel: "Test field",
  fieldKeyName: "test",
  filterOptions: [
    { filterType: FilterType.NOT_NULLABLE, filterLabel: "NotNullable", inputType: InputType.NONE },
    { filterType: FilterType.NULLABLE, filterLabel: "Nullable", inputType: InputType.NONE },
    { filterType: FilterType.INCLUDE, filterLabel: "Include", inputType: InputType.TEXT_INPUT },
    { filterType: FilterType.EXCLUDE, filterLabel: "Exclude", inputType: InputType.TEXT_INPUT },
  ]
};
const value: CriterionValue = { fieldKeyName: "test", filterValues: [{ type: FilterType.NULLABLE }] };
function App() {
  return (
    <div className='App'>
      <MultiCriteriaFilter options={[option]} values={[value]} />
    </div>
  );
}

export default App;
