import React, { useState } from 'react';
import {Button, Modal} from "semantic-ui-react";
import { api } from '../api';

export default function SilModal({yazi,push}) {
    const [open, setOpen] = useState(false);
    const [hata,setHata] = useState("")
    const show = ()=>setOpen(true);
    const close = ()=> setOpen(false);

    const handleDelete = (id)=>{
        api()
        .delete(`/posts/${id}`)
        .then(()=>{
            setHata("");
            //model close
            close();
            //push to home
            push(`/`);
        }).catch(()=>{
            setHata("Yaziyi silerken bir hata olustu");
        })
    }

    return (
        <React.Fragment>
            <Button color="red" onClick={show}>Delete</Button>
            <Modal size="mini" open={open} onClose={close}>
                <Modal.Header>Delete</Modal.Header>
                <Modal.Content>
                    <p>{yazi.title} Are you Sure?</p>
                    {hata&&<p>{hata}</p>}
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={close}>Close</Button>
                    <Button positive icon="delete" labelPosition="right" content="Evet,Sil!" onClick={()=>handleDelete(yazi.id)} />
                </Modal.Actions>
            </Modal>
        </React.Fragment>
    )
}
