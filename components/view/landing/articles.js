import Section from "../../ui/section";
import articles from "../../../data/articles.js"

export default () => (
    <Section theme="gray">
        <div className="group">
            <div className="column">
                <h2 className="section-title">
                    Aerokube is a small team of software developers
                </h2>

                <h3 className="section-subtitle">
                    We are creating large scale software testing infrastructure for more than 6 years.
                </h3>

                <p>
                    Our experience in building large Selenium clusters allows to create scalable Selenium
                    installation meeting
                    your needs.
                    We also contribute to open-source Selenium tools development.
                </p>

                <p className="sub">
                    Take a look at our articles to learn more about what we do.
                </p>
            </div>

            <div className="column">
                <div className="links">
                    <h3 className="section-title">
                        Articles
                    </h3>
                    { articles.map(({title, url}) => (<a className="link" key={url} href={url}>{title}</a>)) }
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
         color: #ccc;
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
      }

      .column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 10px 20px 10px 20px;
      }

      .column p {
        padding-bottom: 5px;
      }

      .links {
        align-self: center;
        line-height: 40px;
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



      @media screen and (min-width: 580px) {
        .group {
            flex-direction: row;
        }

        .column {
            width: 50%;
        }
      }

`}</style>
    </Section>
)

