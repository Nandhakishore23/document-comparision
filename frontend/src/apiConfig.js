const getBaseUrl = () => {
    const hostname = window.location.hostname;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }

    return 'https://document-comparision-ai0x.onrender.com';
};

const BASE_URL = getBaseUrl();

export default BASE_URL;
