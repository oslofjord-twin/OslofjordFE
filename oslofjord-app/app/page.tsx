import Dashboard from './pages/Dashboard/page';
import AuthClient from './api/AuthClient';


export default function Home() {
  return (
    <main>
      <AuthClient>
        <Dashboard/>
      </AuthClient>
      {/*<BottomNav/> ? show only on mobile; alt - MUI drawer*/}
    </main>
  )
}
