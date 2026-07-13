import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import AssessmentScreen from './pages/AssessmentScreen';
import AuthScreen from './pages/AuthScreen';
import DashboardScreen from './pages/DashboardScreen';
import ProfileScreen from './pages/ProfileScreen';
import TransferScreen from './pages/TransferScreen';
import TopUpScreen from './pages/TopUpScreen';
import CircleScreen from './pages/CircleScreen';
import BelanjaScreen from './pages/BelanjaScreen';
import BayarScreen from './pages/BayarScreen';
import CareScreen from './pages/CareScreen';
import ConfusionMonitor from './components/ConfusionMonitor';

function App() {
  return (
    <Router>
      <ConfusionMonitor>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/assessment" element={<AssessmentScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/transfer" element={<TransferScreen />} />
          <Route path="/topup" element={<TopUpScreen />} />
          <Route path="/circle" element={<CircleScreen />} />
          <Route path="/belanja" element={<BelanjaScreen />} />
          <Route path="/bayar" element={<BayarScreen />} />
          <Route path="/care" element={<CareScreen />} />
        </Routes>
      </ConfusionMonitor>
    </Router>
  );
}

export default App;
