import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	View,
	Text,
	Image,
	PanResponder,
	Animated,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';


export default class Draggable extends Component {
	// static propTypes = {
		// renderText:PropTypes.string,
		// renderShape:PropTypes.string,
		// renderSize:PropTypes.number,
		// imageSource:PropTypes.oneOfType([
		// 	PropTypes.shape({
		// 		uri: PropTypes.string,
		// 	}),
		// 	PropTypes.number
		// ]), 
		// offsetX:PropTypes.number,
		// offsetY:PropTypes.number,
		// renderColor:PropTypes.string,
		// reverse:PropTypes.bool,
		// pressDrag:PropTypes.func,
		// pressDragRelease:PropTypes.func,
		// longPressDrag:PropTypes.func,
		// pressInDrag:PropTypes.func,
		// pressOutDrag:PropTypes.func,
		// z:PropTypes.number,
		// x:PropTypes.number,
		// y:PropTypes.number
		
	// };
	// static defaultProps = {
	// 	offsetX : 100,
	// 	renderShape : 'circle',
	// 	renderColor : 'yellowgreen',
	// 	renderText : '＋',
	// 	renderSize : 36,
	// 	offsetY : 100,
	// 	reverse : true
	// }

	componentDidUpdate(){
		this.state.ImageWrapperWidth = this.props.data.ImageWrapperWidth;
		this.state.ImageWrapperHeight = this.props.data.ImageWrapperHeight;
	}

