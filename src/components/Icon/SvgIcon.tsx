import React from 'react'

interface Props {
  name: string
  style?: {
    [key: string]: string
  }
  onClick?: () => any
  title?: string
}

function SvgIcon({ name, style, onClick, title }: Props) {
  return (
    <span
      title={title}
      onClick={() => {
        onClick && onClick()
      }}
    >
      <svg style={style} className="m-iconSvg" aria-hidden="true">
        <use xlinkHref={`#icon-${name}`} />
      </svg>
    </span>
  )
}

export { SvgIcon }
