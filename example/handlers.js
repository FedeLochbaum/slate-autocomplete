export const handlers = {
  onChange: ({ setValue, onChange }) => ({ value }) => {
    setValue(value)
    if (onChange) { onChange(value) }
  }
}
