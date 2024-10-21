/* eslint-disable no-self-assign */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react-hooks/exhaustive-deps */
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import Location404 from "../../../assets/location-not-found.svg";
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

interface MapProps {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    // zip: number;
}

const MapComponent = (props: MapProps) => {
    const { state, country, city, street, houseNumber } = props;
    const [center, setCenter] = useState({ lat: 32.0846427, lng: 34.8007944 });
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);
    const address = `${houseNumber} ${street}, ${city}, ${state}, ${country}`;
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        const getCoordinates = async () => {
            try {
                const response = await axios.get(`https://geocode.maps.co/search?q=${address}&api_key=671671878502d090682293qby239f2d`, {
                    params: {
                        q: address,
                        format: 'json',
                    },
                });

                if (response.status === 200) {
                    setHasError(false)
                    console.log(response.data);

                    const { lat, lon } = response.data[0]; // Destructure the values
                    console.log(lat, typeof center.lat, hasError);
                    console.log(lon, center.lng);
                    setCenter({ lat: +lat, lng: +lon });
                    if (mapRef.current) {
                        mapRef.current.setView([lat, lon], 13); // Center the map on the new position
                    }

                } else {
                    console.error("No results found for the given address.");
                    setHasError(true);
                }
            } catch (error) {
                setHasError(true);
                console.error("Error fetching coordinates:", error);
            }
        };

        getCoordinates();
    }, [address]);

    useEffect(() => {
        setMarkerPosition({ lat: center.lat, lng: center.lng });
        console.log(typeof markerPosition?.lat, hasError);

    }, [center, hasError]);

    return (
        <div
            className='h-[40vh] bg-black rounded-lg'
        >
            {hasError ? (
                <img
                    src={Location404}
                    alt='Location not found'
                    className='h-[40vh]'
                />
            ) : (
                <MapContainer
                    className='z-10 h-full content-stretch'
                    center={[center.lat, center.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    key={`${center.lat}${center.lng}`}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[center.lat, center.lng]}>
                        <Popup>
                            {center.lat}, {center.lng}
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
}

export default MapComponent;
