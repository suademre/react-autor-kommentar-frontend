
import React, { useEffect, useState } from 'react'
import YaziYorumlari from './YaziYorumlari';
import { api } from "../api";
import axios from 'axios';



export default function YaziDetayi(props) {

    

    const {id} = props.match.params;
    const [yaziDetayi,setYaziDetayi] = useState({});
    const [yorumlar,setYorumlar] = useState([]);
    //const [display_name,setDisplay_name] = useState('');
    //const [body, setBody] = useState('');
    

    const handleCommentSubmit = (event,yorum) => {
        event.preventDefault();
        api()
        .post(`/posts/${id}/comments`, yorum)
        .then(response=>{
            setYorumlar([...yorumlar, response.data]);
            
        }).catch(error=>{
            console.log(error);
        });
    };

    

    useEffect(()=>{
        axios
        .all([
            api().get(`/posts/${id}`),
            api().get(`/posts/${id}/comments`)
        ])
        .then(response=>{
            
            setYaziDetayi(response[0].data);
            setYorumlar(response[1].data);
        }).catch(error=>{
            console.log(error);
        })

        {/*
        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
        .then(response=>{
            setYaziDetayi(response.data);
        })
        .catch(error=>{
            console.log(error)
        });

        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)
        .then(response=>{
            console.log(response);
            setYorumlar(response.data);
        });
        */}
        
    }, []);


    
    return (
        <React.Fragment>
            <h2 className="ui header">{yaziDetayi.title}</h2>
            <p>{yaziDetayi.created_at}</p>
            <p>{yaziDetayi.content}</p>
            <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleCommentSubmit} />
            {/* 
                Yorumlar basligi 
                Yorumlar Listesi 
                Yorum Yazma Formu
            */}
            
                {/*
                program ilk calistiginda handleCommentSubmit i gondermemek icin fonsiyon icine aliyoruz.
                */}
              
        </React.Fragment>
    );
}
