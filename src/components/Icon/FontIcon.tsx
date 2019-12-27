import React from 'react'
import _ from 'lodash'

interface Props {
  name: string
  color?: string
  size?: number
}

function FontIcon({ name, color, size }: Props) {
  return (
    <span
      style={{
        color: color || 'inherit',
        fontSize: _.isNumber(size) ? `${size}px` : '14px'
      }}
      className={`iconfont icon-${name} m-iconFont`}
    />
  )
}

export { FontIcon }
