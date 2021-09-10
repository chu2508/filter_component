enum FilterType {
  /** 包含 */
  INCLUDE = 1,
  /** 不包含 */
  EXCLUDE,
  /** 可为空 */
  NULLABLE,
  /** 不可为空 */
  NOT_NULLABLE,
  /** 在时间范围内 */
  TIME_RANGE_IN,
  /** 在时间范围外 */
  TIME_RANGE_OUT,
  /** 在数字范围内 */
  NUMBER_RANGE_IN,
  /** 在数字范围外 */
  NUMBER_RANGE_OUT,
}
export default FilterType;
