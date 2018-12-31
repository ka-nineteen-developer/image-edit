import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Slider,
    FlatList,
} from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';

export default class FooterElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layerFontSize: 20,
            layerFontOpacity: 1,
            layerFontColor: '#ffffff',
            selectedTextElement: 'fontColor',
            isToolElement: false
        };
    }


    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}>
                {this.state.isToolElement ?
                    <View style={{ flex: 1 }}>
                        {this.state.selectedTextElement == 'fontColor' ?
                            <View style={{
                                flex: 0.5
                            }}>
                                <FlatList
                                    data={[
                                        { color: 'blue' },
                                        { color: 'orange' },
                                        { color: 'black' },
                                        { color: 'green' },
                                        { color: 'gray' },
                                        { color: 'white' },
                                        { color: 'blue' },
                                        { color: 'orange' },
                                        { color: 'black' },
                                        { color: 'green' },
                                        { color: 'gray' },
                                        { color: 'white' },
                                        { color: 'blue' },
                                        { color: 'orange' },
                                        { color: 'black' },
                                        { color: 'green' },
                                        { color: 'gray' },
                                        { color: 'white' }]}
                                    horizontal={true}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ layerFontColor: item.color })
                                        }}
                                            style={{
                                                backgroundColor: item.color,
                                                width: 50,
                                                height: '100%'
                                            }}
                                        >
                                        </TouchableOpacity>
                                    }
                                />
                            </View> : null}

                        {this.state.selectedTextElement == 'fontFamily' ?
                            <View style={{
                                flex: 0.5
                            }}>
                                <FlatList
                                    data={[
                                        { color: 'blue' },
                                        { color: 'orange' },
                                        { color: 'black' },
                                        { color: 'green' },
                                        { color: 'gray' },
                                        { color: 'white' },
                                        { color: 'blue' },
                                        { color: 'orange' },
                                        { color: 'black' },
                                        { color: 'green' },
                                        { color: 'gray' },
                                        { color: 'white' },
                                        { color: 'blue' },
                                        { color: 'orange' },
                                        { color: 'black' },
                                        { color: 'green' },
                                        { color: 'gray' },
                                        { color: 'white' }]}
                                    horizontal={true}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ layerFontColor: item.color })
                                        }}
                                            style={{
                                                backgroundColor: item.color,
                                                width: 100,
                                                height: '100%'
                                            }}
                                        >
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                            : null}

                        {this.state.selectedTextElement == 'fontSize' ?
                            <View style={{
                                flex: 0.5,
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Slider
                                    style={{ width: '100%' }}
                                    step={1}
                                    minimumValue={10}
                                    maximumValue={100}
                                    value={20}
                                    onValueChange={val => {
                                        this.setState({ layerFontSize: val })
                                        console.log(this.state.layerFontSize);
                                    }}
                                    onSlidingComplete={val => {
                                        this.setState({ layerFontSize: val });
                                    }}
                                />
                            </View> : null}

                        {this.state.selectedTextElement == 'fontOpacity' ?
                            <View style={{
                                flex: 0.5,
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Slider
                                    style={{
                                        width: '100%',
                                    }}
                                    step={0.1}
                                    minimumValue={0}
                                    maximumValue={1}
                                    value={20}
                                    onValueChange={val => {
                                        this.setState({ layerFontOpacity: val })
                                        console.log(this.state.layerFontOpacity);
                                    }}
                                    onSlidingComplete={val => {
                                        this.setState({ layerFontOpacity: val });
                                    }}
                                />
                            </View> : null}

                        <View style={{
                            flex: 0.5,
                        }}>
                            <Footer>
                                <FooterTab>
                                    <Button onPress={() => {
                                        this.setState({ selectedTextElement: 'fontColor' })
                                    }}>
                                        <Icon name="color-palette"
                                            style={{
                                                color: this.state.selectedTextElement == 'fontColor' ? 'red' : 'white'
                                            }} />
                                    </Button>

                                    <Button onPress={() => {
                                        this.setState({ selectedTextElement: 'fontFamily' })
                                    }}>
                                        <Icon name="navigate"
                                            style={{
                                                color: this.state.selectedTextElement == 'fontFamily' ? 'red' : 'white'
                                            }} />
                                    </Button>

                                    <Button onPress={()=>{this.setState({selectedTextElement:'fontSize'})}}>
                                        <Icon name="person"
                                            style={{
                                                color: this.state.selectedTextElement == 'fontSize' ? 'red' : 'white'
                                            }} />
                                    </Button>

                                    <Button onPress={()=>{this.setState({selectedTextElement:'fontOpacity'})
                                    }}>
                                        <Icon name="water"
                                            style={{
                                                color: this.state.selectedTextElement == 'fontOpacity' ? 'red' : 'white'
                                            }} />
                                    </Button>

                                    <Button onPress={()=>{this.setState({isToolElement:false})}}>
                                        <Icon name="check" />
                                    </Button>
                                </FooterTab>
                            </Footer>
                        </View>
                    </View>
                    :
                    <View style={{
                        padding: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({ isToolElement: true })
                        }}>
                            <Text style={{
                                fontSize: 18,
                            }}>TOOLS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            console.log('Export');
                        }}>
                            <Text style={{
                                fontSize: 18,
                            }}>EXPORT</Text>
                        </TouchableOpacity>
                    </View>}
            </View>
        );
    }

}
