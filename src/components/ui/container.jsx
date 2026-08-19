import React from 'react'

export default function Container({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ maxWidth: 'var(--container-max-width, 1100px)' }}
      {...props}
    >
      {children}
    </Component>
  )
}
