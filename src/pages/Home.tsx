import { Navigate } from 'react-router-dom';
import { ClassCards } from '../components/home/ClassCards';
import { HeroParallaxComponent } from '../components/home/HeroParallaxComponent';
import { MembersComponent } from '../components/home/MembersComponent';
import { Presentation } from '../components/home/Presentation';
import { StartComponent } from '../components/home/StartComponent';
import { isLoggedIn } from '../hooks/use-auth';
import '../styles/style-home.css';

export const Home = () => {
  const loggedIn = isLoggedIn();

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="home-container">
      <section id="hero-section">
        <HeroParallaxComponent />
      </section>

      <section id="about-section">
        <ClassCards />
      </section>

      <section id="presentation-section">
        <Presentation />
      </section>

      <section id="membres-section">
        <MembersComponent />
      </section>

      <section id="start-section">
        <StartComponent />
      </section>
    </div>
  );
};
