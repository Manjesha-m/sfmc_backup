Platform.Load('core', '1.1'); //Testing..
try {
    var apiUrl = 'https://qncnkul0n6.execute-api.eu-north-1.amazonaws.com/generate-pdf';

    var htmlstring = GetHtmlString(3);

    for (var i = 0; i < 500; i++) {
        PDFResponse(htmlstring);
    }

    function PDFResponse(htmlstring) {
        var payload = {
            htmlContent: htmlstring
        };

        var req = new Script.Util.HttpRequest(apiUrl);
        req.contentType = 'application/json';
        req.method = 'POST';
        req.postData = Stringify(payload);

        var response = req.send();
        var result = Stringify(response.content);
        return result;
    }

    function GetHtmlString(ID) {
        var ObjectDE = DataExtension.Init('MEP_HTML_Strings_For_PDF_Generation_DEV');
        var Objectfilter = { Property: 'ID', SimpleOperator: 'equals', Value: ID };
        var ObjectData = ObjectDE.Rows.Retrieve(Objectfilter);
        var objectdatarow = ObjectData[0];
        var HtmlString = objectdatarow['HtmlString'];

        return HtmlString;
    }
} catch (ex) {
    Write(Stringify(ex));
}
