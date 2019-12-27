import React from 'react'
import classNames from 'classnames'

interface Props {
  children: string
  type?: string
  plain?: boolean
  style?: {
    [index: string]: string
  }
  onClick?: (e: React.MouseEvent) => void
}

function Button({ children, plain, type, style, onClick }: Props) {
  const btnClassName = classNames({
    'm-button': true,
    'm-button--defalut': !plain,
    'm-button--primary': type === 'primary',
    'm-button--plain': plain
  })
  return (
    <button
      className={btnClassName}
      style={style}
      onClick={e => {
        onClick && onClick(e)
      }}
    >
      {children}
    </button>
  )
}

export { Button }
