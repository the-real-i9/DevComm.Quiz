import React from 'react'
import Spinner from './Spinner'

function DesktopAppVersion() {
    const App = React.lazy(() => import('./App'))
    return (
        <div className="desktop-app-container">
            <div className="phone">
                <React.Suspense fallback={<Spinner />}>
                    <App />
                </React.Suspense>
            </div>
        </div>
    )
}

export default DesktopAppVersion
