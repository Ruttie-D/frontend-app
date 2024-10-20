/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react-hooks/exhaustive-deps */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import Location404 from "../../../assets/location-not-found.svg";
import 'leaflet/dist/leaflet.css';

const containerStyle = {
    width: '100%',
    height: '100%'
};

interface MapProps {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    // zip: number;
}

const OpenStreetMapComponent = (props: MapProps) => {
    const { state, country, city, street, houseNumber } = props;
    const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null); // Change to null
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const geocoder = async () => {
            try {
                const address = `${houseNumber} ${street}, ${city}, ${state}, ${country}`;
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
                );
                const data = await response.json();
                console.log(data);

                if (data.length > 0) {
                    const location = data[0];
                    setCenter({ lat: parseFloat(location.lat), lng: parseFloat(location.lon) });
                    setHasError(false);
                } else {
                    console.error('Geocoding failed: Address not found');
                    setCenter(null); // Set to null on error
                    setHasError(true);
                }
            } catch (error) {
                console.error('Error fetching geocoding data:', error);
                setCenter(null); // Set to null on error
                setHasError(true);
            }
        };

        geocoder();
    }, [state, country, city, street, houseNumber]);

    return (
        <div className='h-[40vh] bg-black rounded-lg'>
            {hasError ? (
                <img src={Location404} alt="Address not found " style={containerStyle} />
            ) : (
                center && ( // Only render the map if center is valid
                    <MapContainer center={center} zoom={15} style={containerStyle}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={center}>
                            <Popup>{`${houseNumber} ${street}, ${city}, ${state}, ${country}`}</Popup>
                        </Marker>
                    </MapContainer>
                )
            )}
        </div>
    );
}

export default OpenStreetMapComponent;
