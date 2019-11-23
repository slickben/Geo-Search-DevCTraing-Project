// get photo from session storage 
let photo = JSON.parse(sessionStorage.getItem('photo'));

//show single image of noteable land mark
function showSingleNoteableLandMarkPicFunc() {
    if(photo){
        let imgUrl = photo[0];
        let imgnumber = photo.length;
        UI.showSingleImageOfNoteableLandMark(imgUrl, imgnumber); //eslint-disable-line
    }
    return;
    
}

let count = 1;
function  nextImgFunc() {
    count ++;
    let imgUrl = photo[count];
    UI.showPreviewImg(imgUrl);//eslint-disable-line
    if(count == photo.length){
        count = 0;
    }
    
}

function previousImgFunc() {
    
   if(count > 0) {
    count --;
    let imgUrl = photo[count];
    UI.showPreviewImg(imgUrl);//eslint-disable-line
   }
}

function preveiwImgFunc() {
    let imgUrl = photo[0];
    UI.showPreviewImg(imgUrl); //eslint-disable-line
} 

function  clearImgFunc() {
    UI.clearPreviewImg();//eslint-disable-line
}


showSingleNoteableLandMarkPicFunc();
noteableLMImgElem.addEventListener('click', preveiwImgFunc);//eslint-disable-line
nextImgBtn.addEventListener('click', nextImgFunc);//eslint-disable-line
previousImgBtn.addEventListener('click', previousImgFunc);//eslint-disable-line
clearImgBtn.addEventListener('click', clearImgFunc);//eslint-disable-line


