chrome.printerProvider.onGetPrintersRequested.addListener(function (
    resultCallback
  ) {
    console.log("Get printers requested");
    getPrinters(resultCallback);
  });
  
  chrome.printerProvider.onGetCapabilityRequested.addListener(function (
    queueId,
    resultCallback
  ) {
     console.log("Getting capabilities for printer " + queueId)
    getPrinterCapabilities(queueId, resultCallback);
  });
  
  chrome.printerProvider.onPrintRequested.addListener(function (
    printJob,
    resultCallback) {
    console.log("Printing job" + JSON.stringify(printJob))
    try {
      requestPrint(printJob, resultCallback);
    } catch (err) {
      console.log("Error printing job " + err)
    }
  });


  function getPrinters(resultCallback){
      let printers = [{
          id: "1",
          name: "printer1"
      }, {
          id: "2",
          name: "printer 2"
      }]
      resultCallback(printers)
  }

  function getPrinterCapabilities(queueId, resultCallback){
    
    let printer = {
        version: "1.0",
        printer: {
            supported_content_type: [{
                content_type: "application/pdf",
                min_version: "1.5"
            }],
            collate: {
                default: true
            },
            copies: {
                default: 1,
                max: 100
            },
            page_orientation: {
                option: [{
                    type: "PORTRAIT"
                }, {
                    type: "LANDSCAPE"
                }, {
                    type: "AUTO",
                    is_default: true
                }]
            },
            color: {
                option: [{
                    type: "STANDARD_MONOCHROME"
                }, {
                    type: "STANDARD_COLOR",
                    is_default: true
                }]
            },
            media_size: {
                option: [{
                    name: "ISO_A4",
                    width_microns: 210000,
                    height_microns: 297000,
                    is_default: true,
                    vendor_id: "ISOA4"
                }, {
                    name: "NA_LEGAL",
                    width_microns: 215900,
                    height_microns: 355600,
                    vendor_id: "LEGAL"
                }, {
                    name: "NA_LETTER",
                    width_microns: 215900,
                    height_microns: 279400,
                    vendor_id: "LETTER"
                }, {
                    name: "ISO_A3",
                    width_microns: 297000,
                    height_microns: 420000,
                    vendor_id: "ISOA3"
                }]
            },
            duplex: {
                option: [{
                    type: "NO_DUPLEX",
                    is_default: true
                }, {
                    type: "LONG_EDGE"
                }, {
                    type: "SHORT_EDGE"
                }]
            }
        }
    }
    resultCallback(printer);
  }

  function requestPrint(printJob, resultCallback){
    var header = new Headers();
    header.append("x-ms-blob-type","BlockBlob" )
    fetch("", {
        method: "PUT",
        headers: header,
        body: printJob.document
      }).then(function(e){
          resultCallback("OK")
      })
  }