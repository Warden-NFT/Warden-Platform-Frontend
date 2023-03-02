import { TextField, TextFieldProps } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export const TextFieldWrapper = (props: TextFieldProps) => {
  const [innerValue, setInnerValue] = useState("")

  useEffect(() => {
    if (props.value) {
      setInnerValue(props.value as string)
    } else {
      setInnerValue("")
    }
  }, [props.value])

  // @ts-ignore
  const debouncedHandleOnChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(event)
      }
    },
    500
  )

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event?.persist()

      const newValue = event.currentTarget.value
      setInnerValue(newValue)
      debouncedHandleOnChange(event)
    },
    []
  )

  return <TextField {...props} value={innerValue} onChange={handleOnChange} />
}
