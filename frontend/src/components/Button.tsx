import { ReactElement } from "react"

interface buttonProps{
  variant: 'primary' | 'secondary',
  size: 'sm' | 'md' | 'lg',
  text: string,
  startIcon?: ReactElement,
  endIcon?: ReactElement,
  onClick?: ()=>void,
  fullwidth?:boolean,
  loading?:boolean
}

const variantStyles={
  "primary":"bg-purple-600 text-white",
  "secondary":"bg-purple-400 text-purple-500"
}

const sizeStyles={
  "sm":"px-2",
  "md":"px-4",
  "lg":"px-6"
}

const defaultStyles="py-2 rounded-md flex items-center gap-1"

export const Button = (props:buttonProps) => {
  return (
    <div>
      <button onClick={props.onClick} className={` ${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyles} ${props.fullwidth ? "w-full flex justify-center" : ""} ${props.loading ? "opacity-65" : ""}`} disabled={props.loading}>{props.startIcon} {props.text}</button>
    </div>
  )
}
