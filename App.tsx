import { useEffect } from 'react'

function App() {

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [])

  return (
    <>
      {/* seu conteúdo */}
    </>
  )
}

export default App
