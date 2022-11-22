import Todo from './Todo'

const TodoList = ({
  todos,
  setTodos,
  deleteData,
  updateData,
  updateStatus,
  refToFileHandler
}) => {
  /**
   * Функция удаления элемента массива задач
   * @param {string} id -id задачи
   */
  const deleteTodo = (id) => {
    deleteData(id)
  }

  /**
   * Функция поиска по id элемента, у которого нажат чекбокс статуса, инверсия этого статуса и обновление в БД
   * @param {string} id - id задачи
   */
  const statusTodo = (id) => {
    const newTodos = [...todos].map((item) => {
      if (item.todoId === id) item.status = !item.status
      return item
    })
    setTodos(newTodos)
    updateStatus(id)
  }

  return (
    <div className='todo_list'>
      {todos.map((item) => (
        <Todo
          key={item.todoId}
          item={item}
          deleteTodo={deleteTodo}
          statusTodo={statusTodo}
          setTodos={setTodos}
          updateData={updateData}
          refToFileHandler={refToFileHandler}
        />
      ))}
    </div>
  )
}

export default TodoList
