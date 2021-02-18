import React from 'react'


export default function YorumListesi(props) {
    return (
        <React.Fragment>
            <h3>Yorumlar</h3>
            {props.yorumlar.map((yorum)=>{
                return(
                    <div className="ui relaxed list" key={yorum.id}>
                        <div className="item">
                            <img className="ui avatar image" src="/images/avatar/small/daniel.jpg" />
                            <div className="content">
                                <a className="header">{yorum.display_name}</a>
                                <div className="description">{yorum.body}</div>
                            </div>
                        </div>
                    </div>);
                })}
        </React.Fragment>
    );
};
