
function generate(data, filename='test'){
		html2canvas(document.querySelector(".md-viewer").contentWindow.document.body, {
            scale: 5, allowTaint: true, logging: true}).then(canvas => {
              let pdf = new jsPDF('p', 'mm', 'a4');
              pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
              pdf.save(filename);
            });
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