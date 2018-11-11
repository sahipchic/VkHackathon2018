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
    TabsItem,
    Tabs,
    InfoRow,
    colors,
    Textarea,
    View,
    Spinner,
    HeaderButton,
    HeaderContext,
    PanelHeaderContent,
    Avatar,
    List,
    Cell,
    CellButton,
    Footer,
    Gallery,
    Input,
    SelectMimicry,
    FormLayout,
    ListItem
} from '@vkontakte/vkui';
import {isWebView} from '@vkontakte/vkui/src/lib/webview';
import '@vkontakte/vkui/dist/vkui.css';
//import EpicClass from './Epic';
//import AvailableTasks from './AvailableTasks';
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon24Phone from "@vkontakte/icons/dist/24/phone";
import Icon24Game from '@vkontakte/icons/dist/24/game';
import Icon24Users from '@vkontakte/icons/dist/24/users';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import {
    testl,
    textr,
    block,
    wrap,
    task_block,
    center,
    block_right,
    red_circle,
    yellow_circle,
    green_circle,
    slide_status
} from './styles.css'

class Account extends React.Component {
    constructor() {
        super();
        this.state = {
            fetchedUser: null,
            activePanel: "tasks"
        };
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

    render() {
        return (
            <View id='account_view' activePanel={this.state.activePanel}>
                <Panel id="tasks">
                    <PanelHeader>
                        Статистика
                    </PanelHeader>

                    <Group style={{marginTop: 0}}>
                        <Tabs theme="light">
                            <TabsItem style={{backgroundColor: colors.blue_300, color: colors.white}}
                                      onClick={() => this.setState({activeTab: 'tasks', activePanel: 'tasks'})}
                                      selected={this.state.activeTab === 'tasks'}
                            >
                                Задачи
                            </TabsItem>
                            <TabsItem style={{backgroundColor: colors.blue_300, color: colors.white}}
                                      onClick={() => this.setState({activeTab: 'messages', activePanel: 'slides'})}
                                      selected={this.state.activeTab === 'messages'}
                            >
                                Красивые задачи
                            </TabsItem>
                        </Tabs>
                    </Group>

                    <Group title="Задачи">
                        <List>
                            <ListItem>
                                <Div className='wrap'>

                                    <Div className='block'>
                                        <InfoRow title='Пользователь'>
                                            <Cell
                                                size="l"
                                                description="VK"
                                                before={<Avatar
                                                    src="https://pp.userapi.com/c10152/u76433768/-6/y_97f5a685.jpg"
                                                    size={80}/>}
                                            >
                                                Юсиф Алиев
                                            </Cell>
                                        </InfoRow>
                                    </Div>

                                    <Div className='block'>
                                        <Button>
                                            Перейти к диалогу
                                        </Button>
                                    </Div>

                                    <Div className='block'>
                                        <Button>
                                            Остановить
                                        </Button>
                                    </Div>


                                    <Div className='block'>
                                        <InfoRow title='Статус'>
                                            <div id='red_circle'/>
                                        </InfoRow>
                                    </Div>

                                    <Div className='task_block'>
                                        <InfoRow title="Задача" className='task_block'>
                                            <Div className="task_block">
                                                Поздравить с Днем Рождения ! 🎉
                                            </Div>
                                        </InfoRow>
                                    </Div>

                                </Div>

                            </ListItem>

                            <ListItem>

                                <Div className='wrap'>

                                    <Div className='block'>
                                        <InfoRow title='Пользователь'>
                                            <Cell
                                                size="l"
                                                description="VK"
                                                before={<Avatar
                                                    src="https://pp.userapi.com/c845021/v845021765/c5c1b/gxgJhWUGWu0.jpg"
                                                    size={80}/>}
                                            >
                                                Глеб Дроздов
                                            </Cell>
                                        </InfoRow>
                                    </Div>

                                    <Div className='block'>
                                        <Button>
                                            Перейти к диалогу
                                        </Button>
                                    </Div>

                                    <Div className='block'>
                                        <Button>
                                            Остановить
                                        </Button>
                                    </Div>

                                    <Div className='block'>
                                        <InfoRow title='Статус'>
                                            <div id='green_circle'/>
                                        </InfoRow>
                                    </Div>

                                    <Div className='task_block'>
                                        <InfoRow title="Задача">
                                            Позвать в КС-ку 💥
                                        </InfoRow>
                                    </Div>

                                </Div>
                            </ListItem>

                            <ListItem>

                                <Div className='wrap'>

                                    <Div className='block'>
                                        <InfoRow title='Пользователь'>
                                            <Cell
                                                size="l"
                                                description="VK"
                                                before={<Avatar
                                                    src="https://pp.userapi.com/c840632/v840632763/8498d/TW8A-Tvm7fw.jpg"
                                                    size={80}/>}
                                            >
                                                Илья Сахипов
                                            </Cell>
                                        </InfoRow>
                                    </Div>

                                    <Div className='block'>
                                        <Button>
                                            Перейти к диалогу
                                        </Button>
                                    </Div>

                                    <Div className='block'>
                                        <Button>
                                            Остановить
                                        </Button>
                                    </Div>

                                    <Div className='block'>
                                        <InfoRow title='Статус'>
                                            <div id='orange_circle'/>
                                        </InfoRow>
                                    </Div>

                                    <Div className='task_block'>
                                        <InfoRow title="Задача">
                                            Назначить встречу выпусников 👩‍👩‍👧‍👧 :)
                                        </InfoRow>
                                    </Div>


                                </Div>
                            </ListItem>

                        </List>

                    </Group>
                </Panel>

                <Panel id="slides">
                    <PanelHeader>
                        Статистика
                    </PanelHeader>

                    <Group style={{marginTop: 0}}>
                        <Tabs theme="light">
                            <TabsItem style={{backgroundColor: colors.blue_300, color: colors.white}}
                                      onClick={() => this.setState({activeTab: 'tasks', activePanel: 'tasks'})}
                                      selected={this.state.activeTab === 'tasks'}
                            >
                                Задачи
                            </TabsItem>
                            <TabsItem style={{backgroundColor: colors.blue_300, color: colors.white}}
                                      onClick={() => this.setState({activeTab: 'messages', activePanel: 'types'})}
                                      selected={this.state.activeTab === 'messages'}
                            >
                                Красивые задачи
                            </TabsItem>
                        </Tabs>
                    </Group>

                    <Group title="Красивые задачи">
                        <Gallery
                            slideWidth="100%"
                            style={{height: '100%'}}
                            bullets="light"
                        >
                            <div style={{height: 430, backgroundColor: colors.blue_300}}>

                                <div className='wrap'>

                                    <div className='block'>
                                        <InfoRow style={{color: colors.white, margin: '10px'}} title='Пользователь'>
                                            <Cell style={{color: colors.white}}
                                                  size="1"
                                                  description="VK"
                                                  before={<Avatar style={{align: 'center'}}
                                                                  src="https://pp.userapi.com/c840632/v840632763/8498d/TW8A-Tvm7fw.jpg"
                                                                  size={80}/>}
                                            >
                                                <Div style={{color: colors.white}}>Илья Сахипов </Div>
                                            </Cell>
                                        </InfoRow>
                                    </div>

                                    <div className='slide_status'>
                                        <div id='green_circle_in_slides'/>
                                    </div>

                                </div>

                                <Div className='center'>

                                    <InfoRow title="Задача" style={{color: colors.white}}>
                                        Назначить встречу выпусников :)
                                    </InfoRow>

                                    <Div>
                                        <Button style={{
                                            backgroundColor: colors.white,
                                            color: colors.blue_300,
                                            margin: '10px'
                                        }}>
                                            Перейти к диалогу
                                        </Button>
                                    </Div>

                                    <Div>
                                        <Button style={{
                                            backgroundColor: colors.white,
                                            color: colors.blue_300,
                                            margin: '10px'
                                        }}>
                                            Остановить
                                        </Button>
                                    </Div>
                                </Div>
                            </div>


                            <div style={{height: 430, backgroundColor: colors.green}}>
                                <div className='wrap'>

                                    <div className='block'>
                                        <InfoRow style={{color: colors.white, margin: '10px'}} title='Пользователь'>
                                            <Cell style={{color: colors.white}}
                                                  size="1"
                                                  description="VK"
                                                  before={<Avatar style={{align: 'center'}}
                                                                  src="https://pp.userapi.com/c840632/v840632763/8498d/TW8A-Tvm7fw.jpg"
                                                                  size={80}/>}
                                            >
                                                <Div style={{color: colors.white}}>Илья Сахипов </Div>
                                            </Cell>
                                        </InfoRow>
                                    </div>

                                    <div className='slide_status'>
                                        <div id='green_circle_in_slides'/>
                                    </div>

                                </div>

                                <Div className='center'>

                                    <InfoRow title="Задача" style={{color: colors.white}}>
                                        Назначить встречу выпусников :)
                                    </InfoRow>

