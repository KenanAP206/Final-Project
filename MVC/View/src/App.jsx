import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Pages/User/Home';
import Series from './Pages/User/Series'
import AllShows from './Pages/User/All Shows'
import Blog from './Pages/User/Blog'
import Contact from './Pages/User/Contact'
import Movie from './Pages/User/Movie'
import Login from './Pages/User/Login'
import Register from './Pages/User/Register'
import Payment from './Pages/User/Payment'
import Profile from './Pages/User/Profile'
import NotFound from './Pages/User/NotFound';
import UserRoot from './Pages/User/UserRoot';
import AdminRoot from './Pages/Admin/AdminRoot'
import Dashboard from './Pages/Admin/Dashboard/index'
import Users from './Pages/Admin/UsersPage/Users'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<UserRoot />}>
          <Route index element={<Home />} />
          <Route path='series/:id' element={<Series />} />
          <Route path='movie/:id' element={<Movie />} />
          <Route path='allshows' element={<AllShows />} />
          <Route path='blog' element={<Blog />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />} />
          <Route path='payment' element={<Payment />} />
          <Route path='*' element={<NotFound />} />
        </Route>
     
        <Route path='/admin' element={<AdminRoot />}>
          <Route index element={<Dashboard />} />
          <Route path='users' element={<Users />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;