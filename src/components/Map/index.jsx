import React, { Component } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import api from '../../services/api'
import { MenuLateral, Form } from './style'


class Map extends Component {
        state = {
            places: []
        }

    async componentDidMount() {
        const response = await api.get('/')
        await this.setState({ places: response.data })
    }

    getMaker(maker) {
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
                    gridSize={this.props.propgrid}
                >
                    {this.state.places.map(makers => (
                        <Marker
                            key={makers.name}
                            position={{
                                lat: makers.latitude,
                                lng: makers.longitude
                            }}
                            onClick={() => this.getMaker(makers)}
                        />
                    ))}
                </MarkerClusterer>
            </GoogleMap>
        )
    }
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default class MeuMapa extends Component {
    constructor(props){
        super(props)
        this.state = {
            stategrid: 0
        }
        this.selectGroup = this.selectGroup.bind(this)
    }
    selectGroup(type) {
        this.setState({stategrid: type})
    }
    render() {
        return (
            <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
                <MenuLateral>
                    <header>
                        <h1>Contele</h1>
                    </header>
                    <Form>
                        <label htmlFor="">Selecione a região</label>
                        <select name="" id="">
                            <option value="">Baixada Santista</option>
                            <option value="">ABCD Paulista</option>
                            <option value=""></option>
                        </select>
                        <div className="tipoMapa">
                            <label htmlFor=""> Tipo de agrupamento </label> <br />
                            <input onClick={() => this.selectGroup(0)} name="opcaoTipoMapa" type="radio" /> Marker <br />
                            <input onClick={() => this.selectGroup(100)} name="opcaoTipoMapa" type="radio" /> Cluster <br />
                            <input onClick={this.selectGroup} name="opcaoTipoMapa" type="radio" /> Heatmap
                        </div>
                    </Form>
                </MenuLateral>
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry&libraries=visualization,drawing,places&key=AIzaSyBhQiox6YHwLsyumVAqV-NC7Pd4lHQM32U`}
                    loadingElement={<div style={{ height: '100%', width: '70vw' }} />}
                    containerElement={<div style={{ height: '100%', width: '70vw' }} />}
                    mapElement={<div style={{ height: '100%', width: '70vw' }} />}
                    style={{ height: '100vh', width: '70vw' }}
                    propgrid={this.state.stategrid}
                />
            </div>
        )
    }
}
