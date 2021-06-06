import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Home() {
  return (
    <>
      <Typography variant="h1" align="center">
        React + Next + Material UI Template
      </Typography>
      <Typography paragraph> 
        You can check my components to help in your project <Link href="https://next-material-ui-components.vercel.app/" target="_blank" rel="noopener noreferrer">
        here
      </Link>
      </Typography>
    </>
  );
}
