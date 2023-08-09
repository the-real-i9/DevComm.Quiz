import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import MobileAppVersion from './components/MobileAppVersion'
import DesktopAppVersion from './components/DesktopAppVersion'

const deviceIsMobile = () => navigator.appVersion.includes('Mobile' || 'mobile')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {deviceIsMobile() ? <MobileAppVersion /> : <DesktopAppVersion />}
  </React.StrictMode>,
)
