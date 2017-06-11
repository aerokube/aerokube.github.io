import Head from "next/head";

export default ({children}) => (
    <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        {children}
    </Head>
)
