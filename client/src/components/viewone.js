import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleMedia = ({ match }) => {
    const [media, setMedia] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/media/${match.params.id}`);
                setMedia(response.data.media);
                setLoading(false);
            } catch (error) {
                setError('Error fetching media');
                setLoading(false);
            }
        };

        fetchMedia();
    }, [match.params.id]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h2>{media.title}</h2>
                    <p>Description: {media.description}</p>
                    <p>Type: {media.type}</p>
                    <p>Category: {media.category}</p>
                </div>
            )}
        </div>
    );
};

export default SingleMedia;