import React, { FC } from 'react'
import cn from 'classnames'
import './Card.css'

type CardProps = {
	type?: 'area'
}

const Card: FC<CardProps> = ({ type, children }) => (
	<div className={cn('Card', {
			[`Card--${type}`]: type,
		})}>
		{children}
	</div>
)

export default Card
