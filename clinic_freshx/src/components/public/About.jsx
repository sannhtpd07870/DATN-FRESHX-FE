import React, { useEffect, useState } from 'react';
import CURDtestfile from '../../data/testfile';
import Loading from '../common/loading';
const About = () => {
    const { getimg } = CURDtestfile();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm trạng thái loading
    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        const data = await getimg();
        setFiles(data);
        setLoading(false);
    };
    return (
        <>
            <h1>About</h1>
            {loading ? (
                <Loading />
            ):(
            <div>
                <h2>Files from Blob Storage</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {files.map((fileName, index) => (
                        <div key={index} style={{ width: '200px', textAlign: 'center' }}>
                            <img 
                                src={`https://storagefreshx.blob.core.windows.net/test/${fileName}`} 
                                alt={fileName} 
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            />
                            <p>{fileName}</p>
                        </div>
                    ))}
                </div>
            </div>
            )
        }
        </>
    )
};

export default About;
