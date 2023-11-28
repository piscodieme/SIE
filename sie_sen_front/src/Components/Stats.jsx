import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Card, Metric, Text, AreaChart, Title,BarChart, LineChart, DonutChart } from "@tremor/react";
import VueBilanService from '../Services/VueBilanService';
import exportFromJSON from 'export-from-json';
import Chart from "chart.js/auto";
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

export default function Stats() {

    let ref = useRef(null);
    const downloadImage = useCallback(()=>{
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = ref.current.toBase64Image();
        link.click();
    },[]);

    const [rubrique1, setRubrique1] = useState([]);
    const [stats, setStats] = useState([]);
    const [rubrique2, setRubrique2] = useState([]);
    const [newdata, setNewdata] = useState({});
    const [statsEmpty, setStatsEmpty] = useState(false);

    const rub1 = [
        {
            id:1, 
            libelle:"Approvisionnement intérieur",
            rub2:[
                {id:1, libelle:"Production"},
                {id:2, libelle:"Importation"},
                {id:3, libelle:"Exportation"},
                {id:4, libelle:"Soutages aériens"},
                {id:5, libelle:"Soutages maritimes"},
                {id:6, libelle:"Variation de stocks"}
            ]
        },
        {
            id:2, 
            libelle:"Transformation",
            rub2: [
                {id:7, libelle:"Centrale électrique publique"},
                {id:8, libelle:"Autoproduction d'électricité"},
                {id:9, libelle:"Raffinerie de pétrole"},
                {id:10, libelle:"Production de charbon de bois"},
                {id:11, libelle:"Secteur energie"},
                {id:12, libelle:"Perte de distribution"}
            ]
        },
        {
            id:3, 
            libelle:"Consommation finale",
            rub2:[
                {id:13, libelle:"Industrie"},
                {id:14, libelle:"transport"},
                {id:15, libelle:"Résidentiel"},
                {id:16, libelle:"Autres secteurs"},
                {id:17, libelle:"utilisations non énergétiques"}
            ]
        },
        {
            id:4, 
            libelle:"Electricité produite",
            rub2: [
                {id:18, libelle:"Electricité produite par les centrales publiques"},
                {id:19, libelle:"Electricité produite par les autoproducteurs"},
                {id:20, libelle:"Electricité décentralisée (solaire)"}
            ]
        }
    ];
/* let approv = [{"id":1, "libelle":"Production"},{"id":2, "libelle":"Importation"},{"id":3, "libelle":"Exportation"},{"id":4, "libelle":"Soutages aériens"},{"id":5, "libelle":"Soutages maritimes"},{"id":6, "libelle":"Variation de stocks"}]
let trans = [{"id":7, "libelle":"Centrale électrique publique"},{"id":8, "libelle":"Autoproduction d'électricité"},{"id":9, "libelle":"Raffinerie de pétrole"},{"id":10, "libelle":"Production de charbon de bois"},{"id":11, "libelle":"Secteur energie"},{"id":12, "libelle":"Perte de distribution"}]
let conso = [{"id":13, "libelle":"Industrie"},{"id":14, "libelle":"transport"},{"id":15, "libelle":"Résidentiel"},{"id":16, "libelle":"Autres secteurs"},{"id":17, "libelle":"utilisations non énergétiques"}]
let enerprod = [{"id":18, "libelle":"Electricité produite par les centrales publiques"},{"id":19, "libelle":"Electricité produite par les autoproducteurs"},{"id":20, "libelle":"Electricité décentralisée (solaire)"}]
 */
      
      


    //https://www.youtube.com/shorts/irHUsHbjIY4
    //https://www.youtube.com/watch?v=-S6zEpqnhSI
    //https://www.youtube.com/watch?v=KuWLhLFfeRc  LINK FOR DOWNLOAD
    //rub2 = [approv,trans,conso,enerprod]

    //https://www.youtube.com/watch?v=vwoijhliTAI  link video bilan
    


    const {register, handleSubmit} = useForm();

    const valueFormatter = function(number) {
        return new Intl.NumberFormat("us").format(number).toString() + "K";
      };

/* const handleChangeRubrique1 = (e) =>{
    let inputRubrique1 = e.target.value;
    setRubrique(inputRubrique1);
    console.log(rubrique1);
    VueBilanService.getRub2forRub1(inputRubrique1).then((res)=>{
        setRubrique2(res.data);
        console.log(res.data);
    }).catch((error)=>{
        console.log("error get error rubrique 2 for rubrique 2 ==== ",error);
    })
} */
const changeRub1=(event)=>{
    setRubrique1(event.target.value);
    setRubrique2(rub1.find(rb => rb.id == event.target.value).rub2)   
}

const onSubmit = (data)=>{
    const dataform =  {
        ...data,
        ID_RUBRIQUE1:rubrique1
    }
    setStatsEmpty(true)
    setNewdata(dataform) 
    VueBilanService.sendRequest(dataform).then((res)=>{
        setStats(res.data)
        console.log('UUUUUUUUUUUUUUUUUUUUUUU ',res.data);
    }).catch((error)=>{
        console.log("error sending request ===", error)
    })
}
console.log("newDATA ======> ",stats);

const downloadToCSV=()=>{
    const newStats = {};
    let fileName = 'example'
    let exportTypee = exportFromJSON.types.csv;
    exportFromJSON({ data: stats, fileName: fileName, exportType: exportTypee })
    console.log(" Stats +++++++ ",stats);

    console.log("new Stats ======= ",newStats);
    /* const filename = 'dataFromJsonToCSV';
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({newStats, filename,exportType}); */
}
  return (
    <div className='marTop' >
       
       <div Style="text-align:center">
        <h2 className='myFont'>Les Statistiques sur les produits énergétiques</h2>
        <form onSubmit={handleSubmit(onSubmit)} >
        <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 row-cols-xl-4 g-3 shadow-lg m-3 p-3 request-form">
            <div className="col-md-2">
                <div class="form-group">
                    <label for="Rubrique1">Rubrique 1 :</label>
                    <select id="selectField1" name="selectField1" className="form-select" onChange={changeRub1} required >
                      <option value="">---Rubrique 1---</option>
                        {
                            rub1.map(rub=>(
                                <option value={rub.id}>{rub.libelle}</option>
                            ))
                        }                     
                    </select>
                </div>
            </div>
            <div className="col-md-2">
                <div class="form-group">
                    <label for="rubrique2">Rubrique 2 :</label>
                    <select id="selectField2" name="selectField2" className="form-select" {...register("ID_RUBRIQUE2")} required >
                          <option value="">---Rubrique 2---</option>
                          {
                             rubrique2.map(rub=>(
                                <option value={rub.id}>{rub.libelle}</option>
                                ))
                          }                 
                    </select>
                </div>
            </div>
            <div className="col-md-2">
                <div class="form-group">
                    <label for="pays">Pays :</label>
                    <select id="selectField" name="selectField" className="form-select" {...register("CodePays")} required >
                        <option key={1} value={'UEMOA'}>UEMOA</option>
                        <option key={2} value={'SEN'}>Sénégal</option>
                        <option key={3} value={"BEN"}>Bénin</option>
                        <option key={4} value={"GUI"}>Guinée</option>                       
                    </select>
                </div>
            </div>
            <div className="col-md-2">
                <div class="form-group">
                    <label for="Année">Année :</label>
                    <select id="selectFieldAnnee" name="selectFieldAnnee" className="form-select" {...register("ANNEE")} required >
                        <option key={1} value={2018}>2018</option>
                        <option key={2} value={2019}>2019</option>
                        <option key={3} value={2020}>2020</option>
                        <option key={4} value={2021}>2021</option>                       
                    </select>
                </div>
            </div>
        <div id='idbtn'>
        <button  className='myButton'>Visualiser</button>
        </div>
        </div>
        </form>
    {statsEmpty &&
        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 g-3 shadow-lg m-3 p-3">
        <button className='otherButton' Style='width:10%; float:right; font-size:15px' onClick={()=>{downloadToCSV()}}>Export CSV</button>
        

        <Card className='h-75'>
        <button className='otherButton' Style='width:10%; left:80%; font-size:15px' onClick={downloadImage}>Export PNG</button>
            <Title>{}</Title>
                <BarChart
                    ref={ref}
                    className="h-72 w-100 mt-1"
                    data={stats}
                    index="libelle_produit"
                    categories={["valeur"]}
                    colors={["indigo"]}
                    showAnimation = "true"
                    valueFormatter={valueFormatter}
                />
            </Card>
            <Card className='h-75'>
            <button className='otherButton' Style='width:10%; left:80%; font-size:15px' onClick={downloadImage}>Export PNG</button>
                <Title>{}</Title>
                <AreaChart
                    className="h-72 w-100 mt-1"
                    data={stats}
                    index="libelle_produit"
                    categories={["valeur"]}
                    colors={["red"]}
                    valueFormatter={valueFormatter}
                    showAnimation = "true"
                />
            </Card> 
            <Card className='h-75'>
            <button className='otherButton' Style='width:10%; left:80%; font-size:15px' onClick={downloadImage}>Export PNG</button>
                <Title>{}</Title>
                <DonutChart
                    className="h-72 w-100 mt-4"
                    data={stats}
                    category="valeur"
                    index="libelle_produit"
                    showAnimation = "true"
                    valueFormatter={valueFormatter}
                    colors={["violet", "slate", "rose", "indigo", "cyan", "amber","blue","pink","green","red","purple","yellow"]}
                />     
            </Card>
        </div>
    }
        
        
       </div>
        
    </div>
  )
  
}
