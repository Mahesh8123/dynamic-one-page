import React, { useState, useEffect } from 'react';

const Banner = ({ description, initialTime, link, onExpire }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (time > 0) {
            const timerId = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            onExpire();
        }
    }, [time, onExpire]);

    return (
        <div className="banner">
            <p>{description}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">Visit Link</a>
            <p>Time remaining: {time} seconds</p>
        </div>
    );
};

export default Banner;
