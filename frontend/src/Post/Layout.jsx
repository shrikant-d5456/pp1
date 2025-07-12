import React from 'react'
import { Routes, Route } from 'react-router-dom';
import PostDetails from './PostDetails'
import Createpost from './Createpost'
import EditPost from './EditPost'
import Profile from './Profile'
import Home from './Home'
import Footer from '../components/Footer'
import PostNavbar from '../components/PostNavbar'
import ProtectedRoute from '../Utils/ProtectedRoute'
import FiveStepValidation from "./FiveStepValidation"
import Practioners from './Practioners'
import PostSection from './PostSection'
import SavePost from './SavePost'
import Quize from '../pages/Quize'
import Diseases from '../pages/Diseases'
import Allergies from '../pages/Allergies'
import MedicinalPlants from '../components/MedicinalPlants';
import Sccanner from '../components/Sccanner';
import ScannerPage from '../components/ScannerPage';
const Layout = () => {
  return (
    <>
      <PostNavbar />
      <Sccanner/>
      <Routes>

        <Route path='/' element={<Home />} />
        

        <Route element={<ProtectedRoute />}>
          <Route path='/posts/post/:id' element={<PostDetails />} /> 
          <Route path='/posts/post/post-validatation/:id' element={<FiveStepValidation />} />
          <Route path='/createpost' element={<Createpost />} />
          <Route path='/post/editpost/:id' element={<EditPost />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/save-post' element={<SavePost />} />
          <Route path='/scan-img' element={<ScannerPage />}/>
        </Route>

        <Route path='/post' element={<PostSection />} />
        <Route path='/practitioner' element={<Practioners />} />
        <Route path='/quize' element={<Quize />} />
        <Route path='/diseases' element={<Diseases />} />
        <Route path='/allergies' element={<Allergies />} />
        <Route path='/plant-informaion' element={<MedicinalPlants />} />

      </Routes>
      <Footer />
    </>
  )
}

export default Layout