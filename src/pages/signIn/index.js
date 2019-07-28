import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar,View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStoragec from '../../class/asyncStorage';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/FontAwesome';


import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
  Div
} from './styles';

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    user: 'Administrador',
    password: '123456',
    error: '',
  };

  handleEmailChange = (user) => {
    this.setState({ user });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };
  
  handleSignInPress = async () => {
    if (this.state.user.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
        const response = await api.post('/v1/login', {
          user: this.state.user,
          password: this.state.password,
        });
        if(response.status == 200){
          AsyncStoragec.saveTokenStorage('token',response.data)
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Main'}),
            ],
          });
           
          this.props.navigation.dispatch(resetAction);
        }
      } catch (_err) {
        console.log(_err)
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../images/airbnb_logo.png')} resizeMode="contain" />
          <Div>
            <View style={{justifyContent: "center"}}>
              <Icon name="ios-contact" size={30} color="#4F8EF7" />
            </View> 
            <Input 
              underlineColorAndroid="transparent"
              style={{width: "80%", height: 50}}
              placeholder="Usuário"
              value={this.state.user}
              onChangeText={this.handleUserChange}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Div>
          <Div>
            <View style={{justifyContent: "center"}}>
              <Icon name="ios-key" size={30} color="#4F8EF7" />
            </View> 
            <Input 
              underlineColorAndroid="transparent"
              style={{width: "80%", height: 50,}}
              placeholder="Senha"
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
          </Div>
          {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
          <Button onPress={this.handleSignInPress}>
            <ButtonText>Entrar</ButtonText>
          </Button>
          <SignUpLink onPress={this.handleCreateAccountPress}>
            <SignUpLinkText>Criar conta grátis</SignUpLinkText>
          </SignUpLink>
      </Container>
    );
  }
}