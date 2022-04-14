"use strict";
// 데이터를 읽기, 질의 query (read)
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.deleteTodo = exports.completeTodo = exports.addTodo = void 0;
var todoList = [
    {
        content: "일본 라면 먹기",
        completed: false,
        createdAt: Date.now()
    },
];
// Type 'boolean' is not assignable to type 'string'.
// todo란 무엇인가?
"일본 라면 먹기"; // 완료 여부를 표현할 수 없다!
// todo 목록 전체를 가져올 수 있다
// pagination
// 데이터를 변경 mutation, (create update delete)
// todo를 추가할 수 있다
function addTodo(todoList, newTodo) {
    // todoList.push(newTodo);
    return __spreadArray(__spreadArray([], todoList, true), [newTodo], false);
}
exports.addTodo = addTodo;
// todoList.push({ content: "프리스타일 랩하기", completed: true, createdAt: Date.now() });
// todo를 완료할 수 있다
function completeTodo(todoList, targetContent) {
    // const targetTodo = todoList.find(todo => todo.content === targetContent);
    // targetTodo.completed = true;
    return todoList.map(function (todo) { return todo.content === targetContent ? __assign(__assign({}, todo), { completed: true }) : todo; });
}
exports.completeTodo = completeTodo;
// todo를 삭제할 수 있다
function deleteTodo(todoList, targetContent) {
    return todoList.filter(function (todo) { return todo.content !== targetContent; });
}
exports.deleteTodo = deleteTodo;
