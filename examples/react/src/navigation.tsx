import { Link } from '@router-example/react';

export const Navigation = () => {
  return (
    <nav>
      <Link to={'/'}>Index</Link>
      <Link to={'/home'}>Home</Link>
      <Link to={'/about'}>About</Link>
    </nav>
  );
};
