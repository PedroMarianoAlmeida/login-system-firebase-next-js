import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Home() {
  return (
    <>
      <Typography variant="h1" align="center">
        Login System Template
      </Typography>

      <Typography variant="h2">Tech Stack</Typography>
      <ul>
        <li>React</li>
        <li>Next.js</li>
        <li>Firebase</li>
        <li>Material UI</li>
      </ul>

      <Typography variant="h2">Github Repo</Typography>
      <ul>
        <li>
          <Link
            href="https://github.com/PedroMarianoAlmeida/login-system-firebase-next-js"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </Link>
        </li>
      </ul>
    </>
  );
}
