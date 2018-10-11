function generate(data, filename = 'test') {
  let newIframe = document.createElement("iframe");
  newIframe.setAttribute("id", "rendered")
  document.body.appendChild(newIframe);
  let spinner = document.createElement("div");
  spinner.setAttribute("class", "fa fa-spinner fa-spin pdfload");
  document.body.appendChild(spinner);
  let cover = document.createElement("div");
  cover.setAttribute("class", "cover");
  document.body.appendChild(cover);
  setTimeout(() => {
    let internals = newIframe.contentDocument || newIframe.contentWindow.document;
    internals.body.innerHTML = data;
    html2canvas(internals.body, {
      scale: 2
    }).then((canvas) => {
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 258);
      pdf.save(filename);
      document.body.removeChild(newIframe);
      document.body.removeChild(cover);
      document.body.removeChild(spinner);
    });
  }, 10)

  //document.body.removeChild(newIframe);
}

export default generate;

/*
var iframe = document.createElement('iframe');
  iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  document.body.appendChild(iframe);
  
  iframe.src = pdf.output('datauristring');



  .then(canvas => {
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
			pdf.save(filename);
		});
*/