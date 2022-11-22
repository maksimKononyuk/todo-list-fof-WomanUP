import { useState, useEffect, useRef } from 'react'
import Header from './components/Header/Header'
import AddTodoComponent from './components/AddTodoComponent/AddTodoComponent'
import TodoList from './components/TodoList/TodoList'
import dayjs from 'dayjs'
import './App.css'

const App = ({
  database,
  dbref,
  set,
  get,
  dbChild,
  update,
  storage,
  storref,
  uploadBytes,
  getDownloadURL
}) => {
  /** Массив задач, получаемый с БД firebase*/
  const [todos, setTodos] = useState([])

  /** Массив выбранных файлов для отправки в хранилище firebase */
  const [filesForSend, setFilesForSend] = useState([])

  /** Ссылка на тег <a> для загрузки выбранного файла в колонке "Файлы" */
  const fileRef = useRef(null)

  /**
   *  @description Если массив файлов для отправки не пуст, отправляем каждый файл в хранилище firebase
   */
  useEffect(() => {
    if (filesForSend.length > 0) {
      filesForSend.forEach((item) => {
        const storageRef = storref(storage, `files/${item.name}`)
        uploadBytes(storageRef, item).then((snapshot) => {
          console.log('Uploaded a blob or file!')
        })
      })
    }
  }, [filesForSend, storage, storref, uploadBytes])

  /**
   * @description Получение всех записей из БД
   */
  const getTodos = () => {
    const dbRef = dbref(database)
    get(dbChild(dbRef, 'todos'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const todos = Object.values(snapshot.val())
          todos.sort((a, b) => a.timestamp - b.timestamp)
          todos.forEach((item) => {
            if (dayjs(item.endDate).diff(dayjs()) <= 0) item.timeUp = true
          })
          setTodos(todos)
        } else {
          setTodos([])
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getTodos()
  }, [])

  /**
   *
   * @param {string} todoId - id задачи, присваивается библиотекой uiid
   * @param {string} title - заголовок
   * @param {string} description - описание
   * @param {string} endDate - дата конца выполнения задачи
   * @param {Array of string} files - массив строк с названием отправленных в хранилище файлов
   * @param {boolean} status - статус задачи (выполнено/невыполнено/время истекло)
   * @param {number} timestamp - дата в милисекундах для сортировки задач по времени добавления
   * @description Функция для записи задачи в БД
   */
  const writeData = (
    todoId,
    title,
    description,
    endDate,
    files,
    status = false,
    timestamp = Date.now()
  ) => {
    console.log(timestamp)
    set(dbref(database, 'todos/' + todoId), {
      todoId,
      title,
      description,
      endDate,
      files: files.map((item) => item.name),
      status,
      timestamp
    })
    getTodos()
  }

  /**
   *
   * @param {string} id - id удаляемой задачи
   * @deccription Функция удаления записи
   */
  const deleteData = (id) => {
    set(dbref(database, 'todos/' + id), null)
    getTodos()
  }

  /**
   *
   * @param {string} id - id редактируемой задачи
   * @deccription Функция редактирования записи
   */
  const updateData = (id) => {
    const todo = todos.find((item) => item.todoId === id)
    const updates = {}
    updates['/title'] = todo.title
    updates['/description'] = todo.description
    updates['/endDate'] = todo.endDate
    updates['/files'] = todo.files
    update(dbref(database, 'todos/' + id), updates)
    getTodos()
  }

  /**
   *
   * @param {string} id - id редактируемой задачи
   * @deccription Функция редактирования статуса записи (выполнено/невыполнено)
   */
  const updateStatus = (id) => {
    const todo = todos.find((item) => item.todoId === id)
    const updates = {}
    updates['/status'] = todo.status
    update(dbref(database, 'todos/' + id), updates)
    getTodos()
  }

  /**
   *
   * @param {} event - событие нажатия на блок с названием файла в колонке "Файлы"
   * @description Функция для скачивания файла, по котороу был клик
   */
  const refToFileHandler = (event) => {
    const fileName = event.target.textContent
    getDownloadURL(storref(storage, `files/${fileName}`)).then((url) => {
      fileRef.current.href = url
      fileRef.current.click()
    })
  }

  return (
    <div className='App'>
      <Header />
      <AddTodoComponent
        writeData={writeData}
        setFilesForSend={setFilesForSend}
        filesForSend={filesForSend}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        deleteData={deleteData}
        updateData={updateData}
        updateStatus={updateStatus}
        refToFileHandler={refToFileHandler}
      />
      <a
        ref={fileRef}
        target={'_blank'}
        rel='noreferrer'
        href='##'
        style={{ display: 'none' }}
      >
        Загрузить
      </a>
    </div>
  )
}

export default App
