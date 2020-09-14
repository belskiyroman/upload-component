import React, { FC, ReactElement } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

type DropzoneRenderProps = {
	isDragActive: boolean
}

type DropzoneProps = {
	children(props: DropzoneRenderProps): ReactElement
}

const Dropzone: FC<DropzoneOptions & DropzoneProps> = ({ children, ...config }) => {
	const {getRootProps, getInputProps, isDragActive} = useDropzone(config)

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{children({ isDragActive })}
		</div>
	)
}

export default Dropzone
