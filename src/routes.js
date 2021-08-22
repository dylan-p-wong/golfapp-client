import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register';
import MyGame from 'src/pages/MyGame';
import MyCoaching from 'src/pages/MyCoaching';
import LessonPage from './pages/Lesson';
import SwingPage from './pages/Swing';
import AddSwing from './components/swing/AddSwing';
import Swing from './components/swing/Swing';
import Lesson from './components/lesson/Lesson';
import Subscriptions from './pages/Subscriptions';
import { requireAuthentication, noAuthentication } from './components/shared/Authentication';
import ProfilePage from './pages/Profile';
import Home from './pages/Home';
import Main from './components/main/Main';
import About from './components/about/About';
import Contact from './components/contact/Contact';

const NoAuthedLogin = noAuthentication(Login);
const NoAuthedRegister = noAuthentication(Register);
const AuthedDashboardLayout = requireAuthentication(DashboardLayout);

const routes = [
  {
    path: 'app',
    element: <AuthedDashboardLayout />,
    children: [
      { path: 'profile/:_id', element: <ProfilePage />},
      { path: 'account', element: <Account /> },
      // { path: 'coaches', element: <CustomerList /> },
      { path: 'dashboard', element:  <Dashboard />},
      { path: 'mygame', element: <MyGame /> },
      { path: 'mycoaching', element: <MyCoaching /> },
      { path: 'lesson', element: <LessonPage />, children: [ {path: ':_id', element: <Lesson />}, {path: 'edit/:_id', element: <Lesson editView/>} ]},
      { path: 'swing', element: <SwingPage />, children: [ {path: ':_id', element: <Swing />}, {path: 'add', element: <AddSwing />} ]},
      { path: 'subscription', element: <Subscriptions />},
      { path: '*', element: <Navigate to="/" /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <NoAuthedLogin /> },
      { path: 'register', element: <NoAuthedRegister /> },
      { path: '404', element: <Navigate to="/" /> },
      { path: '/', element: <Home />, children: [{path: '/', element: <Main />}, {path: 'about', element: <About />}, {path: 'contact', element: <Contact />}] },
      { path: '*', element: <Navigate to="/" /> }
    ]
  }
];

export default routes;
