import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Config from './firebase.config';



firebase.initializeApp(Config);
const createFirebaseTimestamp = () => {
  return firebase.firestore.Timestamp.fromDate(new Date())
}

let date = createFirebaseTimestamp();

export const createUserProfileDocument = async (userAuth, additionalData)=>{
  if(!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName , email } = userAuth;
    const createdAt = date;

    try {

      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
      
    } catch (error) {
      
    }
  }
  return userRef;
}; 

export const updateUserOrdersCollection = async( userID, data  )=>{
  let orderId;
  const userRef = firestore.doc(`users/${userID}`).collection('orders');
  await userRef.add({
    ...data,
    createdAt : date
  }).then((docRef)=>{
    orderId = docRef.id
  })

  return orderId;

}

export const updateUserOrdersValues = async(userID, data)=>{
  let batch = firestore.batch();
  data.forEach(({id,status})=>{
  console.log(`hereeeee id ${id}    status${status}`);
  const userRef = firestore.doc(`users/${userID}`).collection('orders').doc(id);
  batch.update(userRef,{status})
  })
  await batch.commit().catch(err=> console.log(err));
}


export const getOrders = (orders) => {
  let sortedArrays= {
    open : [],
    closed : []
  }
   orders.docs.forEach(doc => {
     let order = {
    id: doc.id,
    ...doc.data()
  }
  order.status === 'open' ? sortedArrays['open'].push(order) : sortedArrays.closed.push(order)
});

  return sortedArrays
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;