import { useRef } from 'react'

const AddTodoItem = ({
  name,
  title,
  setTitle,
  setEmptyFields,
  emptyFields,
  width,
  isFile,
  isDate,
  setFilesForSend,
  files
}) => {
  /**
   * Ссылка на скрытый тег <input type='file'/> для выбора файлов
   */
  const input = useRef(null)

  /**
   * @description Функция для вызова окна выбора файлов из браузера, по нажатию на блок "Прикрепить файлы"
   */
  const changeFile = () => {
    input.current.click()
  }

  /**
   *
   * @param {} event - событие при выборе файла в браузере
   * @description При выборе файлов в окне выбора тип FileList преобразуется в массив и устанавливает локальное состояние массива выбранных файлов
   */
  const selectedFiles = (event) => {
    const { files } = event.target
    const filesArr = Array.from(files)
    setFilesForSend(filesArr)
  }

  return (
    <div className='add_todo_item' style={{ width }}>
      <div
        className='name'
        style={isFile ? { cursor: 'pointer' } : {}}
        onClick={() => isFile && changeFile()}
      >
        {name}
      </div>
      {isFile ? (
        <>
          <input
            ref={input}
            type={'file'}
            multiple={true}
            style={{ display: 'none' }}
            onChange={selectedFiles}
          />
          <div className='files'>{files.map((item) => `${item.name}\n`)}</div>
        </>
      ) : isDate ? (
        <input
          onChange={(e) => setTitle(e.target.value)}
          type={'date'}
          style={
            emptyFields?.includes(name)
              ? {
                  borderWidth: 3,
                  borderColor: 'red',
                  height: '100%'
                }
              : { height: '100%' }
          }
        />
      ) : (
        <textarea
          className='input'
          placeholder='Введите данные...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => emptyFields && setEmptyFields([])}
          style={
            emptyFields?.includes(name)
              ? {
                  borderWidth: 3,
                  borderColor: 'red'
                }
              : {}
          }
        />
      )}
    </div>
  )
}

export default AddTodoItem
