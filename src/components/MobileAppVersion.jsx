import React from 'react'
import Spinner from './Spinner'

function MobileAppVersion() {
  const App = React.lazy(() => import('./App'))
    return (
        <React.Suspense fallback={<Spinner />}>
          <App />  
        </React.Suspense>
    )
}

export default MobileAppVersion
