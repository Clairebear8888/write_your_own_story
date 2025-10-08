import ClaireImg from "../claire.png";
import VeraImg from "../vera.jpg";

function AboutUsPage() {
  return (
    <div className="about-us-page">
      <h1>About Us Page</h1>
      <section className="about-app-content">
        <p>
          What if your <span className="important">dear dairy </span>can hear
          you and talk back to you?
        </p>

        <p>
          With <span className="important">Write Your Own Story</span>, you can
          practice journaling just by taking a few moments each day to check in
          with your thoughts and let this process help you you grow, heal, and
          connect more deeply with yourself.
        </p>

        <p>
          {" "}
          If you read your story, you will be surprised have far you have
          come...
        </p>
      </section>
      <section>
        <h2>Our Team</h2>
        <a
          href="https://www.linkedin.com/in/claire%EF%BC%88liwen-zhu-06715713/"
          target="_blank"
        >
          <article>
            <img alt="Claire" src={ClaireImg} />
            <h3>Claire Liwen</h3>
          </article>
        </a>

        <a
          href=" https://www.linkedin.com/in/vera-veramei-5757b257/"
          target="_blank"
        >
          <article>
            <img alt="Vera" src={VeraImg} id="vera-img" />
            <h3>Vera Fileyeva</h3>
          </article>
        </a>
      </section>
    </div>
  );
}

export default AboutUsPage;