	componentWillMount() {
		// if(this.props.reverse == false)
			this.state.pan.addListener((c) => this.state._value = c);
	}
	componentWillUnmount() {
		this.state.pan.removeAllListeners();
	}
	constructor(props) {
		super(props);
		// const { pressDragRelease, reverse } = props;
		this.state = {
			pan:new Animated.ValueXY(), 
			_value:{x: 0, y: 0},
			fontSize: 10,
			maxFontSize: 50,
			minFontSize: 10
		};
		let oldNewArray = [];

		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant: (e, gestureState) => {
				// if(reverse == false) {
					this.state.pan.setOffset({x: this.state._value.x, y: this.state._value.y});
					// this.state.pan.setValue({x: 10, y: 10});
				// }
			},
			onPanResponderMove: (evt, gestureState) => {
				let touches = evt.nativeEvent.touches;
				if (touches.length == 2) {
                    let touch1 = touches[0];
                    let touch2 = touches[1];
					console.log('-------------------------------------------');
					let avg = Math.round(Math.abs((touch1.locationX+touch1.locationY)/2 - (touch2.locationX+touch2.locationY)/2));
					// console.log('Avg: ' + avg);
					let oldValue = "";
					let newValue = "";
					if(avg == oldNewArray[oldNewArray.length-1]){

					} else {
						oldNewArray.push(avg);
						if(oldNewArray.length > 5){
							oldNewArray.shift();
							if(oldNewArray[0]-oldNewArray[oldNewArray.length-1] < 0){
								// console.log('increase');
								if(this.state.fontSize < this.state.maxFontSize){
									this.setState({fontSize: this.state.fontSize + 1})
								}
							} else {
								// console.log('decresase');
								if(this.state.fontSize>this.state.minFontSize){
									this.setState({fontSize: this.state.fontSize - 1})
								}
							}
							console.log(this.state.fontSize)
						}
					}
					console.log('-------------------------------------------');
                }
				Animated.event([null, {
					dx: this.state.pan.x,
					dy: this.state.pan.y,
				  }])(evt, gestureState);
            },
			onPanResponderRelease: (e, gestureState) => {
				// console.log('-------------------------------------------');
				// console.log('ImageWrapperWidth ' + this.state.ImageWrapperWidth);
				// console.log('ImageWrapperHeight ' + this.state.ImageWrapperHeight);
				// console.log('setOffset value x ' + this.state._value.x);
				// console.log('setOffset value y ' + this.state._value.y);
				// console.log('Text width ' + this.state.TextWidth);
				// console.log('Text height ' + this.state.TextHeight);
				// console.log('-------------------------------------------');
				if(this.state._value.x<(0-this.state.TextWidth/2) ||
					this.state._value.y<(0-this.state.TextHeight/2)||
					this.state._value.x>this.state.ImageWrapperWidth-(this.state.TextWidth/2)||
					this.state._value.y>this.state.ImageWrapperHeight-(this.state.TextHeight/2)){
					this.reversePosition(0, 0);
				}
				
				// if(pressDragRelease)
				// 	pressDragRelease(e, gestureState);
				// if(reverse == false)
					// this.state.pan.flattenOffset();
				// else 
					// this.reversePosition(10, 10);
			} 
		});
	}
	
	// _positionCss = () => {
	// 	let Window = Dimensions.get('window');
	// 	const { renderSize, offsetX, offsetY, x, y, z } = this.props;
	// 	return Platform.select({
	// 		ios: {
	// 			zIndex: z != null ? z : 999,
	// 			position: 'absolute',
	// 			top: y != null ? y : (Window.height / 2 - renderSize + offsetY),
	// 			left: x !=null ? x : (Window.width / 2 - renderSize + offsetX)
	// 		},
	// 		android: {
	// 			position: 'absolute',
	// 			width:Window.width,
	// 			height:Window.height,
	// 			top: y != null ? y : (Window.height / 2 - renderSize + offsetY),
	// 			left: x !=null ? x : (Window.width / 2 - renderSize + offsetX)
	// 		},
	// 	});
	// }

	// _dragItemCss = () => {
	// 	const { renderShape, renderSize, renderColor } = this.props;
	// 	if(renderShape == 'circle') {
	// 		return{
	// 			backgroundColor: renderColor,
	// 			width: renderSize * 2,
	// 			height: renderSize * 2,
	// 			borderRadius: renderSize 
	// 		};
	// 	}else if(renderShape == 'square') {
	// 		return{
	// 			backgroundColor: renderColor,
	// 			width: renderSize * 2,
	// 			height: renderSize * 2,
	// 			borderRadius: 0 
	// 		};
	// 	}else if(renderShape == 'image') {
	// 		return{
	// 			width: renderSize,
	// 			height: renderSize 
	// 		};
	// 	}
	// }
	// _dragItemTextCss = () => {
	// 	const { renderSize } = this.props;
	// 	return {
	// 		marginTop: renderSize-10,
	// 		marginLeft: 5,
	// 		marginRight: 5,
	// 		textAlign: 'center',
	// 		color: '#fff'
	// 	};
	// }
	// _getTextOrImage = () => {
	// 	const { renderSize, renderShape, renderText, imageSource } = this.props;
	// 	if(renderShape == 'image') {
	// 		return(<Image style={this._dragItemCss(renderSize, null, 'image')} source={imageSource}/>);
	// 	}else{
	// 		return (<Text style={this._dragItemTextCss(renderSize)}>{renderText}</Text>);
	// 	}

	// }

	reversePosition = (x, y) => {
		Animated.spring(
			this.state.pan, {
				toValue: {
					x: x,
					y: y
				}
			}
		).start();
	}

	render() {
		// const touchableContent = this._getTextOrImage();
		// const { pressDrag, longPressDrag, pressInDrag, pressOutDrag } = this.props;

		return (
			<View style={{
				backgroundColor:'orange',
				width: '100%',
				height: '100%',
				}}>
				<Animated.View 
					{...this.panResponder.panHandlers}
					style={[this.state.pan.getLayout()]}
					>
					<TouchableOpacity 
						style={{
							backgroundColor: 'red',
							alignSelf: 'flex-start',
							padding: 30
						}}
					>
						<Text style={{
							fontSize: this.state.fontSize,
						}}
						onLayout={(event)=>{
							this.setState({TextWidth: event.nativeEvent.layout.width});
							this.setState({TextHeight: event.nativeEvent.layout.height});
						}}>Tap to edit</Text>	
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	}
}