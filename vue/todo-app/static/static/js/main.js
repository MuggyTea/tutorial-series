(function() {
    'use strict';

    var likeComponent = Vue.extend({
        data: function() {
            return {
                count: 0
            }
        },
        props: {
            message: {
                type: String,
                default: 'Like'
            }
        },
        watch: {
            count: {
                handler: function() {
                    localStorage.setItem('count', this.count)
                },
                deep: true
            }
        },
        mounted: function() {
            this.count = localStorage.getItem('count') || 0
        },
        // template: '<button>Like</button><button>Like</button>'   テンプレートは１つの要素しか書けない。複数書きたいときは
        // template: '<div><button>Like</button><button>Like</button></div>  divで囲んで１つの要素にする
        template: '<button v-on:click="countUp" >{{ message }} {{ count }}</button>',
        methods: {
            countUp: function() {
                this.count++;
                this.$emit('increment');
            }
        }
    })

    // two way data binding(to ui)
    var vm = new Vue({
        el: '#app',
        components: {
            'like-component': likeComponent
        },
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
            todos: [],
            total: 0
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
            },
            total: function() {
                localStorage.setItem('total', this.total);
            }
        },
        mounted: function() {
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
            this.total = localStorage.getItem('total') || 0;
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
            },
            incrementTotal: function() {
                this.total++;
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