type User = {
  id: number,
  name: string
}

export default class UserManager
{
  private users : User[] = [];
  public name:string = 'hiroshikoi'

  addUser( user: User ):void
  {
    this.users.push( user );
  }

  removeUser( id: number )
  {
    this.users = this.users.filter(u => u.id !== id);
  }

  getUsers(): User[]
  {
    return this.users;
  }

  get users():User[]
  {
    return this.users;
  }
}
