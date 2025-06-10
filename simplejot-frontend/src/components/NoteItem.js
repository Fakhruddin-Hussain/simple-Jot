import React from 'react'

function NoteItem(props) {
    const { note } = props
    return (
        <div className='col-md-3'>
            {/* <h4>{note.title}</h4>
            <p>{note.description}</p> */}

            <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                    </div>
            </div>
        </div>
    )
}

export default NoteItem