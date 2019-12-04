import React, { Component } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import api from '../../services/api'
import { Container, MenuLateral, Form, Agrupamento } from './style'
import io from 'socket.io-client'

class Map extends Component {
    state = {
        places: [],
    }

    async componentDidUpdate() {
        this.registerToSocket()
        const resp = JSON.stringify(this.props.propplacemarked)
        const response = await api.get(`/?placemarked=${resp}`)
        await this.setState({ places: response.data })
    }

    registerToSocket(){
        const socket = io('http://localhost:3001');
    }

    getMaker(maker) {
        alert("Você clicou na " + maker.name)
    }



    render() {
        return (
            <GoogleMap
                defaultZoom={10}
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
    constructor(props) {
        super(props)
        this.state = {
            stategrid: 0,
            displayMarker: {}
        }

        this.selectGroup = this.selectGroup.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)
    }

    selectGroup(type) {
        this.setState({ stategrid: type })
    }

    handleInputChange = async e => {
        let { value } = e.target

        if (value == 1) {
            await this.setState({
                displayMarker: { lat: [-23.921150, -23.990524], lng: [-46.297715, -46.384536] }
            }); // Santos
        }
        else if (value == 2) {
            await this.setState({
                displayMarker: { lat: [-24.031940, -24.081513], lng: [-46.399934, -46.605015] }
            }); // Praia Grande
        }
    }

    handleSubmitChange = e => {
        e.preventDefault()
    }

    render() {
        return (
            <Container style={{ height: '100vh', width: '100vw', display: 'flex' }}>
                <MenuLateral>
                    <header>
                        <h1>Contele</h1>
                    </header>
                    <Form>

                        <label>Selecione a região</label>

                        <select
                            name="displayMarker"
                            onChange={this.handleInputChange}>
                            <option value="0">Selecione...</option>
                            <option value="1">Santos</option>
                            <option value="2">Praia Grande</option>
                            <option value="3">São Vicente</option>
                            <option value="4">Guarujá</option>
                            <option value="5">Mongaguá</option>
                            <option value="6">Itanhaém</option>
                        </select>

                        <Agrupamento>
                            <label> Tipo de agrupamento </label>
                            <div>
                                <input
                                    onClick={() => this.selectGroup(0)}
                                    name="opcaoTipoMapa"
                                    type="radio"
                                />
                                <span>Marker</span>
                            </div>
                            <div>
                                <input
                                    onClick={() => this.selectGroup(100)}
                                    name="opcaoTipoMapa"
                                    type="radio"
                                />
                                <span>Cluster</span>
                            </div>
                        </Agrupamento>
                        <button type="submit">AGRUPAR</button>
                    </Form>
                </MenuLateral>
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry&libraries=visualization,drawing,places&key=AIzaSyBhQiox6YHwLsyumVAqV-NC7Pd4lHQM32U`}
                    loadingElement={<div style={{ height: '100%', width: '70vw' }} />}
                    containerElement={<div style={{ height: '100%', width: '70vw' }} />}
                    mapElement={<div style={{ height: '100%', width: '70vw' }} />}
                    style={{ height: '100vh', width: '70vw' }}
                    propgrid={this.state.stategrid}
                    propplacemarked={this.state.displayMarker}
                />
            </Container>
        )
    }
}
