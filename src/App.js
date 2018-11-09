import React from 'react';
import connect from '@vkontakte/vkui-connect';
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
    Input
} from '@vkontakte/vkui';
import {isWebView} from '@vkontakte/vkui/src/lib/webview';
import '@vkontakte/vkui/dist/vkui.css';
//import EpicClass from './Epic';
//import AvailableTasks from './AvailableTasks';
import $ from 'jquery';
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon24Phone from "@vkontakte/icons/dist/24/phone";
import Icon16Dropdown from "@vkontakte/icons/dist/16/pin";
import testl from './styles.css'
import testr from './styles.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStory: 'feed',
            activeView: 'view1',
            fetchedUser: null
        }
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data});
                    break;
                default:
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
                            <List>
                                <Div className="testr">
                                    <Button level="outline" size="l">Джозеф, что новенького в мире?</Button>
                                </Div>
                                <Div className="testl">
                                    <Button level="commerce" size="l">Да просто лютый пиздец происходит, братан!</Button>
                                </Div>
                                <Div className="testr">
                                    <Button level="outline" size="l">Ну ок, а что по погоде?</Button>
                                </Div>
                                <Div className="testl">
                                    <Button level="commerce" size="l">
                                        <p>
                                            Погода в Санкт-Петербурге
                                        </p>
                                        <p>
                                            Завтра пасмурно, ветер южный
                                        </p>
                                        <p>
                                            Ночью: ☁️ +2...+3 ℃
                                        </p>
                                        <p>
                                            Утром: ☁️ +3...+4 ℃
                                        </p>
                                        <p>
                                            Днём: ☁️ +5...+6 ℃
                                        </p>
                                        <p>
                                            Вечером: ☁️ +6...+6 ℃
                                        </p>
                                        <p>
                                            Лучше всего обезопаситься и взять зонтик!
                                        </p>
                                    </Button>
                                </Div>
                                <Div className="testr">
                                    <Button level="outline" size="l">Спасибо большое, братан!</Button>
                                </Div>
                            </List>
                            <Footer>
                                <Input type="text" placeholder="Задайте свой вопрос Джозефу" />
                            </Footer>
                        </Panel>
                    </View>


                </Root>
            </ConfigProvider>

        )
    }


}


export default App;
