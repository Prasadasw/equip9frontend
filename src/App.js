import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/registration/registration';
import LoginPage from './components/login/loginPage';
import Profile from './components/profile/profilepage';
import WelcomeUser from './components/welcomeuser/WelcomeUser';
import NewProfile from './components/Newprofile/newprofile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path='/welcomeuser/:id' element={<WelcomeUser />} />
        <Route path='/newprofile' element ={< NewProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
