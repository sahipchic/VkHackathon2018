import React from 'react';
import connect from '@vkontakte/vkui-connect';
// import {ReactMic} from 'react-mic';
import {
    Button,
    ConfigProvider,
    Div,
    Group,
    Panel,
    PanelHeader,
    Root,
    View,
    HeaderButton,
    PanelHeaderContent,
    Avatar,
    List,
    Cell,
    Footer,
    Input,
    Gallery,
    colors
} from '@vkontakte/vkui';
import slide1 from './slider1.png';
import slide2 from './slider2.png';
import slide3 from './slider3.png';
import slide4 from './slider4.png';
import slide5 from './slider5.png';
import slide6 from './slider6.png';

//import {colors} from '@vkontakte/vkui';

class Gallery1 extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            slideIndex: 0
        }
    }

    render () {
        return (
            <View header={false} activePanel="gallery">
                <Panel id="gallery">
                    <Group title="Sticks right">
                        <Gallery
                            slideWidth="100%"
                            style={{ height: 600 }}
                            bullets="dark"
                            align="center"
                            slideIndex={this.state.slideIndex}
                            onChange={slideIndex => this.setState({slideIndex})}
                        >
                            <div align="center" style={{ height: 600}}>
                                <img align="center" height='600' src={slide1}/>

                            </div>
                            <div align="center" style={{ height: 600}}>
                                <img align="center" height='600' src={slide2}/>

                            </div>
                            <div align="center" style={{ height: 600}}>
                                <img align="center" height='600' src={slide3}/>

                            </div>
                            <div align="center" style={{ height: 600}}>
                                <img align="center" height='600' src={slide4}/>

                            </div>
                            <div align="center" style={{ height: 600}}>
                                <img align="center" height='600' src={slide5}/>

                            </div>
                            <div align="center" style={{ height: 600}}>
                                <img align="center" height='600' src={slide6}/>

                            </div>
                        </Gallery>
                        <Div className='testr'>
                            <Button size='l' level='commerce' align='right' onClick={() => this.setState({slideIndex: this.state.slideIndex === 5 ? 0 : this.state.slideIndex + 1 })}>Next slide</Button>
                        </Div>
                    </Group>

                </Panel>
            </View>
        )
    }
}
export default Gallery1;
