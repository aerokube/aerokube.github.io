import FontAwesome from "./styles/font-awesome";
import Normalize from "./styles/normalize";
import Footer from "./footer";

export default
//language=CSS
({children}) => (
    <div>
        {children}
        <FontAwesome />
        <Normalize />
        <Footer/>
        <style jsx global>{`
            body,
            h1, h2, h3, h4, h5, h6,
            blockquote, p, pre,
            dl, dd, ol, ul,
            figure,
            hr,
            fieldset, legend {
                margin: 0;
                padding: 0;
            }

            body {
                height: 100%;
            }

            h1, h2, h3, h4, h5, h6 {
                line-height: 1.25;
            }

            html {
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                overflow-y: scroll;
                height: 100%;
                font-weight: 100;
            }

            /* = WRAPPER
             * ==================================================================== */
            .u-wrapper {
                padding-left: 30px;
                padding-right: 30px;
                margin-left: auto;
                margin-right: auto;
            }

        `}</style>
    </div>
)
