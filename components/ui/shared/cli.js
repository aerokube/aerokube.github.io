const CLI = () => (
    <div className='cli'>
        <div className='cli__buttons'>
            <i className='cli__button'/>
            <i className='cli__button'/>
            <i className='cli__button'/>
        </div>
        <div className='cli__header'>Terminal</div>

        <div className="cli__body">
            <ul className='cli__lines'>
                <li className='cli__line'>$ ./cm selenoid start</li>
                <li className='cli__line cli__line--break'/>
                <li className='cli__line cli__line--result'>Downloading Selenoid...</li>
                <li className='cli__line cli__line--break'/>
                <li className='cli__line cli__line--result'>
                    Getting Selenoid release information for version: latest
                <li className='cli__line cli__line--result'>
                    <span className='cli__line-time'>23:47:27</span>&nbsp;
                    Downloading Selenoid release from https://github.com/aerokube/selenoid/releases/
                </li>
                </li>
                <li className='cli__line cli__line--result'>
                    7.19 MiB / 7.19 MiB [==========================] 100.00% 2s
                </li>
                <li className='cli__line cli__line--result'>
                    <span className='cli__line-time'>23:47:31</span>&nbsp;
                    Selenoid binary saved to ~/.aerokube/selenoid/selenoid
                </li>
                <li className='cli__line cli__line--result'>
                    <span className='cli__line-time'>23:47:31</span>&nbsp;
                    Configuring Selenoid...
                </li>
                <li className='cli__line cli__line--result'>
                    <span className='cli__line-time'>23:47:31</span>&nbsp;
                    Downloading browser data from: https://raw.githubusercontent.com/aerokube/cm/master/browsers.json
                </li>
                <li className='cli__line cli__line--result'>
                    <span className='cli__line-time'>23:47:31</span>&nbsp;
                    Processing Chrome...
                </li>
                <li className='cli__line cli__line--result'>
                    <span className='cli__line-time'>23:47:31</span>&nbsp;
                    Downloading driver from http://.../2.29/chromedriver_mac64.zip...
                </li>
                <li className='cli__line cli__line--result'>
                    4.63 MiB / 4.63 MiB [==========================] 100.00% 0s
                </li>
                <li className='cli__line cli__line--result'>
                    <span className='cli__line-time'>23:47:36</span>&nbsp;
                    Starting Selenoid...
                </li>
              <li className='cli__line cli__line--result'>
                    <span className='cli__line-time'>23:47:36</span>&nbsp;
                  Successfully started Selenoid
                </li>
                {/* TODO: Add animation */}
            </ul>
        </div>

        <style jsx>{`
      .cli {
        text-align: left;
        border-radius: 6px;
        box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.35);
        width: 100%;
        position: relative;
        overflow: hidden;
      }

      .cli__body {
        background-color: #0b0f15;
        min-height: 398px;
        padding-bottom: 20px;
      }

      .cli__buttons {
        position: absolute;
        top: 12px;
        left: 12px;
      }

      .cli__button {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        border-radius: 4px;
        width: 8px;
        height: 8px;
        background-color: #3e434a
      }

      .cli__header {
        text-align: center;
        padding: 10px 0;
        font-size: 12px;
        color: #8d98a8;
        font-weight: 500;
        background-color: #4A5877;
      }

      .cli__lines {
        list-style: none;
        padding: 30px 40px 0;
        font-size: 14px;
        line-height: 20px;
        font-family: "Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace;
        /*font-weight: 600;*/
        letter-spacing: .1em;
        color: #b3bece;
      }

      .cli__line-scope {
        color: #b4e6fd;
      }

      .cli__line-time {
        color: #dad9d7;
      }

      .cli__line-diff {
        color: #757065;
      }

      .cli__line--result {
        color: #8b8b8d;
      }

      .cli__line--break {
        height: 20px;
      }

      .cli__line--indent {
        margin-left: 12px;
      }
    `}</style>
    </div>
);

export default CLI
