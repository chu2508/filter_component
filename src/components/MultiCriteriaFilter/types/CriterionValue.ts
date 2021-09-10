import FilterType from "./FilterType";

export default interface CriterionValue {
  fieldKeyName: string;
  filterValues: {
    type: FilterType,
    value?: any
  }[]
}