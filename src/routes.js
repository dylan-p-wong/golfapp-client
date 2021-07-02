import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import MyGame from 'src/pages/MyGame';
import MyCoaching from 'src/pages/MyCoaching';
import LessonPage from './pages/Lesson';
import Lesson from './components/lesson/Lesson';
import SwingPage from './pages/Swing';
import AddSwing from './components/swing/AddSwing';
import ViewSwing from './components/swing/Swing';
import AddLesson from './components/lesson/AddLesson';
import { requireAuthentication, noAuthentication } from './components/shared/Authentication';

const AuthedAccount = requireAuthentication(Account);
const AuthedDashboard = requireAuthentication(Dashboard);
const AuthedMyGame = requireAuthentication(MyGame);
const AuthedMyCoaching = requireAuthentication(MyCoaching);
const AuthedLessonPage = requireAuthentication(LessonPage);
const AuthedSwingPage = requireAuthentication(SwingPage);
//const AuthedDrillPage = requireAuthentication(Drill);

const NoAuthedLogin = noAuthentication(Login);
const NoAuthedRegister = noAuthentication(Register);

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AuthedAccount /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element:  <AuthedDashboard />},
      { path: 'products', element: <ProductList /> },
      { path: 'mygame', element: <AuthedMyGame /> },
      { path: 'mycoaching', element: <AuthedMyCoaching /> },
      { path: 'lesson', element: <AuthedLessonPage />, children: [ {path: ':id', element: <Lesson />}, {path: 'add', element: <AddLesson />} ]},
      { path: 'swing', element: <AuthedSwingPage />, children: [ {path: ':id', element: <ViewSwing />}, {path: 'add', element: <AddSwing />} ]},
      { path: 'drill', children: [ {path: 'add', element: <AddSwing />}, {path: ':id', element: <ViewSwing />} ]},
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <NoAuthedLogin /> },
      { path: 'register', element: <NoAuthedRegister /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
