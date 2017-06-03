const Footer =
    () => (
        <footer className='footer u-wrapper'>

            <div className='copyrights'>&copy; {new Date().getFullYear()} by Aerokube. All rights reserved.</div>

            <style jsx>{`
                .footer {
                    max-width: 880px;
                    margin-top: 80px;
                    padding-bottom: 30px;
                    position: relative;
                }

                @media screen and (min-width: 560px) {
                    .footer {
                        margin-top: 120px;
                        padding-bottom: 60px;
                    }
                }

                @media screen and (min-width: 960px) {
                    .footer {
                        margin-top: 130px;
                    }
                }

                .copyrights {
                    text-align: center;
                    margin-top: 30px;
                    color: rgba(141, 146, 153, .5);
                }
            `}</style>
        </footer>
    );

export default Footer
