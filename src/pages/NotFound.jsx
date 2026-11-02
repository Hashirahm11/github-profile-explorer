import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import StateMessage from '../components/common/StateMessage.jsx';

export default function NotFound() {
  return (
    <StateMessage icon={Compass} title="Page not found" action={<Link to="/" className="btn-primary">Back to overview</Link>}>
      The page you are looking for does not exist.
    </StateMessage>
  );
}
