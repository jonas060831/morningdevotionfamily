import Image from 'next/image'
import React from 'react'

const LoadingScreen = () => {
  return (
    <div
     style={{ width: '90vw', height: '86vh', display: 'flex', alignItems: 'center', justifyContent: "center" }}
    >
      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
        <Image src="/assets/svgs/icons/loading.svg" alt='loading...' fill />
      </div>
    </div>
  )
}

export default LoadingScreen