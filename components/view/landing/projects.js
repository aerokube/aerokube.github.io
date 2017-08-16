import Section from "../../ui/section";
import Projects from "../../ui/shared/projects"

export default () => (
    <Section theme="yellow" style={{paddingBottom: 0}}>
        <h1 className="title" id="projects-section">
            Open source projects
        </h1>

        <p>
            More projects will come soon! Stay tuned 
            <a className="social" href="http://twitter.com/aerokube">@aerokube</a>.
        </p>

        <Projects/>

        <style jsx>{`
    .title {
        text-align: center;
        max-width: 700px;
        font-weight: 200;
        font-size: 37px;
        line-height: 1.5em;
        margin-bottom: 10px;
      }
    .social {
        text-decoration: underline;
        color: #000;
        margin-left: 3px;
      }

`}</style>
    </Section>
)

