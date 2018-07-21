export default
({theme = 'white', children, style = {}}) => (
    <section className={`section section-${theme}`} style={style}>
        {children}
        <style jsx>{`
                .section {
                    padding: 90px 30px 30px 30px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .section-blue {
                    color: #fff;
                    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#1e5799+0,7db9e8+100 */
                    background: #1e5799; /* Old browsers */
                    background: -moz-linear-gradient(-45deg,  #1e5799 0%, #7db9e8 100%); /* FF3.6-15 */
                    background: -webkit-linear-gradient(-45deg,  #1e5799 0%,#7db9e8 100%); /* Chrome10-25,Safari5.1-6 */
                    background: linear-gradient(135deg,  #1e5799 0%,#7db9e8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
                }


                .section-gray {
                    color: #fff;
                    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#4a5877+0,617091+100 */
                    background: #4a5877; /* Old browsers */
                    background: -moz-linear-gradient(45deg,  #4a5877 0%, #617091 100%); /* FF3.6-15 */
                    background: -webkit-linear-gradient(45deg,  #4a5877 0%,#617091 100%); /* Chrome10-25,Safari5.1-6 */
                    background: linear-gradient(45deg,  #4a5877 0%,#617091 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4a5877', endColorstr='#617091',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
                }

                .section-purple {
                    color: #fff;
                    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#7e52ef+0,6a52ee+100 */
                    background: #7e52ef; /* Old browsers */
                    background: -moz-linear-gradient(45deg,  #7e52ef 0%, #6a52ee 100%); /* FF3.6-15 */
                    background: -webkit-linear-gradient(45deg,  #7e52ef 0%,#6a52ee 100%); /* Chrome10-25,Safari5.1-6 */
                    background: linear-gradient(45deg,  #7e52ef 0%,#6a52ee 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7e52ef', endColorstr='#6a52ee',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
                }

                .section-yellow {
                    color: #fff;
                    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffb85a+0,ffe791+100 */
                    background: #ffb85a; /* Old browsers */
                    background: -moz-linear-gradient(-45deg,  #ffb85a 0%, #ffe791 100%); /* FF3.6-15 */
                    background: -webkit-linear-gradient(-45deg,  #ffb85a 0%,#ffe791 100%); /* Chrome10-25,Safari5.1-6 */
                    background: linear-gradient(135deg,  #ffb85a 0%,#ffe791 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffb85a', endColorstr='#ffe791',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
                }
            `}</style>
    </section>
)