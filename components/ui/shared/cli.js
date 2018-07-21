const CLI = () => (
    <div className='cli'>
        <div className='cli__header'>
            <div className='cli__buttons'>
                <i className='cli__button'/>
                <i className='cli__button'/>
                <i className='cli__button'/>
            </div>
            <div className="cli__title">Terminal</div>
        </div>

        <div className="cli__body">
            <div className='cli__lines'>
                <div className="cli__line">$ curl -s https://aerokube.com/cm/bash | bash</div>
                <div className="cli__line cli__line--break"/>
                <div className="cli__line"> █████╗ ███████╗██████╗  ██████╗ ██╗  ██╗██╗   ██╗██████╗ ███████╗</div>
                <div className="cli__line">██╔══██╗██╔════╝██╔══██╗██╔═══██╗██║ ██╔╝██║   ██║██╔══██╗██╔════╝</div>
                <div className="cli__line">███████║█████╗  ██████╔╝██║   ██║█████╔╝ ██║   ██║██████╔╝█████╗</div>
                <div className="cli__line">██╔══██║██╔══╝  ██╔══██╗██║   ██║██╔═██╗ ██║   ██║██╔══██╗██╔══╝</div>
                <div className="cli__line">██║  ██║███████╗██║  ██║╚██████╔╝██║  ██╗╚██████╔╝██████╔╝███████╗</div>
                <div className="cli__line">╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝</div>
                <div className="cli__line cli__line--break"/>
                <div className="cli__line"> % Total    % Received % Xferd  Average Current</div>
                <div className="cli__line"> 100   605    0   605    0     0    598    599</div>
                <div className="cli__line"> 100 9673k  100 9673k    0     0  1526k  2330k</div>
                <div className="cli__line cli__line--break"/>
                <div className="cli__line cli__line--break"/>
                <div className="cli__line"> SUCCESSFULLY DOWNLOADED!</div>
                <div className="cli__line cli__line--break"/>
                <div className="cli__line"> Git Revision: 1.5.1</div>
                <div className="cli__line"> UTC Build Time: 2018-07-19_04:58:34PM</div>
                <div className="cli__line cli__line--break"/>
                <div className="cli__line"> Now you can run Selenoid with cm:</div>
                <div className="cli__line"> ./cm selenoid start --vnc</div>
                <div className="cli__line cli__line--break"/>
                <div className="cli__line"> To get instant help just type:</div>
                <div className="cli__line"> ./cm --help</div>
                <div className="cli__line cli__line--break"/>
                <div className="cli__line cli__line--break"/>
            </div>
        </div>
        <style jsx>{`
      .cli {
        text-align: left;
        border-radius: 6px;
        box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.35);
        width: 100%;
        overflow: hidden;
      }

      .cli__header {
        text-align: center;
        padding: 10px 0;
        font-size: 12px;
        color: #fff;
        font-weight: 500;
        background-color: #7a91c4;
        display: flex;
      }

      .cli__title {
        flex: 1 0;
        padding-right: 15px;
      }

      .cli__buttons {
        flex: 0 0 50px;
        padding-left: 10px;
        margin-top: 5px;
      }

      .cli__button {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        border-radius: 4px;
        width: 8px;
        height: 8px;
        background-color: #a8b5c8
      }

      .cli__body {
        background-color: #FFFFD8;
        padding-bottom: 20px;
        width: 100%;
      }

      .cli__lines {
        width: 100%;
        padding: 30px 40px 0;
        font-size: 14px;
        line-height: 20px;
        font-family: "Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace;
        letter-spacing: .1em;
        color: #333333;
        display: flex;
        flex-direction: column;
      }

      .cli__line {
        white-space: pre-wrap;
        width: 100%;
        flex: 0 0 100%;
      }

      .cli__line--result {
        color: #555;
      }

      .cli__line--break {
        height: 20px;
      }

    `}</style>
    </div>
);

export default CLI
