import '../components/videos.scss';
import '../components/writing-content.scss';
import Videos from '../components/Videos';
import Writings from "../components/Writings";
import About from "./About";

function Home() {

  return (
    <>
      <section className="wrapper">
        <div className="intro">
          <h3>Video Work</h3>
          {/* <div className="select-wrapper">
            <select>
              <option selected="selected">All</option>
              <option>Producer</option>
              <option>Editor</option>
              <option>Writer</option>
            </select>
          </div> */}
        </div>
        <Videos />
      </section>

      <section className="wrapper">
        <div className="intro">
          <h3>Content Writing</h3>
        </div>
        <Writings />
      </section>

      <section className="wrapper">
        <About />
      </section>
    </>
  )
}

export default Home;

