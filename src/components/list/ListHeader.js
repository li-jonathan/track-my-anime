

import React from 'react'

export const ListHeader = () => {
  return (
    <div className="list-item list-item_header">
      <div className="list-header--buffer" />
      <div className="list-header--title">Title</div>
      <div className="list-header--detail">Status</div>
      <div className="list-header--detail">Language</div>
      <div className="list-header--detail">Rating</div>
      <div className="list-header--buffer" />
    </div>
  )
}
