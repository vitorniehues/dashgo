import { UseControllerProps, Path, FieldValues, useController } from "react-hook-form"
import NumberFormat, { NumberFormatProps } from "react-number-format"
import { Input, InputProps } from "./Input"

type ControlledInputWithFormatProps<T> =
  NumberFormatProps<InputProps> & UseControllerProps<T, Path<T>>


export function ControlledInputWithFormat<T extends FieldValues = FieldValues>
  ({ name, control, ...rest }: ControlledInputWithFormatProps<T>) {

  const { field, fieldState: { error } } = useController({ name, control })
  return (
    <NumberFormat
      error={error}
      customInput={Input}
      getInputRef={field.ref}
      {...field}
      {...rest}
    />
  )
} 