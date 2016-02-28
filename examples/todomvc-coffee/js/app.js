// Generated by CoffeeScript 1.6.3
/*global Vue, todoStorage*/

(function(exports) {
  'use strict';
  var filters;
  filters = {
    all: function(todos) {
      return todos;
    },
    active: function(todos) {
      return todos.filter(function(todo) {
        return !todo.completed;
      });
    },
    completed: function(todos) {
      return todos.filter(function(todo) {
        return todo.completed;
      });
    }
  };
  return exports.app = new Vue({
    el: '.todoapp',
    data: {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    },
    watch: {
      todos: {
        handler: function(todos) {
          return todoStorage.save(todos);
        },
        deep: true
      }
    },
    computed: {
      filteredTodos: function() {
        return filters[this.visibility](this.todos);
      },
      remaining: function() {
        return filters.active(this.todos).length;
      },
      allDone: {
        get: function() {
          return this.remaining === 0;
        },
        set: function(value) {
          return this.todos.forEach(function(todo) {
            return todo.completed = value;
          });
        }
      }
    },
    methods: {
      addTodo: function() {
        var value;
        value = this.newTodo && this.newTodo.trim();
        if (!value) {
          return;
        }
        this.todos.push({
          title: value,
          completed: false
        });
        return this.newTodo = '';
      },
      removeTodo: function(todo) {
        return this.todos.$remove(todo);
      },
      editTodo: function(todo) {
        this.beforeEditCache = todo.title;
        return this.editedTodo = todo;
      },
      doneEdit: function(todo) {
        if (!this.editedTodo) {
          return;
        }
        this.editedTodo = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
          return this.removeTodo(todo);
        }
      },
      cancelEdit: function(todo) {
        this.editedTodo = null;
        return todo.title = this.beforeEditCache;
      },
      removeCompleted: function() {
        return this.todos = filters.active(this.todos);
      }
    },
    directives: {
      'todo-focus': function(value) {
        var el;
        if (!value) {
          return;
        }
        el = this.el;
        return Vue.nextTick(function() {
          return el.focus();
        });
      }
    }
  });
})(window);
