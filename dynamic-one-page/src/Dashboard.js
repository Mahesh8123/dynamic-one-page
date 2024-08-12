import React, { useState } from 'react';

const Dashboard = ({ onUpdateBanner }) => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState('');
    const [showBanner, setShowBanner] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ showBanner, bannerText: description, bannerTimer: timer, bannerLink: link });
        onUpdateBanner({ showBanner, bannerText: description, bannerTimer: timer, bannerLink: link });
    };

    const handleCheckboxChange = (e) => {
        setShowBanner(e.target.checked);
        if (!e.target.checked) {
            // Clear the fields when the checkbox is unchecked
            setDescription('');
            setTimer(0);
            setLink('');
        }
    };

    return (
        <div className="dashboard">
            <form onSubmit={handleSubmit}>
                <label>
                    Show Banner:
                    <input
                        type="checkbox"
                        checked={showBanner}
                        onChange={handleCheckboxChange}
                    />
                </label>
                {showBanner && (
                    <>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            Timer (seconds):
                            <input
                                type="number"
                                value={timer}
                                onChange={(e) => setTimer(parseInt(e.target.value, 10))}
                            />
                        </label>
                        <label>
                            Link:
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </label>
                    </>
                )}
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Dashboard;
