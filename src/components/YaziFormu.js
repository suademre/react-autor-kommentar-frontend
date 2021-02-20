import { api } from "../api";
import React, {useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';


export default function YaziFormu(props) {

    const[yazi,setYazi] = useState({title: "",content: ""});
    const [hata,setHata] = useState("");

    const {id} = useParams();
    const history = useHistory();

    const onInputChange = (event)=>{
        setYazi({...yazi,[event.target.name]:event.target.value});   
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        setHata("");

        if(props.yazi.title){
            //edit islemi
            api()
            .put(`/posts/${id}`,yazi)
            .then(response=>{
                console.log(response);
                history.push(`/posts/${id}`);
            }).catch(error=>{
                setHata("Baslik ve yazi icerigi alanlari zorunludur.")
            });
        }else {
            //add islemi
            api()
            .post("/posts",yazi)
            .then((response)=>{
                history.push("/");
            }).catch((error)=>{
                setHata("Baslik ve yazi icerigi alanlari zorunludur.");
            });
        }
    };

    useEffect(()=>{
        if(props.yazi.title && props.yazi.content) setYazi(props.yazi)
    },[props.yazi])

    return (
        <React.Fragment>
        {hata &&
        (<div className="ui error message">
            <div className="header">Hata</div>
            <p>{hata}</p>
        </div>)
        }
        <div className="ui form">
            <div className="field">
                <label>Yazi Basligi</label>
                <input name="title" value={yazi.title} onChange={onInputChange} type="text"/>
            </div>
            <div className="field">
                <label>Yazi </label>
                <textarea name="content" value={yazi.content} rows="3" onChange={onInputChange} ></textarea>
            </div>
            <button className="ui primary button" onClick={onFormSubmit}>
            Send
            </button>
            <button className="ui button">
            Iptal et
            </button>
            <Link to="/">AnaSayfa</Link>
        </div>
        </React.Fragment>
    )
}


