function urlReplacer(data){
    let matchString = /<p><img[\s.]*.*['|"].*['|"].*<\/p>/gm;
    let matched = data.match(matchString) || [];
    let dataURL, ctx, img, canvas, end, url;
    let promises = [];
    if(matched.length > 0){
        matched.forEach(item =>{
            let index = data.indexOf(item);
            let start = data.indexOf('src='); //+4
            let i = start+5;
            while(!/('|")/.test(data[i])){
                end = i;
                i++;
            }
            url = data.slice(start+5, end+1).toString();
            data = data.replace('item', '');
            promises.push(
                new Promise((resolve, reject)=>{
                    img = new Image();
                    img.crossOrigin = "Anonymous";
                    img.src = url;
                    img.onload = function(){
                        canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
                        dataURL = canvas.toDataURL("image/png"),
                        //dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
                        resolve({url, uri: dataURL});
                    }
                    img.onerror = function(){
                        reject(url);
                    }
                })
            )
        })
    }
    if(promises.length > 0){
        return Promise.all(promises);
    }else{
        return new Promise((resolve, reject)=>{resolve("done")});
    }
}

export default urlReplacer;