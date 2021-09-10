import FilterType from "./FilterType";
import InputType from "./InputType";

export default interface CriterionOption {
  fieldLabel: string;
  fieldKeyName: string;
  filterOptions: {
    filterLabel: string;
    filterType: FilterType,
    inputType: InputType
  }[]
}