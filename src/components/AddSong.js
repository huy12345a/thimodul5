import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSong } from '../api';

function AddSong() {
    const [name, setName] = useState('');
    const [single, setSingle] = useState('');
    const [time, setTime] = useState('');
    const [likes, setLikes] = useState(0);
    const [status, setStatus] = useState('unactive');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleAdd = () => {
        const newErrors = {};
        if (!name) {
            newErrors.name = "Song name is required.";
        }
        if (!single) {
            newErrors.single = "Single is required.";
        } else if (single.length > 30) {
            newErrors.single = "Single name must be less than 30 characters.";
        }
        if (!time) {
            newErrors.time = "Time is required.";
        }
        if (isNaN(likes) || likes < 0) {
            newErrors.likes = "Likes must be a valid number (>= 0).";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const newSong = { name, single, time, likes, status };

        addSong(newSong).then(() => {
            alert('Song added successfully');
            setName('');
            setSingle('');
            setTime('');
            setLikes(0);
            setStatus('active');
            navigate('/');
        }).catch((err) => {
            alert('Error adding song');
        });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Add a New Song</h1>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter song name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="single" className="form-label">Single</label>
                <input
                    type="text"
                    id="single"
                    className="form-control"
                    placeholder="Enter song's single name"
                    value={single}
                    onChange={(e) => setSingle(e.target.value)}
                />
                {errors.single && <div className="text-danger">{errors.single}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="time" className="form-label">Time (Duration)</label>
                <input
                    type="text"
                    id="time"
                    className="form-control"
                    placeholder="Enter song duration (e.g., 3:45)"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                {errors.time && <div className="text-danger">{errors.time}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="likes" className="form-label">Likes</label>
                <input
                    type="number"
                    id="likes"
                    className="form-control"
                    placeholder="Enter number of likes"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                />
                {errors.likes && <div className="text-danger">{errors.likes}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                    id="status"
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="active">Active</option>
                    <option value="unactive">Unactive</option>
                </select>
            </div>

            <button className="btn btn-success" onClick={handleAdd}>Add Song</button>
        </div>
    );
}

export default AddSong;
