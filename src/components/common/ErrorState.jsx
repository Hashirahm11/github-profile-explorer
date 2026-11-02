import { Link } from 'react-router-dom';
import { Clock, RefreshCw, UserX, WifiOff, AlertTriangle } from 'lucide-react';
import StateMessage from './StateMessage.jsx';

// Turns API errors into friendly messages; raw errors are never shown to users.
export default function ErrorState({ error, username, onRetry }) {
  const retry = onRetry && (
    <button type="button" onClick={onRetry} className="btn-primary">
      <RefreshCw className="h-4 w-4" aria-hidden="true" /> Try again
    </button>
  );

  switch (error?.type) {
    case 'not_found':
      return (
        <StateMessage icon={UserX} tone="error" title="User not found"
          action={<Link to="/explore" className="btn-primary">Search another username</Link>}>
          {username ? `No GitHub user named "${username}" exists.` : 'That GitHub user does not exist.'} Check the spelling and try again.
        </StateMessage>
      );
    case 'rate_limit': {
      const time = error.resetAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return (
        <StateMessage icon={Clock} tone="warning" title="GitHub API rate limit reached" action={retry}>
          GitHub allows 60 unauthenticated requests per hour from one IP address.{' '}
          {time ? `You can search again after ${time}.` : 'Please wait a while and try again.'}
        </StateMessage>
      );
    }
    case 'network':
      return (
        <StateMessage icon={WifiOff} tone="error" title="Connection problem" action={retry}>
          GitHub could not be reached. Check your internet connection and try again.
        </StateMessage>
      );
    default:
      return (
        <StateMessage icon={AlertTriangle} tone="error" title="Something went wrong" action={retry}>
          GitHub returned an unexpected response. Please try again in a moment.
        </StateMessage>
      );
  }
}
