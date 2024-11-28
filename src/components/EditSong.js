import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSongById, updateSong } from '../api';
function EditSong() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [song, setSong] = useState({
        name: '',
        single: '',
        time: '',
        likes: '',
        status: 'active'
    });

    useEffect(() => {
        getSongById(id).then((response) => {
            setSong(response.data);
        }).catch((err) => {
            alert('Error fetching song data');
        });
    }, [id]);

    const handleSave = () => {
        updateSong(id, song).then(() => {
            alert('Song updated successfully');
            navigate('/');
        }).catch((err) => {
            alert('Error updating song');
        });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Edit Song</h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter song name"
                    value={song.name}
                    onChange={(e) => setSong({ ...song, name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="single" className="form-label">Single</label>
                <input
                    type="text"
                    id="single"
                    className="form-control"
                    placeholder="Enter song's single name"
                    value={song.single}
                    onChange={(e) => setSong({ ...song, single: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="time" className="form-label">Time (Duration)</label>
                <input
                    type="text"
                    id="time"
                    className="form-control"
                    placeholder="Enter song duration (e.g., 3:45)"
                    value={song.time}
                    onChange={(e) => setSong({ ...song, time: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="likes" className="form-label">Likes</label>
                <input
                    type="number"
                    id="likes"
                    className="form-control"
                    placeholder="Enter number of likes"
                    value={song.likes}
                    onChange={(e) => setSong({ ...song, likes: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                    id="status"
                    className="form-control"
                    value={song.status}
                    onChange={(e) => setSong({ ...song, status: e.target.value })}
                >
                    <option value="active">Active</option>
                    <option value="unactive">Unactive</option>
                </select>
            </div>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
    );
}

export default EditSong;
