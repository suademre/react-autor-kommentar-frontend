import { api } from "../api";
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

    const YaziFormu = (props)=> {
        console.log("Yazi Formu", props);

    const[yazi,setYazi] = useState({title :"",content :""});
    const [hata,setHata] = useState("")

    const onInputChange = (event)=>{
        setYazi({...yazi,[event.target.name]:event.target.value});   
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        setHata("");
        api()
        .post('/posts',yazi)
        .then(response=>{
            props.history.push("/");
        }).catch(error=>{
            setHata("Baslik ve yazi icerigi alanlari zorunludur.")
        });
    };

    return (
        <React.Fragment>
        {hata &&
        (<div class="ui error message">
            <div class="header">Hata</div>
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

export default withRouter(YaziFormu);
