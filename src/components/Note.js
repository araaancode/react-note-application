import React, { useState } from 'react'
import Modal from 'react-modal';
import SweetAlert from 'sweetalert-react';
import { MdClose,MdNewspaper} from 'react-icons/md';

import "../App.css"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow:'none',
    backgroundColor:'#fff',
    width:'35%'
  },
};

const Note = () => {
  let subtitle;
  let notes=[]
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [title,setTitle]=useState(null)
  const [description,setDescription]=useState(null)

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#444444';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleChangeTitle(e) {
    e.preventDefault();
    setTitle(e.target.value)
  }

  function handleChangeDescription(e) {
    e.preventDefault();
    setDescription(e.target.value)
  }


  function setLocalValues() {
    console.log(title);
    console.log(description);
    let note={
      id:new Date() * 3,
      title: title,
      description:description
    }

    notes=[...notes,note]
    localStorage.setItem("notes",JSON.stringify(notes))
    closeModal()
  }

  notes=localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []
  return (
   

    <div className="main">
      <button className='btn' onClick={openModal}>+</button>
      <div className='cards'>

        {notes.length == 0 ? <p>There is no notes</p> : notes.map(note=>(
          <div key={note.id} className="card">
            <h2>{note.title}</h2>
            <p>{note.description}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button style={{backgroundColor:'#fff',fontSize:'20px',border:0,cursor:'pointer'}} onClick={closeModal}><MdClose /></button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'#000'}}>Add New Note <MdNewspaper /></h2>

        
        <div class="form-inputs">
            <input type='text' name='title' id='title' placeholder='Enter Note Tilte...' onChange={handleChangeTitle} />
            <input type='text' name='description' id='description' placeholder='Enter Note Description...' onChange={handleChangeDescription} />
            <button onClick={setLocalValues} style={{backgroundColor:'#8B0000',color:'#fff',border:0,cursor:'pointer',padding:'12px 20px',fontSize:'18px',fontWeight:'bold',marginLeft:'25px',width:'90%',marginBottom:'25px',marginTop:'20px',borderRadius:'10px'}}>Add Note</button>
        </div>
      </Modal>
    </div>
  )
}

export default Note