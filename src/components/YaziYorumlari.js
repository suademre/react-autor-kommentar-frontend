import React from 'react'
import YorumFormu from './YorumFormu'
import YorumListesi from "./YorumListesi"

export default function YaziYorumlari(props) {
    return (
        <React.Fragment>
            <YorumListesi yorumlar={props.yorumlar}/>
            <YorumFormu handleSubmit={props.handleSubmit} />
        </React.Fragment>
    )
}
