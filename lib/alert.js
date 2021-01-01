module.exports={
    template: function (contents, location) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="/views/src/styles/page.css" />
            <link rel="stylesheet" href="/views/src/styles/adminPages.css">
            <script src="/views/src/scripts/fetchJson.js"></script>
            </head>
            <body>
                <script>
                    alert("${contents}");
                    document.location.href="${location}";
                </script>
            </body>
            </html>
            `;
    }
}