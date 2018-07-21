import Page from "../components/ui/page";
import Head from "../components/ui/page/head";
import Section from "../components/ui/section";
import Menu from "../components/ui/shared/menu";
import CLI from "../components/ui/shared/cli"
import Projects from "../components/view/landing/projects"

import Articles from "../components/view/landing/articles"

const Index =
    () => (
        <Page>
            <Head>
                <title>Aerokube • Software testing infrastructure</title>
            </Head>

            <Section theme="purple" style={{paddingTop: 0, paddingBottom: 0}}>
                <Menu />
                <h1 className="title title-hero">
                    <b>Simple</b> and <b>extremely effective</b> solutions for your test infrastructure.
                </h1>

                <p>
                    We use them in our everyday work and they are awesome!
                </p>

                <div className='separator' data-after='start'/>

                <p className="cli-download">
                    Ready to dive? <a className="cli-download__link"
                                      href="https://github.com/aerokube/cm/releases/latest">Download CM</a> - cli
                    tool <br/> for Aerokube projects.
                </p>

                <div className='cli-container'>
                    <CLI />
                </div>
            </Section>

            <Articles/>
            <Projects/>


            <style jsx>{`

      /* = CLI
       * ==================================================================== */
      .cli-container {
        display: flex;
        justify-content: center;
        margin-top: 40px;
        margin-bottom: -50px;
        padding-bottom: 30px;
        z-index: 1;
        font-size: 10px;
        max-width: 90%;
      }


      /* = SEPARATOR
       * ==================================================================== */
      .separator {
        width: 2px;
        height: 24px;
        opacity: 0.25;
        border: dashed 1px #ffffff;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        margin-bottom: 30px;
        margin-top: 20px;
      }

      .separator::after {
        content: attr(data-after);
        color: rgba(255,255,255,.75);
        font-weight: 300;
        position: absolute;
        top: 100%;
        margin-top: 5px;
        transform: translateX(-50%);
      }

       .cli-download {
            text-align: center;
            font-size: 0.8em;
            font-weight: 400;
       }

       .cli-download__link {
            color: #eee;
            font-weight: 600;
       }

      .title {
        text-align: center;
        max-width: 700px;
        font-weight: 200;
        font-size: 37px;
        line-height: 1.5em;
        margin-bottom: 10px;
      }

      .title-hero {
        margin-top: 50px;
      }

      @media screen and (min-width: 560px) {
        .cli :global(>) :global(*) {
          margin-bottom: -80px;
        }

        .cli__inner {
            max-width: 760px;
        }

      }
            `}</style>
        </Page>
    );

export default Index
