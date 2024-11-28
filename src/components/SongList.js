import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSongs, updateSongStatus, deleteSong } from '../api';

function SongList() {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    useEffect(() => {
        getSongs().then((response) => {
            setSongs(response.data);
        }).catch((err) => {
            alert('Error fetching songs');
        });
    }, []);
    const handleStatusChange = (id, newStatus) => {
        updateSongStatus(id, newStatus).then(() => {
            alert('Song status updated successfully');
            setSongs(songs.map((song) =>
                song.id === id ? { ...song, status: newStatus } : song
            ));
        }).catch((err) => {
            alert('Error updating song status');
        });
    };

    const handleDelete = (id) => {
        deleteSong(id).then(() => {
            alert('Delete successful');
            setSongs(songs.filter((song) => song.id !== id));
        }).catch((err) => {
            alert('Delete failed');
        });
    };
    const handleSelectSong = (song) => {
        setSelectedSong(song);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">
                {selectedSong ? `${selectedSong.name} - ${selectedSong.single}` : "Song List"}
            </h1>
            <Link to="/add">
                <button className="btn btn-primary mb-4">Register New Song</button>
            </Link>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Single</th>
                    <th>Time (Duration)</th>
                    <th>Likes</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {songs.map((song) => (
                    <tr key={song.id} onClick={() => handleSelectSong(song)} style={{ cursor: 'pointer' }}>
                        <td>{song.name}</td>
                        <td>{song.single}</td>
                        <td>{song.time}</td>
                        <td>{song.likes}</td>
                        <td>{song.status}</td>
                        <td>
                            <Link to={`/edit/${song.id}`}>
                                <button className="btn btn-warning me-2">Edit</button>
                            </Link>

                            <button className="btn btn-danger" onClick={() => handleDelete(song.id)}>
                                Delete
                            </button>
                            {song.status === 'unactive' && (
                                <button
                                    className="btn btn-success me-2"
                                    onClick={() => handleStatusChange(song.id, 'active')}
                                >
                                    Activate
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SongList;
