// providers
import { UserProvider } from 'providers/UserProvider';
import { SettingsProvider } from 'providers/SettingsProvider';
import { NavigationDrawerProvider } from 'providers/NavigationDrawerProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

// components
import ThemedApp from 'ThemedApp';
import Compose, { ComposeComponent } from 'components/Compose';

// initial providers (only non dynamic providers)
const providers: ComposeComponent[] = [
  UserProvider,
  SettingsProvider,
  NavigationDrawerProvider,
];

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Compose components={providers}>
        <ThemedApp />
      </Compose>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default App;
