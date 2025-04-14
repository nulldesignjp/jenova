type todo = {
  id: number,
  text: string,
  done: boolean
}

export default class TodoManager
{

  private static id:number = 0;

  private todolist: todo[];

  constructor()
  {
    this.todolist = []
  }

  addTodo( text: string ):void
  {
    const _todo = {
      id: TodoManager.id++,
      text: text,
      done: false
    }
    this.todolist.push( _todo );
  }

  removeTodo( id: number ):void
  {
    this.todolist = this.todolist.filter(u => u.id !== id);
  }

  toggleTodo( id: number ):void
  {
    const _target = this.todolist.find(u => u.id === id);

    if( _target )
    {
      _target.done = !_target.done;
    }

  }

  get allTodos(): todo[]
  {
    return this.todolist;
  }
}
