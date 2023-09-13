import firebaseApp from '../index.js'
import { 
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,

} from 'firebase/functions';

const functions = getFunctions(firebaseApp)
functions.region = 'asia-northeast1'

// エミュレーター
if(process.env.NODE_ENV === 'development'){
  connectFunctionsEmulator(functions, 'localhost', 5001)
}

export default{

  sendMail(message){
    const func = httpsCallable(functions, 'sendMail')
    const result = func(message)
    return result
  },

  test(person){
    const func = httpsCallable(functions, 'test')
    const result = func(person)
    return result
  }
}