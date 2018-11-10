import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {ReactMic} from 'react-mic';
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
    FixedLayout,
    Avatar,
    List,
    Cell,
    Footer,
    Input
} from '@vkontakte/vkui';
import {isWebView} from '@vkontakte/vkui/src/lib/webview';
import '@vkontakte/vkui/dist/vkui.css';
import $ from 'jquery';
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon24Phone from "@vkontakte/icons/dist/24/phone";
import Icon24Send from "@vkontakte/icons/dist/24/send";
import Icon16Dropdown from "@vkontakte/icons/dist/16/pin";
import {testl, testr, bblock, wrap} from './styles.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStory: 'feed',
            activeView: 'view1',
            fetchedUser: null,
            record: false,
            formMessage: "",
            list: []

        };
        this.send = this.send.bind(this);
        this.change = this.change.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.getMessages();

    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data});
                    break;
                default:

                    this.setState({fetchedUser: 5});
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }

    createCostumer() {
        $.ajax({
            url: 'https://bestproger.ru/vk/api/register.php/',
            type: 'GET',
            dataType: "json",
            data: {
                user_id: this.state.fetchedUser == null ? 4 : this.state.fetchedUser.id,
                role: "costumer"
            }
        }).done(function (data) {
            //alert(JSON.stringify(data));
        });
        return this.setState({activeView: 'view2'});
    }

    createExecutor() {
        $.ajax({
            url: 'https://bestproger.ru/vk/api/register.php/',
            type: 'GET',
            dataType: "json",
            data: {
                user_id: this.state.fetchedUser == null ? 5 : this.state.fetchedUser.id,
                role: "worker"
            }
        }).done(function (data) {
            //alert(JSON.stringify(data));
        });
        return this.setState({activeView: 'view3'});
    }

    getMessages() {

        $.ajax({
            url: 'https://bestproger.ru/hackathon/getMessages.php',
            type: 'GET',
            dataType: "json",
            data: {
                id: this.state.fetchedUser,
            }
        }).done(function (data) {
            this.setState(
                {list: data['result']['messages'].reverse()}
            )
        }.bind(this));
    }

    addMessage(message) {
        $.ajax({
            url: 'https://bestproger.ru/hackathon/addMessage.php',
            type: 'GET',
            dataType: "json",
            data: {
                user_id: this.state.fetchedUser,
                message: message,
            }
        }).done(function (data) {

        }.bind(this));
    }

    send(message) {
        if (message.trim() === "") {
            return;
        }
        this.addMessage(message);
        this.getMessages();
        this.getMessages();
        this.getMessages();
    }

    change(e) {
        const {
            name,
            value
        } = e.currentTarget;
        this.setState({formMessage: value})
    }


    render() {
        return (
            <ConfigProvider insets={this.props.insets} isWebView={isWebView}>
                <Root activeView={this.state.activeView}>
                    <View id="view1" activePanel="panelChoose">
                        <Panel id="panelChoose">
                            <PanelHeader
                                left={<HeaderButton>{<Icon24Back/>}</HeaderButton>}
                                right={<HeaderButton>{<Icon24Phone/>}</HeaderButton>}
                            >
                                <PanelHeaderContent
                                    status="online"
                                    aside={<Icon16Dropdown/>}
                                    onClick={() => {
                                    }}
                                >
                                    Джозеф
                                </PanelHeaderContent>
                            </PanelHeader>
                            <List style={{paddingBottom: 60, color: 'gray', scrollTop: this.state.ttp}}>
                                {this.state.list.map(message => {
                                    if (message['sender_id'] == '0') {
                                        return <Div className="testl">
                                            <Button level="commerce" size="l">{message['message']}</Button>
                                        </Div>
                                    } else {
                                        return <Div className="testr">
                                            <Button level="outline" size="l">{message['message']}</Button>
                                        </Div>
                                    }
                                })}
                            </List>
                            <FixedLayout vertical='bottom'>
                                <Div className='wrap'>
                                    <Div className="bblock">
                                        <Input name='message' value={this.state.formMessage} onChange={this.change}
                                               type="text" placeholder="Задайте свой вопрос Джозефу"/>
                                    </Div>
                                    <Div className="bblock">
                                        <Button level="outline" onClick={() => this.send(this.state.formMessage)}>{
                                            <Icon24Send/>}</Button>
                                    </Div>
                                </Div>
                            </FixedLayout>
                            <Div>
                                <ReactMic
                                    record={this.state.record}
                                    className="sound-wave"
                                    onStop={this.onStop}
                                    onData={this.onData}
                                    width='0'
                                    height='0'
                                    strokeColor="#000000"
                                    backgroundColor="#FF4081"/>
                                <button onClick={this.startRecording} type="button">Start</button>
                                <button onClick={this.stopRecording} type="button">Stop</button>

                            </Div>
                        </Panel>
                    </View>


                </Root>
            </ConfigProvider>

        )
    }


    startRecording = () => {
        this.setState({
            record: true
        });
    };

    stopRecording = () => {
        this.setState({
            record: false
        });
    };

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
        console.log('XXX', recordedBlob.blobURL);
        var a = document.createElement("a");
        var url = recordedBlob.blobURL;
        a.style = "display: none";
        a.href = url;
        a.download = 'test.wav';
        console.log(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }


}


export default App;
