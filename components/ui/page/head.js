import Head from "next/head";

export default ({children}) => (
    <Head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="apple-touch-icon" href="/static/img/logo.png"/>
        <link rel="shortcut icon" sizes="16x16 24x24 32x32 48x48 64x64" href="/favicon.ico"/>
        <link rel="canonical" href="http://aerokube.com/"/>
        <meta name="author" content="Aerokube"/>
        <meta name="description" content="Software testing infrastructure: scalable Selenium clusters and automatic test runtimes. Software testing automation consulting."/>
        <meta name="keywords" content="aerokube, selenium, docker, testing, software, infrastructure"/>
        <meta property="og:title" content="Aerokube • Software testing infrastructure"/>
        <meta property="og:url" content="http://aerokube.com/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="http://aerokube.com/static/img/logo.png"/>
        <meta property="og:description" content="Software testing infrastructure: scalable Selenium clusters and automatic test runtimes. Software testing automation consulting."/>
        <meta property="og:site_name" content="Aerokube • Software testing infrastructure"/>
        {children}
    </Head>
)
