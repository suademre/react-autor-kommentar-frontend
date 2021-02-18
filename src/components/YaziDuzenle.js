import React, { useEffect, useState } from 'react'
import { api } from '../api';

import YaziFormu from "./YaziFormu";

export default function YaziDuzenle(props) {

    const{id} = props.match.params;
    const[yazi,setYazi] = useState({});
    
    useEffect(()=>{
        api()
        .get(`/posts/${id}`)
        .then(response=>{
            setYazi({title: response.data.title, content: response.data.content});
        })
    },[])

    return (
        <div>
            <h2>Yazi Duzenleme Formu</h2>
            <YaziFormu yazi={yazi}/>
        </div>
    )
}
