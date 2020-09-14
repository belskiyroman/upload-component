import React, { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'

type ButtonProps = {
	text: string,
	className?: string,
}

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({ className, text, ...rest }) => (
	<button className={cn('Button', className)} {...rest}>{text}</button>
)

export default Button
