import React, { FC } from 'react'
import cn from 'classnames'

type ControlTitleProps = {
	title: string
	className?: string
}

const ControlTitle: FC<ControlTitleProps> = ({ title, className, children }) => (
	<div className={cn('ControlTitle', className)}>
		<label className="ControlTitle__title">{title}</label>
		{children}
	</div>
)

export default ControlTitle
