export default () => (
    <div className="header">
        <div className="logo"><img className="logo-img" src="static/img/logo.svg" height="50px"/>Aerokube</div>

        <div className="menu">
            <a className="item" href="#projects-section"><i className="fa fa-bolt" aria-hidden="true"></i>&nbsp;Projects</a>
            <a className="item" href="https://github.com/aerokube"><i className="fa fa-github" aria-hidden="true"></i>&nbsp;GitHub</a>
            <a className="item" href="https://telegram.me/aerokube"><i className="fa fa-telegram" aria-hidden="true"></i>&nbsp;Telegram</a>
            <a className="item" href="http://twitter.com/aerokube"><i className="fa fa-twitter" aria-hidden="true"></i>&nbsp;Twitter</a>
            <a className="item" href="mailto:support@aerokube.com"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;Contact&nbsp;Us</a>
        </div>

        <style jsx>{`
            .header {
                height: 80px;
                align-self: flex-start;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
            }

            .menu {
                height: 100%;
                display: flex;
                align-items: flex-end;
                text-transform: uppercase;
                font-size: 15px;
                flex-direction: column;
            }

            .item {
                margin-right: 10px;
                margin-left: 10px;
                text-decoration: none;
                color: #fff;
                display: block;
            }

            .logo {
                font-weight: 800;
                margin-right: 50px;
                font-size: 1.5em;
            }

            .logo-img {
                margin-bottom: -20px;
                margin-right: 10px;
            }


             @media screen and (min-width: 560px) {
                .menu {
                    flex-direction: row;
                    align-items: center;
                }
             }
        `}</style>
    </div>
)
