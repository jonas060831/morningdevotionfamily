import React from 'react'
import Broadcast from './page.client'

const page = () => {

  return <>

    <Broadcast streamIOAPIKey={process.env.STREAM_API_KEY!}/>
  </>
}

export default page