// import { useState } from 'react'
import { RouterProvider } from 'react-router'
import router from './router'
// import { useEffect } from 'react'
// import httpConfig from '@/shared/api/httpClient'

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
