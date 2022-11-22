import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref as dbref,
  set,
  get,
  child,
  update
} from 'firebase/database'
import {
  getStorage,
  ref as storref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'

/**
 * объект конфигурации и подключение к сервисам firebase
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDgEbKHanPksQGZzhcWavlpjzYOMNI6mTU',
  authDomain: 'todo-list-9cc2f.firebaseapp.com',
  databaseURL:
    'https://todo-list-9cc2f-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-list-9cc2f',
  storageBucket: 'todo-list-9cc2f.appspot.com',
  messagingSenderId: '772494855915',
  appId: '1:772494855915:web:6900f08abd41a1656c38ae'
}

const firebaseApp = initializeApp(firebaseConfig)
const database = getDatabase(firebaseApp)
const storage = getStorage(firebaseApp)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App
      database={database}
      dbref={dbref}
      set={set}
      get={get}
      dbChild={child}
      update={update}
      storage={storage}
      storref={storref}
      uploadBytes={uploadBytes}
      getDownloadURL={getDownloadURL}
    />
  </React.StrictMode>
)
