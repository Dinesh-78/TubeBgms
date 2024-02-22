import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [tags, setTags] = useState('');
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const [msg, setMsg] = useState('');
    const  [bgmname, setbgmname] = useState('');
    function handleUpload() {
        if (!file) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('audio', file);
        formData.append('filename', fileName);
        formData.append('songname',bgmname);
        formData.append('tags', tags);

        setMsg("Uploading ...");
        setProgress(prevState => ({ ...prevState, started: true }));

        axios.post('http://localhost:5000/upload', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(prevState => ({ ...prevState, pc: percentCompleted }));
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(res => {
            setMsg("Upload Successful");
            console.log(res.data);
        })
        .catch(err => {
            setMsg("Upload Failed");
            console.error(err);
        });
    }

    return (
        <div className='upload'>
            <h1>Upload Music File</h1>
            <input onChange={(e) => setFile(e.target.files[0])} type="file" />
            <input value={bgmname} onChange={(e) => setbgmname(e.target.value)} placeholder="Enter file name" />
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Enter tags separated by #" />
            <button onClick={handleUpload}>Upload</button>
            {progress.started && <progress max="100" value={progress.pc}></progress>}
            {msg && <span>{msg}</span>}
        </div>
    );
}

export default Admin;
