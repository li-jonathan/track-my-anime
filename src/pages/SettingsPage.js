import React from 'react'

export const SettingsPage = ({clearList}) => {
  return (
    <div className="settings-page">
      <button onClick={clearList}>clear list</button>
    </div>
  )
}
