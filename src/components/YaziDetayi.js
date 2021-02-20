
import React, { useEffect, useState } from 'react'
import YaziYorumlari from './YaziYorumlari';
import { api } from "../api";
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import SilModal from './SilModal';



export default function YaziDetayi() {

    const {id} = useParams();
    const [yaziDetayi,setYaziDetayi] = useState({});
    const [yorumlar,setYorumlar] = useState([]);
    //const [display_name,setDisplay_name] = useState('');
    //const [body, setBody] = useState('');

    const history = useHistory()
    

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
        
    }, []);


    
    return (
        <React.Fragment>
            <h2 className="ui header">{yaziDetayi.title}</h2>
            <p>{yaziDetayi.created_at}</p>
            <div className="ui buttons">
                <Link to={`/posts/${id}/edit`} className="ui positive button">Update</Link>
                <div className="or"></div>
                {/* <button className="ui red button">Delete</button> */}
                <SilModal yazi={yaziDetayi} push={history.push}/>
            </div>
            <p>{yaziDetayi.content}</p>
            <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleCommentSubmit} />
              
        </React.Fragment>
    );
}
