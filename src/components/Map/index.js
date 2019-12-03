import React, { Component } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import api from '../../services/api'
class Map extends Component {
    state = {
        places: []
    }

    async componentDidMount() {
        const response = await api.get('/')
        await this.setState({places: response.data})
    }

    getMaker(maker){
        alert("Vocêclicou na " + maker.name)
    }


    render() {
        return (
            <GoogleMap
                defaultZoom={5}
                defaultCenter={{ lat: -23.52710718577365, lng: -46.69994882618741 }}
            >
                <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={100}
                >
                {this.state.places.map(makers =>(
                    <Marker 
                        key={makers.name}
                        position={{ 
                            lat: makers.latitude, 
                            lng: makers.longitude }} 
                        onClick={() => this.getMaker(makers)}
                    />
                ))}
                </MarkerClusterer>
            </GoogleMap>
        )
    }
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function MeuMapa() {
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry&libraries=visualization,drawing,places&key=AIzaSyBhQiox6YHwLsyumVAqV-NC7Pd4lHQM32U`}
                loadingElement={<div style={{ height: '100%', width: '100vw', backgroundColor: 'red' }} />}
                containerElement={<div style={{ height: '100%', width: '100vw', backgroundColor: 'red' }} />}
                mapElement={<div style={{ height: '100%', width: '100vw', backgroundColor: 'red' }} />}
                style={{ height: '100vh', width: '100vw' }}
            />
        </div>
    )
}
