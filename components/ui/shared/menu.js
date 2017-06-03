export default () => (
    <div className="header">
        <div className="logo">Aerokube</div>

        <div className="menu">
            <a className="item" href="#projects-section">Projects</a>
            <a className="item" href="https://github.com/aerokube">GitHub</a>
            <a className="item" href="https://telegram.me/aerokube">Telegram</a>
            <a className="item" href="http://twitter.com/aerokube">Twitter</a>
            <a className="item" href="mailto:support@aerokube.com">Contact Us</a>
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
                align-items: center;
                text-transform: uppercase;
                font-size: 15px;
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
        `}</style>
    </div>
)
