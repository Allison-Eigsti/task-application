import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  console.log(error);

  return <h1>Something went wrong</h1>;
}

export default ErrorPage