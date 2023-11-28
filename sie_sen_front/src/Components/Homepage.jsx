import React, { Component, useEffect, useState } from 'react';
import LoginComponent from './LoginComponent';
import { useNavigate } from 'react-router-dom';
import UsersService from '../Services/UsersService';
import Dw_bilanService from '../Services/Dw_bilanService';
import VueBilanService from '../Services/VueBilanService';
import { Card, Metric, Text, AreaChart, Title,BarChart, LineChart, DonutChart } from "@tremor/react";

function Homepage () {
   const [showlog, setShowlog] = useState(false);
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPopUp, setErrorPopUp] = useState(false);
    const [response , setResponse] = useState('');
    const Navigate = useNavigate();
    const [dw_bilan, setDw_bilan] = useState([])
    const [vuebilan, setVuebilan] = useState([])
    const [vuebilanSomme, setVuebilanSomme] = useState([])
    const [approv, setApprov] = useState([])
    const [trans, setTrans] = useState([])
    const [elecProd, setElecProd] = useState([])
    const [uemoaColor, setUemoaColor] = useState(true)
    const [senegalColor, setSenegalColor] = useState(false)
    const [guineeColor, setGuineeColor] = useState(false)
    const [beninColor, setBeninColor] = useState(false)

    const [zone, setZone] = useState("UEMOA")


    useEffect(()=>{
/* 
        fetch("http://localhost:8080/a/c/c",
        {
            method:"GET",
            headers:{ 
                "Accept":"application/json"
            }
        }).then(res =>{
            res.json().then(json =>{
                console.log("response ====",json)
            });
        }); */

        Dw_bilanService.getAll().then((res)=>{
            console.log(res)
            setDw_bilan(res)
            console.log("data dw bilan ==== ",dw_bilan)
        }).catch((err)=>{
            console.log("erroor get All data warehouse",err)
        })

        VueBilanService.getAll().then((res)=>{
            console.log(res)
            setVuebilan(res.data)
            console.log("data vue bilan ==== ",vuebilan)
        }).catch((err)=>{
            console.log("error get view data warehouse")
        })

        VueBilanService.getAllSomme(zone).then((res)=>{
            console.log(res.data)
            setVuebilanSomme(res.data)
            console.log("data vue bilan ==== ",vuebilanSomme)
        }).catch((err)=>{
            console.log("error get consommation finale",err)
        })

        VueBilanService.getAllApprov(zone).then((res)=>{
            console.log(res.data)
            setApprov(res.data)
            console.log("data vue bilan ==== ",approv)
        }).catch((err)=>{
            console.log("error get approvisionnement interieur ", err)
        })

        VueBilanService.getAllTrans(zone).then((res)=>{
            console.log(res.data)
            setTrans(res.data)
            console.log("data vue bilan ==== ",trans)
        }).catch((err)=>{
            console.log("error get transformation ", err)
        })

        VueBilanService.getAllProdEner(zone).then((res)=>{
            console.log(res.data)
            setElecProd(res.data)
            console.log("data vue bilan ==== ",elecProd)
        }).catch((err)=>{
            console.log("error get transformation ", err)
        })
    },[])
   

    const handleChangeEmail = (e) =>{
        let inputEmail = e.target.value;
        setEmail(inputEmail);
        console.log(email);
    }

    const close = () =>{
        setErrorPopUp(false);
    }

      
      const valueFormatter = function(number) {
        return new Intl.NumberFormat("us").format(number).toString() + "K";
      };

    const getDataByCountry = (country)=>{
        setZone(country);
        if(country === "SEN"){
            setSenegalColor(true);
            setUemoaColor(false);
            setBeninColor(false);
            setGuineeColor(false);
        }
        if(country === "BEN"){
            setSenegalColor(false);
            setUemoaColor(false);
            setBeninColor(true);
            setGuineeColor(false);
        }
        if(country === "GUI"){
            setSenegalColor(false);
            setUemoaColor(false);
            setBeninColor(false);
            setGuineeColor(true);
        }
        if(country === "UEMOA"){
            setSenegalColor(false);
            setUemoaColor(true);
            setBeninColor(false);
            setGuineeColor(false);
        }

        VueBilanService.getAllSomme(zone).then((res)=>{
            console.log(res.data)
            setVuebilanSomme(res.data)
            console.log("data vue bilan ==== ",vuebilanSomme)
        }).catch((err)=>{
            console.log("error get consommation finale",err)
        })

        VueBilanService.getAllApprov(zone).then((res)=>{
            console.log(res.data)
            setApprov(res.data)
            console.log("data vue bilan ==== ",approv)
        }).catch((err)=>{
            console.log("error get approvisionnement interieur ", err)
        })

        VueBilanService.getAllTrans(zone).then((res)=>{
            console.log(res.data)
            setTrans(res.data)
            console.log("data vue bilan ==== ",trans)
        }).catch((err)=>{
            console.log("error get transformation ", err)
        })

        VueBilanService.getAllProdEner(zone).then((res)=>{
            console.log(res.data)
            setElecProd(res.data)
            console.log("data vue bilan ==== ",elecProd)
        }).catch((err)=>{
            console.log("error get transformation ", err)
        })
    }  

   

        return (
            <div className='marTop'>
                <section class="home">
                
                    <div class="home-content">
                        <h1>Système d'information énergétique SIE-UEMOA </h1>
                        
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Suscipit sint temporibus veniam laboriosam pariatur quis
                            inventore perspiciatis dolorum, dolores atque reprehenderit
                            rem officia quos mollitia quia veritatis architecto nisi quasi?
                        </p>
                    </div>
                </section>
                <section>
                    <div>
                        <div className='list-card'>
                            <button className={zone=="UEMOA"?"background:green":""} onClick={()=>{getDataByCountry("UEMOA")}}>
                            <Card className={"max-w-xs mx-auto m-2"} decoration="top" decorationColor="orange" Style={uemoaColor ? "background:#40867d":""}>
                                <Text></Text>
                                <Metric Style={uemoaColor ? "text-align:center;color:white":"text-align:center;"}>UEMOA</Metric>
                            </Card>
                            </button>
                            <button onClick={()=>{getDataByCountry("SEN")}}>
                            <Card className="max-w-xs mx-auto m-2" decoration="top" decorationColor="orange"  Style={senegalColor ? "background:#40867d":""}>
                                <Text></Text>
                                <Metric Style={senegalColor ? "text-align:center;color:white":"text-align:center;"}>Sénégal</Metric>
                            </Card>
                            </button>
                            <button onClick={()=>{getDataByCountry("GUI")}}>
                            <Card className="max-w-xs mx-auto m-2" decoration="top" decorationColor="orange" Style={guineeColor ? "background:#40867d":""}>
                                <Text></Text>
                                <Metric Style={guineeColor ? "text-align:center;color:white":"text-align:center;"}>Guinée</Metric>
                            </Card>
                            </button>
                            <button onClick={()=>{getDataByCountry("BEN")}}>
                            <Card className="max-w-xs mx-auto m-2" decoration="top" decorationColor="orange" Style={beninColor ? "background:#40867d":""}>
                                <Text></Text>
                                <Metric Style={beninColor ? "text-align:center;color:white":"text-align:center;"}>Bénin</Metric>
                            </Card>
                            </button>
                        </div>
                    <div className='graphe'>
                    <Card className="m-2">
                        <Title>Données consommation finale {zone}</Title>
                        <AreaChart
                            className="h-72 w-100 mt-4"
                            data={vuebilanSomme}
                            index="annee"
                            categories={["valeur"]}
                            colors={["red"]}
                            valueFormatter={valueFormatter}
                        />
                    </Card>
                    <Card className="m-2">
                        <Title>Données Transformation {zone}</Title>
                        <AreaChart
                            className="h-72 w-100 mt-4"
                            data={trans}
                            index="annee"
                            categories={["valeur"]}
                            colors={["green"]}
                            valueFormatter={valueFormatter}
                        />
                    </Card>
                    </div>

                    <div className='graphe'>
                    <Card className="m-2">
                        <Title>Données approvisiomment interieur {zone}</Title>
                        <BarChart
                            className="h-72 w-100 mt-4"
                            data={approv}
                            index="annee"
                            categories={["valeur"]}
                            colors={["orange"]}
                            valueFormatter={valueFormatter}
                        />
                    </Card>
                    <Card className="m-2">
                        <Title>Données électricité produite {zone}</Title>
                        <DonutChart
                            className="h-72 w-100 mt-4"
                            data={elecProd}
                            category="valeur"
                            index="annee"
                            valueFormatter={valueFormatter}
                            colors={["violet", "green", "rose", "yellow"]}
                        />  
                    </Card>
                    </div>
                    </div>
                </section>
                
            </div>
        );
    }


export default Homepage;