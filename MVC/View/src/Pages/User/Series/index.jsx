import React from 'react'
import Content from '../../../Components/User/Series/Content'
import Comment from '../../../Components/User/Series/Comment'
import Recent from '../../../Components/User/Series/Recent'
import Continue from '../../../Components/User/Series/Continue'
function index() {
  return (
    <div>
      <Content/>
      <Recent/>
      <Continue/>
      <Comment/>
    </div>
  )
}

export default index
