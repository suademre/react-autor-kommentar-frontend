import React, {useState} from 'react'

export default function YorumFormu(props) {
    const YORUM_BASLANGIC = {
        display_name:"",
        body:"",
    };
    const[yorum,setYorum] = useState(YORUM_BASLANGIC);

    const handleOnChange = event=>{
        setYorum({...yorum, [event.target.name]:event.target.value});
    }
    return (
        <React.Fragment>
             <h3>Yorum Yaz</h3>
                <form className="ui form" onSubmit={(event)=>{
                    props.handleSubmit(event,yorum)
                    setYorum(YORUM_BASLANGIC);
                    }}> 
                    <div className="ui mini icon input">
                        <input name="display_name" type="text" placeholder="Adiniz..." onChange={handleOnChange} value={yorum.display_name}/>
                    </div>
                    <textarea name="body" placeholder="Yorumunuz.." rows="3" onChange={handleOnChange} value={yorum.body}></textarea>
                    <button className="ui blue button" type="submit">Yorum Gonder</button>
                </form>
        </React.Fragment>
    )
}
