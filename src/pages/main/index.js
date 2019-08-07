import React, { Component } from 'react';
import AsyncStoragec from '../../class/asyncStorage';
import { View,Text,Image,Platform,StyleSheet} from 'react-native';
import api from '../../services/api';
import styles from './styles';
import {Drawer, Container, Header, Content,Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

class SideBar extends Component {
  render(){
      
      return (
              <View style={[ styless.container, { backgroundColor: '#fff' } ]}>
                      <Text>
                          <Icon name="rocket" size={30} color="#900" />
                          Conteúdo side bar
                      </Text>
              </View>
             );
  } 
};

class Main extends Component{

static navigationOptions = {
   title:'Novidades',
    titleStyle: {
      color: '#fefefe',
      fontFamily: 'MuseoSansRounded-300',
      fontWeight: '300',
      justifyContent: 'space-between',
      textAlign: 'center'
    },
    
  };

  state = {token:'a',object:{}}

  news = async (token) => {
    try {
      let config = {
        headers: {
          Authorization: token,
        }
      }
      const response = await api.get('/v1/news?results=1&page=1&title=', config);
      if(response.status == 200){
        const object = {
          id: response.data[0],
          title: response.data[0].TITLE,
          news: response.data[0].NEWS,
          create_user: response.data[0].CREATED_USER,
          date_format: response.data[0].DATE_FORMAT,
          date: response.data[0].CREATE_DATE,
          total_records: response.data[0].TOTAL_RECORDS,
          current_page: response.data[0].CURRENT_PAGE,
          previous_page: response.data[0].PREVIOUS_PAGE,
          next_page: response.data[0].NEXT_PAGE
        }
        this.setState({object:object});
      };
    } catch (_err) {
      console.log(_err)
      this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
    }
  };

  setTokenStorage = async () => {
    const returnValue = await AsyncStoragec.retrieveTokenStorage('token');
    this.setState({token:returnValue});
    this.news(returnValue);
  }

  componentDidMount(){
    this.setTokenStorage();
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };    
  
  render() {
  const {object} = this.state;
    return (
      <View style={styles.body}>
        <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <Container>
          <Header>
              <Container style={{flexDirection: 'row'}}>
                      <Icon onPress={() => this.openDrawer()} name="bars" size={30} color="blue" />
              </Container>
          </Header>
          <Icon onPress={() => this.openDrawer()} name="bars" size={30} color="blue" />
          <Image style={{ width: '100%', height: 80 }}source={require('../../images/news.png')}/>
          <View style={styles.container}>
            <View style={styles.titleContainer}> 
              <Text style={styles.title}>{object.title}</Text>
            </View>
            <View style={styles.containerNews}>
              <Text style={styles.textNews}>{object.news}</Text>
            </View>
          </View>
        </Container>
      </Drawer>
      </View>
    )
  }
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default Main;