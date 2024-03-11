
function renderHTML() {

    /// <head>
    const head = document.head || document.getElementsByTagName("head")[0];
    /// 1
    const link1 = document.createElement('link');
    link1.rel = "stylesheet"
    link1.href = "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
    head.append(link1)
    /// 2
    const link2 = document.createElement('link');
    link2.rel = "preconnect"
    link2.href = "https://fonts.googleapis.com"
    head.append(link2)
    /// 3
    const link3 = document.createElement('link');
    link3.rel = "preconnect"
    link3.href = "https://fonts.gstatic.com"
    head.append(link3)
    /// 4
    const link4 = document.createElement('link');
    link4.rel = "stylesheet"
    link4.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
    head.append(link4)
    /// 5

    const link5 = document.createElement('link');
    link5.rel = "stylesheet"
    link5.href = "https://fonts.googleapis.com/icon?family=Material+Icons"
    head.append(link5)

}

export default renderHTML;
