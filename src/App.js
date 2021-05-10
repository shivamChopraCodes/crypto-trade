
import { useEffect } from 'react';
import axios from "axios";
import Chart from './components/chart/chart.component';
import { Redirect, Route, Switch } from 'react-router';
import ExchangePage from './pages/exchange/exchange.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/user/user.action';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


function App() {
  const currentUser = useSelector(state=>state.user.currentUser);
  let dispatch = useDispatch()
  let unsubscribeFromAuth = null;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          dispatch(setUser({
            id: snapShot.id,
            ...snapShot.data()
          }
          ));

        })
      } 
      
      dispatch(setUser(userAuth));
      

    });

    return function cleanup() {
      unsubscribeFromAuth();
    };
  }, []);
  return (
    <div className="App bg-gray-200 min-h-screen">
    <Header />
    <Switch>
      <Redirect exact path='/' to='/exchange/bitcoin-inr' />
      <Route  path='/exchange/:currencies' component={ExchangePage}  />
      <Route exact path='/signin' render={()=> currentUser
      ?
      <Redirect to='/' />
      :
       <SignInAndSignUp />
        } /> 
    </Switch>
    </div>
  );
}

export default App;