                                    <Div>
                                        <Button style={{
                                            backgroundColor: colors.white,
                                            color: colors.blue_300,
                                            margin: '10px'
                                        }}>
                                            Перейти к диалогу
                                        </Button>
                                    </Div>

                                    <Div>
                                        <Button style={{
                                            backgroundColor: colors.white,
                                            color: colors.blue_300,
                                            margin: '10px'
                                        }}>
                                            Остановить
                                        </Button>
                                    </Div>
                                </Div>
                            </div>


                            <div style={{height: 430, backgroundColor: colors.red}}>
                                <div className='wrap'>

                                    <div className='block'>
                                        <InfoRow style={{color: colors.white, margin: '10px'}} title='Пользователь'>
                                            <Cell style={{color: colors.white}}
                                                  size="1"
                                                  description="VK"
                                                  before={<Avatar style={{align: 'center'}}
                                                                  src="https://pp.userapi.com/c840632/v840632763/8498d/TW8A-Tvm7fw.jpg"
                                                                  size={80}/>}
                                            >
                                                <Div style={{color: colors.white}}> Илья Сахипов </Div>
                                            </Cell>
                                        </InfoRow>
                                    </div>

                                    <div className='slide_status'>
                                        <div id='green_circle_in_slides'/>
                                    </div>

                                </div>

                                <Div className='center'>

                                    <InfoRow title="Задача" style={{color: colors.white}}>
                                        Назначить встречу выпусников :)
                                    </InfoRow>

                                    <Div>
                                        <Button style={{
                                            backgroundColor: colors.white,
                                            color: colors.blue_300,
                                            margin: '10px'
                                        }}>
                                            Перейти к диалогу
                                        </Button>
                                    </Div>

                                    <Div>
                                        <Button style={{
                                            backgroundColor: colors.white,
                                            color: colors.blue_300,
                                            margin: '10px'
                                        }}>
                                            Остановить
                                        </Button>
                                    </Div>
                                </Div>

                            </div>
                        </Gallery>
                    </Group>
                </Panel>
            </View>
        )
    }
}

export default Account;

