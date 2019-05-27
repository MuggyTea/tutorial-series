(function() {
    'use strict';

    // two way data binding(to ui)
    var vm = new Vue({
        el: '#app',
        data: {
            newItem: '',
            // todos: [{
            //     title: 'task1',
            //     isDone: false
            // }, {
            //     title: 'task2',
            //     isDone: false
            // }, {
            //     title: 'task3',
            //     isDone: true
            // }]
            todos: []
        },
        watch: {
            // todos: function() {
            //     localStorage.setItem('todos', JSON.stringify(this.todos));
            //     alert('data saved!');
            // }
            todos: {
                handler: function() {
                    localStorage.setItem('todos', JSON.stringify(this.todos));
                    // alert('data saved!');
                },
                deep: true
            }
        },
        mounted: function() {
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        },
        methods: {
            addItem: function() {
                // console.log('add Item')
                var item = {
                    title: this.newItem,
                    isDone: false
                };
                // todosはaddItemメソッドで定義されていないから、thisを付ける
                // このメソッド内で定義したitemをtodosにプッシュするので、thisはいらない
                this.todos.push(item);
                this.newItem = '';
            },
            deleteItem: function(index) {
                if (confirm('delete?')) {
                    this.todos.splice(index, 1)
                }
            },
            purge: function() {
                if (!confirm('delete finished?')) {
                    return;
                }
                // this.todos = this.todos.filter(function(todo) {
                //     return !todo.isDone;
                // });
                console.log(this.remaining)
                this.todos = this.remaining;
            }
        },
        computed: {
            remaining: function() {
                // console.log('remaining')
                // itemsはまだ終っていないタスクのみを入れる
                var items = this.todos.filter(function(todo) {
                    // todo.isDoneがfalse=タスクがまだ終わっていないものを返す、をtodosからフィルターする
                    return !todo.isDone;
                });
                // まだ終わっていないタスクの個数を返す
                // console.log(items.length);
                return items;
            }
        },
    });
})();