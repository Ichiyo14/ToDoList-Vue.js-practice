const STORAGE_KEY = 'todos-vuejs'
const todoStorage = {
  fetch: function () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',
  data: {
    todos: todoStorage.fetch(),
    editedComment: null
  },
  methods: {
    doAdd: function (event, value) {
      const comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        edit: false,
        editedComment: null
      })
      comment.value = ''
    },
    doRemove: function (item) {
      this.todos.splice(this.todos.indexOf(item), 1)
    },
    doEdit: function (item) {
      item.edit = true
      this.editedComment = item
    },
    doneEdit: function (item) {
      if (!this.editedComment) {
        return
      }
      this.editedComment = null
      item.edit = false
      if (!item.comment) {
        this.doRemove(item)
      }
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
})
