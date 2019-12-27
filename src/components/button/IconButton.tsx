import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'
import { SvgIcon } from '../index'

interface Props {
  type: string
  icon: string
  active?: boolean
  activeIcon?: string
  onClick?: (key: string) => void
  radius?: boolean
}

function IconButton({
  type,
  active,
  icon,
  activeIcon,
  onClick,
  radius
}: Props) {
  const buttonClass = classnames({
    'm-buttonIcon': true,
    'm-buttonIcon--active': active,
    'm-buttonIcon--radius': radius
  })
  if (_.isNil(activeIcon)) activeIcon = icon
  return (
    <div
      className={buttonClass}
      onClick={() => {
        onClick && onClick(type)
      }}
    >
      <div>
        <SvgIcon
          style={{ width: '28px', height: '28px' }}
          name={active ? activeIcon : icon}
        />
      </div>
    </div>
  )
}

export { IconButton }
