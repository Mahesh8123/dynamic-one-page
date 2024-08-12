import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Dashboard from './Dashboard';
import './App.css';
import axios from 'axios';

function App() {
    const [bannerSettings, setBannerSettings] = useState({
        showBanner: false,
        bannerText: '',
        bannerTimer: 0,
        bannerLink: ''
    });
    const [bannerUpdated, setBannerUpdated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/banner')
            .then(response => {
                console.log(response.data); // Log backend response
                const { description, timer, link, showBanner } = response.data;
                setBannerSettings({
                    showBanner: showBanner || false,
                    bannerText: description || '',
                    bannerTimer: timer || 0,
                    bannerLink: link || ''
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching banner data:', error);
                setLoading(false);
            });
    }, []);

    const handleBannerExpire = () => {
        setBannerSettings(prevSettings => ({ ...prevSettings, showBanner: false }));
    };

    const handleUpdateBanner = (settings) => {
        console.log(settings); // Log updated settings
        setBannerSettings(settings);
        setBannerUpdated(true);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="App">
            <div className="content">
                <h1>Dynamic One-Page Website</h1>
                <p>Welcome to our dynamic one-page website, crafted with the power of React. This site exemplifies a seamless blend of modern web development practices, providing a fluid and responsive user experience. Dive in to explore how dynamic content can elevate your web presence, with interactive features and real-time updates designed to keep your audience engaged and informed.</p>
            </div>
            <Dashboard onUpdateBanner={handleUpdateBanner} />
            {bannerSettings.showBanner && bannerUpdated && (
                <Banner
                    description={bannerSettings.bannerText}
                    initialTime={bannerSettings.bannerTimer}
                    link={bannerSettings.bannerLink}
                    onExpire={handleBannerExpire}
                />
            )}
            {!bannerUpdated && <p>Press the checkbox in the dashboard to add a banner.</p>}
            
        </div>
    );
}

export default App;
