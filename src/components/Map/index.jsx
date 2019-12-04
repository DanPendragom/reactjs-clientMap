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
    
    componentDidMount() {   
        const button = document.getElementById('btn')
        button.onclick = this.handleSubmitRequest
    }

    handleSubmitRequest = async () => {
        this.registerToSocket()
        const resp = JSON.stringify(this.props.propplacemarked)
        const response = await api.get(`/?placemarked=${resp}`)
        await this.setState({ places: response.data })
    }

    registerToSocket() {
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
    }

    selectGroup(type) {
        this.setState({ stategrid: type })
    }

    handleInputChange = async e => {
        let { value } = e.target
        console.log(value)
        switch (value) {
            case '0':
                await this.setState({
                    displayMarker: { lat: [-22.367787, -25.079464], lng: [-43.067382, -48.904414] }
                }); // Tudo
                break
            case '1':
                await this.setState({
                    displayMarker: { lat: [-23.921150, -23.990524], lng: [-46.297715, -46.384536] }
                }); // Santos
                break
            case '2':
                await this.setState({
                    displayMarker: { lat: [-24.031940, -24.081513], lng: [-46.399934, -46.605015] }
                }); // Praia Grande
                break
            case '3':
                await this.setState({
                    displayMarker: { lat: [-23.935644, -23.974104], lng: [-46.370931, -46.425388] }
                }); // São Vicente
                break
            case '4':
                await this.setState({
                    displayMarker: { lat: [-23.862731, -23.900441], lng: [-46.399055, -46.457179] }
                }); // Cubatão
                break
            case '5':
                await this.setState({
                    displayMarker: { lat: [-23.941140, -24.017498], lng: [-46.169276, -46.291207] }
                }); // Guarujá
                break
            case '6':
                await this.setState({
                    displayMarker: { lat: [-23.465580, -23.626725], lng: [-46.344040, -46.604278] }
                }); // Zona Leste
                break
            default:
                alert('alert')
                break
        }
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
                            <option value="">Selecione...</option>
                            <option value="1">Santos</option>
                            <option value="2">Praia Grande</option>
                            <option value="3">São Vicente</option>
                            <option value="4">Cubatão</option>
                            <option value="5">Guarujá</option>
                            <option value="6">Zona Leste</option>
                            <option value="0">Tudo</option>
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
                        <button type="button" id="btn">AGRUPAR</button>
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
