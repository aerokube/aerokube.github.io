//language=CSS
const Project = ({title, description, org, name, stars, release, documentation}) => (
    <div className="project">

        <div className="project__banner">
            <a className="project__image" href={`https://github.com/${org}/${name}`}>
                <img src="static/img/github.svg"/>
            </a>
            <a className="project__stars" href={`https://github.com/${org}/${name}/stargazers`}><i className="fa fa-star" aria-hidden="true"></i> {stars}</a>
        </div>


        <a className="project__title" href={`https://github.com/${org}/${name}`}>{title} </a>

        <div className="project__description">{description}</div>
        <div className="project__bottom">
            <div className="column">
                <a className="release" href={`https://github.com/${org}/${name}/releases`}>{release.name} <sup className="badge">Stable</sup></a>
            </div>
           <div className="column">
               <a className="link" href={release.url}>Release Notes</a>
               <a className="link" href={documentation}>Documentation</a>
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
                flex: 0 0 270px;
            }

            .project__banner {
                align-self: center;
                margin-top: 20px;
                flex: 1;
                text-align: right;
            }

            .project__stars {
                margin-top: 5px;
                font-size: 14px;
                text-align: right;
                color: #444;
                text-decoration: none;
            }

            .project__image {
                align-self: center;
                display: block;
            }

            .project__image > img {
                height: 180px;
            }

            .project__title {
                margin-top: 5px;
                height: 24px;
                font-size: 18px;
                text-align: center;
                color: #000;
                display: block;
                text-decoration: none;
                flex: 1;
            }

            .project__description {
                opacity: 0.5;
                font-size: 14px;
                text-align: center;
                border-bottom: 1px solid #e0e4e7;
                color: #000000;
                margin: 5px 20px 0;
                padding-bottom: 10px;
                flex-basis: 60px;
            }

            .project__bottom {
                display: flex;
                margin-top: 10px;
                align-items: flex-start;
                justify-content: space-between;
                padding-left: 20px;
                padding-right: 20px;
                flex: 1 1 50px;
            }

            .column {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
            }

            .release {
                align-self: center;
                margin-top: 3px;
                margin-bottom: 3px;
                color: #444;
                font-size: 2em;
                text-decoration: none;
                display: block;
            }

            .link {
                display: block;
                margin-top: 3px;
                margin-bottom: 3px;
                text-decoration: none;
                color: #444;
                font-size: 0.9em;
                align-self: flex-start;
            }

            .link:hover {
                color: cornflowerblue;
            }

            .badge {
                background-color: cornflowerblue;
                border-radius: 4px;
                padding-left: 3px;
                padding-right: 3px;
                font-size: 0.4em;
                text-transform: none;
                color: #fff;
            }
        `}</style>
    </div>
);

export default Project;