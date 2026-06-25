import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import VocabPage from '../pages/VocabPage'
import Placeholder from '../components/common/Placeholder'
import ProtectedRoute from '../components/common/ProtectedRoute'
import ErrorBoundary from '../components/common/ErrorBoundary'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
      <Route path="/vocab" element={<ErrorBoundary><ProtectedRoute><VocabPage /></ProtectedRoute></ErrorBoundary>} />
      <Route path="/practice" element={<ErrorBoundary><Placeholder title="Practice" /></ErrorBoundary>} />

    </Routes>
  )
}
