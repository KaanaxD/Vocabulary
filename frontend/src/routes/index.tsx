import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import VocabPage from '../pages/VocabPage'
import Placeholder from '../components/common/Placeholder'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vocab" element={<VocabPage />} />
      <Route path="/practice" element={<Placeholder title="Practice" />} />

    </Routes>
  )
}
