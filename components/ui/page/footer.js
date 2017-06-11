const Footer =
    () => (
        <footer className='footer u-wrapper'>

            <div className='copyrights'>&copy; {new Date().getFullYear()} by Aerokube. All rights reserved.</div>

            <style jsx>{`
                .footer {
                    padding-top: 80px;
                    padding-bottom: 30px;
                    position: relative;
                    background-color: #454857
                }

                @media screen and (min-width: 560px) {
                    .footer {
                        padding-top: 120px;
                        padding-bottom: 60px;
                    }
                }

                @media screen and (min-width: 960px) {
                    .footer {
                        padding-top: 130px;
                    }
                }

                .copyrights {
                    text-align: center;
                    margin-top: 30px;
                    color: rgba(141, 146, 153, .5);
                }
            `}</style>


            <script type="text/javascript" async="" src="https://mc.yandex.ru/metrika/watch.js"></script>
            <script type="text/javascript" async="" src="static/js/ymetric.js"></script>
            <noscript>&lt;div&gt;&lt;img src="https://mc.yandex.ru/watch/43539754" style="position:absolute; left:-9999px;" alt="" /&gt;&lt;/div&gt;</noscript>
        </footer>
    );

export default Footer
