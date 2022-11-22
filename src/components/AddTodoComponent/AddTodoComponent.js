import { useState } from 'react'
import AddTodoItem from './AddTodoItem'
import uuid from 'react-uuid'

const AddTodoComponent = ({ writeData, setFilesForSend, filesForSend }) => {
  /**
   * Значение полей для добавления новой задачи
   */
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [endDate, setEndDate] = useState('')

  /**
   * Массив с названием незаполенных полей
   */
  const [emptyFields, setEmptyFields] = useState([])

  /**
   * @description Функция записи задачи в БД по нажатию на кнопку "Добавить" если нужные поля заполнены, а также обнуление полей и массива выбранных файлов после нажатия кнопки
   */
  const addTodo = () => {
    const emptyFields = []
    if (!title) emptyFields.push('Заголовок')
    if (!description) emptyFields.push('Описание')
    if (!endDate) emptyFields.push('Дата')
    setEmptyFields(emptyFields)
    if (emptyFields.length === 0) {
      writeData(uuid(), title, description, endDate, filesForSend)
      setTitle('')
      setDescription('')
      setEndDate('')
      setFilesForSend([])
    }
  }

  return (
    <div className='add_todo'>
      <AddTodoItem
        name={'Заголовок'}
        title={title}
        setTitle={setTitle}
        emptyFields={emptyFields}
        setEmptyFields={setEmptyFields}
        width={'23%'}
      />
      <AddTodoItem
        name={'Описание'}
        title={description}
        setTitle={setDescription}
        emptyFields={emptyFields}
        setEmptyFields={setEmptyFields}
        width={'43%'}
      />
      <AddTodoItem
        name={'Дата'}
        title={endDate}
        setTitle={setEndDate}
        emptyFields={emptyFields}
        setEmptyFields={setEmptyFields}
        isDate={true}
      />
      <AddTodoItem
        name={'Прикрепить файлы'}
        title={filesForSend}
        setTitle={setFilesForSend}
        isFile={true}
        width={'20%'}
        setFilesForSend={setFilesForSend}
        files={filesForSend}
      />
      <button onClick={addTodo}>Добавить</button>
    </div>
  )
}

export default AddTodoComponent
