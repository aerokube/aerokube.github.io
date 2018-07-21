export default () => (
    <div className="header">
        <div className="logo"><img className="logo-img" src="static/img/logo.svg" height="50px"/>Aerokube</div>

        <div className="menu">
            <a className="item" href="https://github.com/aerokube"><i className="fa fa-github" aria-hidden="true"></i><span className="title">&nbsp;GitHub</span></a>
            <a className="item" href="https://telegram.me/aerokube"><i className="fa fa-telegram" aria-hidden="true"></i><span className="title">&nbsp;Telegram</span></a>
            <a className="item" href="http://twitter.com/aerokube"><i className="fa fa-twitter" aria-hidden="true"></i><span className="title">&nbsp;Twitter</span></a>
            <a className="item" href="mailto:support@aerokube.com"><i className="fa fa-envelope-o" aria-hidden="true"></i><span className="title">&nbsp;Contact&nbsp;Us</span></a>
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

            .title {
                display: none;
            }

            .menu {
                height: 100%;
                display: flex;
                text-transform: uppercase;
                font-size: 15px;
                align-items: center;
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
                flex-shrink: 0;
            }

            .logo-img {
                margin-bottom: -20px;
                margin-right: 10px;
            }


             @media screen and (min-width: 720px) {
                .title {
                    display: inline-block;
                }
             }
        `}</style>
    </div>
)
