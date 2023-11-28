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
import VenteEnergieNonFournie from './Components/VenteEnergieNonFournie';
import Header from './Components/Header';
import Homepage from './Components/Homepage';
import HomeIndustrie from './Components/Industrie/HomeIndustrie';
import HomeHydrocarbure from './Components/Hydrocarbure/HomeHydrocarbure';
import Presentation from './Components/Presentation';
import Rapports from './Components/Rapports';
import Stats from './Components/Stats';
import Bilan from './Components/Bilan';
import {registerLicense} from '@syncfusion/ej2-base';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIfEx0TXxbf1xzZFBMYVxbQHFPMyBoS35RdURiW3dedXVVQmhUVEV1");

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
              <Header/>
                <Routes>
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
                      <Route path='/ventenf'  element={<VenteEnergieNonFournie />}></Route>
                      <Route path='/industrie'  element={<HomeIndustrie />}></Route>
                      <Route path='/hydrocarbure'  element={<HomeHydrocarbure />}></Route>
                      <Route path='/stats'  element={<Stats />}></Route>
                      <Route path='/accueil'  element={<Homepage />}></Route>
                      <Route path='/presentation'  element={<Presentation />}></Route>
                      <Route path='/rapports'  element={<Rapports />}></Route>
                      <Route path='/bilan'  element={<Bilan />}></Route>

                  </Route>
                  <Route path='/' exact   element={ <LoginComponent/>}></Route>
                </Routes>
                
              </div>
          <FooterComponent/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
