import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, makeStyles } from "@mui/material"
import React, { FC } from "react"

type SelectInputProps = {
  options: string[]
  label: string
  value: string
  name: string
  changeController: (name: string, value: string) => void
}

const SelectInput: FC<SelectInputProps> = ({ options, name, label, value, changeController }) => {
  const handleChange = (e: SelectChangeEvent<any>) => {
    const value = e.target.value
    changeController(name, value)
  }

  return (
    <FormControl size="small">
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} label={label} onChange={handleChange}>
        {options.map((value) => (
          <MenuItem value={value}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectInput
