import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ListActeursComponent from './Components/ListActeursComponent';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import ListVenteNiveauTension from './Components/ListVenteNiveauTension';
import AddNiveauTensionPage from './Components/AddNiveauTensionPage';
import ListVenteUsage from './Components/ListVenteUsage';
import AddVenteUsage from './Components/AddVenteUsage';
import UpdateActeurcomponent from './Components/UpdateActeurcomponent';
import LoginComponent from './Components/LoginComponent';
import PrivateRoute from './PrivateRoute';
import { useEffect, useState } from 'react';
import MenageElecList from './Components/MenageElecList';
import MenageElecZrFrom from './Components/MenageElecZrFrom';
import AchatEnergieParSenelec from './Components/AchatEnergieParSenelec';
import AddAchatFormComponent from './Components/AddAchatFormComponent';
import VenteParSecteurComponent from './Components/VenteParSecteurComponent';
import AddVenteParSecteurFormComponent from './Components/AddVenteParSecteurFormComponent';
import ConsommationMoyParCommune from './Components/ConsommationMoyParCommune';

function App() {
  const [isLogged, setIsLogged]=useState(false);
 
  useEffect(()=>{
   if(localStorage.getItem('isLogged')){
    setIsLogged(localStorage.getItem('isLogged'));
   }
    else{

    }
},[])
  return (
    <div>
      <BrowserRouter>
        <div className='container'>
              <div className="container">
                <Routes>
                  <Route path='/' exact   element={ <LoginComponent/>}></Route>
                  <Route element={ <PrivateRoute isLogged={isLogged}/>}>
                      <Route path='/acteurs' element={<ListActeursComponent/>}></Route>
                      <Route path='/updateActeurs/:id' element={<UpdateActeurcomponent/>}></Route>
                      <Route path='/nivten'  element={<ListVenteNiveauTension/>}></Route>
                      <Route path='/addnivtenpage'  element={<AddNiveauTensionPage/>}></Route>
                      <Route path='/usage'  element={<ListVenteUsage/>}></Route>
                      <Route path='/addUsage'  element={<AddVenteUsage/>}></Route>
                      <Route path='/electricite'  element={<HeaderComponent />}></Route>
                      <Route path='/nbMenage'  element={<MenageElecList />}></Route>
                      <Route path='/AddMenageZRPage/:id'  element={<MenageElecZrFrom />}></Route>
                      <Route path='/achatsenelec'  element={<AchatEnergieParSenelec />}></Route>
                      <Route path='/addachat'  element={<AddAchatFormComponent />}></Route>
                      <Route path='/venteparsecteur'  element={<VenteParSecteurComponent />}></Route>
                      <Route path='/addventesecteur'  element={<AddVenteParSecteurFormComponent />}></Route>
                      <Route path='/consomoy'  element={<ConsommationMoyParCommune />}></Route>

                      
                  </Route>
                  
                </Routes>
                
              </div>
          <FooterComponent/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
