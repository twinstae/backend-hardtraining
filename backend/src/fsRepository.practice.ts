import * as fs from "fs/promises";
const FILE_NAME = "todolist.json";

const fsRepository : ITodoRepository = {
    async saveAll(todoList){
        const data = JSON.stringify(todoList)
        fs.writeFile(FILE_NAME, data, {encoding : "utf-8"})
    },
    async getAll() {
        const todoList = await fs.readFile(FILE_NAME, {encoding:"utf-8"})
        const data = JSON.parse(todoList)
    
        return data;
    }


}

export default fsRepository;