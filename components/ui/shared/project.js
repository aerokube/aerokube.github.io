//language=CSS
const Project = ({title, description, org, name, release, documentation = `http://aerokube.com/${name}`}) => (
    <div className="project">
        <a className="project__image" href={`https://github.com/${org}/${name}`}>
            <img src="static/img/github.svg"/>
        </a>

        <a className="project__title" href={`https://github.com/${org}/${name}`}>{title}</a>
        <div className="project__description">{description}</div>
        <div className="project__bottom">
            <div className="column">
                <div className="column__title">
                    Documentation
                </div>

                <a className="link" href={`${documentation}/${release}`}>{release} <sup className="badge">stable</sup></a>
                <a className="link" href={`${documentation}/latest`}>latest</a>
            </div>
           <div className="column">
                <div className="column__title">
                    Release Notes
                </div>
               <a className="link" href={`https://github.com/${org}/${name}/releases/tag/${release}`}>{release} <sup className="badge">stable</sup></a>
            </div>
        </div>

        <style jsx>{`
            .project {
                background-color: #fff;
                width: 270px;
                box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.33);
                display: flex;
                flex-direction: column;
                margin: 10px;
                border-radius: 3px;
            }

            .project__image {
                align-self: center;
                height: 180px;
                padding: 20px 0 20px 0;
            }

            .project__image > img {
                height: 100%;
            }

            .project__title {
                margin-top: 5px;
                height: 24px;
                font-size: 18px;
                text-align: center;
                color: #000;
                display: block;
                text-decoration: none;
            }

            .project__description {
                height: 60px;
                opacity: 0.5;
                font-size: 14px;
                text-align: center;
                border-bottom: 1px solid #e0e4e7;
                color: #000000;
                margin-top: 5px;
                margin-right: 20px;
                margin-left: 20px;
            }

            .project__bottom {
                display: flex;
                margin-top: 5px;
                height: 70px;
                align-items: flex-start;
                justify-content: space-between;
                padding-left: 20px;
                padding-right: 20px;
            }

            .column {
                display: flex;
                flex-direction: column;
            }

            .column__title {
                text-transform: uppercase;
                color: #666;
                font-size: 0.6em;
                justify-content: flex-start;
            }

            .link {
                display: block;
                align-self: center;
                margin-top: 3px;
                margin-bottom: 3px;
                text-transform: uppercase;
                text-decoration: none;
                color: #444;
            }

            .badge {
                display: inline;
                background-color: cornflowerblue;
                border-radius: 4px;
                padding-left: 3px;
                padding-right: 3px;
                margin-bottom: 3px;
                font-size: 0.5em;
                text-transform: none;
                color: #fff;
            }
        `}</style>
    </div>
);

export default Project;