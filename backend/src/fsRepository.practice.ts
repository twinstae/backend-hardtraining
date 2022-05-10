import * as fs from "fs/promises";
const FILE_NAME = "todolist.json";

const fsRepository : TodoRepository = {
  // 함수
  async saveAll(todoList) {
    const data = JSON.stringify(todoList);
    await fs.writeFile("./" + FILE_NAME, data, { encoding: "utf8" });
  },

  async getAll() {
    //readFile(path: PathLike | fs.FileHandle,
    //options?: { encoding?: null; flag?: OpenMode; } & EventEmitter.Abortable): Promise<Buffer>
    const json = await fs.readFile("./" + FILE_NAME, { encoding: "utf-8" });
    // type casting?
    return JSON.parse(json) as Todo[];
  },
};

export default fsRepository;
