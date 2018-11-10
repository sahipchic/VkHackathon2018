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

    componentDidUpdate() {
        window.scrollBy(0, 9999)
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
                            <List style={{paddingBottom: 60, color: 'gray', scrollTop: '9999'}}>
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

        var counter = Math.random();
        //var url = URL.createObjectURL(recordedBlob);
        //var url = recordedBlob.blobURL;
        //console.log("Hello", url);
        var fileName = 'Record'+counter+'.wav';

        //var blob = new Blob([recordedBlob], { type : 'audio/wav' });

        var fileObject = new File([recordedBlob.blob], fileName, {type: 'audio/wav'});

        var formData = new FormData();

        // recorded data
        formData.append('audio-blob', fileObject);

        // file name
        formData.append('audio-filename', fileObject.name);
        console.log('audio-blob', formData.get('audio-blob'));
        console.log('audio-filename', formData.get('audio-filename'));
        $.ajax({
            url: 'https://speech-to-text-test-221520.appspot.com/save.php', // replace with your own server URL
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(response) {
                if (response === 'success') {
                    alert('successfully uploaded recorded blob');
                    console.log('Successfully Uploaded Recorded Blob');
                    // file path on server
                    var fileDownloadURL = '/uploads/' + fileObject.name;


                } else
                {
                    console.log('response', response); // error/failure
                }
            }
        });
        //console.log('XXX', recordedBlob.blobURL);
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
