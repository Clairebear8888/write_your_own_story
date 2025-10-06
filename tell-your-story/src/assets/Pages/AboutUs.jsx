import ClaireImg from "../claire.png";
import VeraImg from "../vera.jpg";

function AboutUsPage() {
  return (
    <div className="about-us-page">
      <h1>About Us Page</h1>
      <section className="about-app-content">
        <p>
          At <span className="important">Create Your Own Story</span>, we
          believe journaling is more than just writing — it’s an essential
          practice for self-reflection and self-understanding. Taking a few
          moments each day to check in with your thoughts and feelings can help
          you grow, heal, and connect more deeply with yourself. But our app
          goes a step further.
        </p>
        <p>
          Beyond classic journaling, it invites you to turn your reflections
          into a personal story — one that you can read from a fresh,
          third-person perspective. This unique feature helps you see your
          experiences in a new light, shift your point of view, and discover the
          next steps you want to take on your journey. Your story is unfolding
          every day — and here, you get to write it your way.
        </p>
      </section>
      <h2>Our Team</h2>
      <section className="about-team-content">
        <article>
          <img alt="Claire" src={ClaireImg} />
          <h3>Claire Liwen</h3>
        </article>
        <article>
          <img alt="Vera" src={VeraImg} id="vera-img" />
          <h3>Vera Fileyeva</h3>
        </article>
      </section>
    </div>
  );
}

export default AboutUsPage;
