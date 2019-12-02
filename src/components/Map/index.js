import React, { Component } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
import * as Object from '../../data/teste.json'


class Map extends Component {
    state = {
        places: []
    }
    async componentDidMount() {
        await this.setState({places: Object.default})
        console.log(this.state.places)
    }

    getState(maker){
        alert("Vocêclicou na " + maker.name)
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={5}
                defaultCenter={{ lat: -23.52710718577365, lng: -46.69994882618741 }}
            >
                {this.state.places.map(makers =>(
                    <Marker 
                        key={makers.name}
                        position={{ 
                            lat: makers.latitude, 
                            lng: makers.longitude }} 
                        onClick={() => this.getState(makers)}
                    />
                ))}
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
