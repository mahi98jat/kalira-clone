import { Checkbox, FormControlLabel } from "@mui/material"
import React, { FC } from "react"
type CheckBoxProps = {
  value: boolean
  changeHandler: (name: string, value: boolean) => void
  name: string
  label: string
}
const CheckBoxInput: FC<CheckBoxProps> = ({ value, changeHandler, name, label }) => {
  const handleChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    changeHandler(name, checked)
  }
  return <FormControlLabel label={label} labelPlacement="start" control={<Checkbox checked={value} onChange={handleChange} />} />
}

export default CheckBoxInput
