import React from 'react';

const Client = ({ data }) => {
    return (
        <div className="client">
            <div id="client" className="client-container">
                {data.client.map((client, index) => (
                    <a key={index} href={client.link} className="new-container__item">
                        <img src={client.image} alt="" />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Client;
