// src/components/Hello.tsx

type HelloProps = {
  name: string;
  age: number;
};

const Hello = ({ name, age }: HelloProps) => {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
};

export default Hello;
