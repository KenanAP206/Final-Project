import React from 'react'
import Content from '../../../Components/User/Movie/Content'
import Comment from '../../../Components/User/Movie/Comment'
import Recent from '../../../Components/User/Movie/Recent'
import Continue from '../../../Components/User/Movie/Continue'
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
