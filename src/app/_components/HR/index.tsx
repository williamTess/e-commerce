import React from 'react'

import classes from './index.module.scss'

export const HR: React.FC<{
  className?: string
}> = props => {
  const { className } = props

  return <hr className={[classes.hr, className].filter(Boolean).join(' ')} />
}
