import Section from "../../ui/section";
import articles from "../../../data/articles.js"
import video from "../../../data/video.js"

export default () => (
    <Section theme="gray">
        <div className="group">
            <div className="column">
                <h2 className="section-title">
                    Aerokube is a small team of software developers
                </h2>

                <p className="section-subtitle">
                    We are creating large scale software testing infrastructure for more than 6 years.
                </p>

                <p>
                    Our experience in building large Selenium clusters allows to create scalable Selenium
                    installation meeting
                    your needs.
                    We also contribute to open-source Selenium tools development.
                </p>

            </div>

            <div className="column column_right">
                <div className="links">
                    <h3 className="section-title">
                        Articles
                    </h3>
                    { articles.map(({title, url}) => (<a className="link" key={url} href={url}>{title}</a>)) }
                </div>
            </div>

            <div className="column column_right">
                <div className="links">
                    <h3 className="section-title">
                        Video
                    </h3>
                    { video.map(({title, url}) => (<a className="link" key={url} href={url}>{title}</a>)) }
                </div>
            </div>
        </div>

        <style jsx>{`

      .section-title {
         max-width: 700px;
         font-weight: 300;
         font-size: 32px;
         line-height: 1.5em;
         margin-bottom: 15px;
      }

      .section-subtitle {
         max-width: 800px;
         font-weight: 300;
         font-size: 23px;
         line-height: 1.3em;
         margin-bottom: 15px;
      }

      .sub {
        color: #aaa;
        font-size: 0.9em;
      }

      .group {
        display: flex;
        padding-bottom: 50px;
        line-height: 1.6em;
        font-size: 18px;
        flex-direction: column;
        height: 100%;
      }

      .column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px 10px 20px;
        flex: 1 1 50%;
      }

      .column_right {
        flex: 1 1 25%;
      }

      .column p {
        padding-bottom: 5px;
      }

      .links {
        align-self: center;
        line-height: 40px;
        width: 100%;
      }

      .link, .link:visited {
        border-left: 1px solid #ccc;
        padding-left: 20px;
        display: block;
        text-decoration: none;
        color: #fff;
      }

      .link:hover {
           border-left: 4px solid #ccc;
           padding-left: 17px;
      }



      @media screen and (min-width: 720px) {
        .group {
            flex-direction: row;
        }
      }

`}</style>
    </Section>
)

