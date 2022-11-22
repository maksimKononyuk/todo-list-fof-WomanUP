import { useState } from 'react'

const Todo = ({
  item,
  deleteTodo,
  statusTodo,
  setTodos,
  updateData,
  refToFileHandler
}) => {
  /**
   * Состояние хранящее значение - включен ли режим редактирования добавленных задач
   */
  const [isEdit, setIsEdit] = useState(false)

  /**
   * Id редактируемой задачи
   */
  const [changeId, setChangeId] = useState(0)

  /**
   * Функция включения режима редактирования при нажатии на "Редактировать", после кнопка становиться "Сохранить".
   * При нажатиии на "Сохраить" вызывается функция для изменения данных для текущег id редактируемой задачи
   */
  const edit = () => {
    setIsEdit((prev) => !prev)
    if (isEdit && changeId) updateData(changeId)
  }

  /**
   *
   * @param {string} id - id задачи
   * @param {string} value - новое значения поля
   * @param {string} fieldForChange - поле, которое редактируется
   * @description Функция поиска нужного элемента из массива задач, который в данный момент редактируется
   * и редактирование его элементов, а также уставка его id в локальное состояние
   */
  const change = (id, value, fieldForChange) => {
    setTodos((prev) => {
      const newTodos = [...prev]
      const elem = newTodos.find((item) => item.todoId === id)
      elem[fieldForChange] = value
      return newTodos
    })
    setChangeId(id)
  }

  return (
    <div className='todo'>
      <div className='item' style={{ width: '18%' }}>
        <h4>Заголовок</h4>
        {isEdit ? (
          <textarea
            className='input'
            value={item.title}
            onChange={(e) => change(item.todoId, e.target.value, 'title')}
          />
        ) : (
          <p>{item.title}</p>
        )}
      </div>
      <div className='item' style={{ width: '23%' }}>
        <h4>Описание</h4>
        {isEdit ? (
          <textarea
            className='input'
            value={item.description}
            onChange={(e) => change(item.todoId, e.target.value, 'description')}
          />
        ) : (
          <p>{item.description}</p>
        )}
      </div>
      <div className='item' style={{ width: '11%' }}>
        <h4>Дата завершения</h4>
        {isEdit ? (
          <input
            type={'date'}
            className='input'
            value={item.endDate}
            onChange={(e) => change(item.todoId, e.target.value, 'endDate')}
          />
        ) : (
          <p>{item.endDate}</p>
        )}
      </div>
      <div className='item' style={{ width: '20%' }}>
        <h4>Файлы</h4>
        <div className='files'>
          {item.files
            ? Object.values(item.files).map((item, index) => (
                <div
                  key={index}
                  className='refToFile'
                  onClick={refToFileHandler}
                >
                  {item}
                </div>
              ))
            : 'Файлов нет'}
        </div>
      </div>
      <div className='item' style={{ width: '10%' }}>
        <h4>Статус</h4>
        <div style={{ color: item.timeUp ? 'red' : '#000' }}>
          {item.timeUp
            ? 'Время вышло'
            : item.status
            ? 'Выполнено'
            : 'Не выполнено'}
        </div>
      </div>
      <div className='item buttons' style={{ width: 195 }}>
        <div className='checkbox' onClick={() => statusTodo(item.todoId)}>
          {item.status && !item.timeUp && <div></div>}
        </div>
        <button onClick={edit}>{isEdit ? 'Сохранить' : 'Редактировать'}</button>
        <button onClick={() => deleteTodo(item.todoId)}>Удалить</button>
      </div>
    </div>
  )
}

export default Todo
