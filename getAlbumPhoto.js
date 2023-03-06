
var albumIds = [];

var pageToken = null;
const pageSize = 30;
let albums = [];
// remoteURL point to amazon AWS lamda function

const remoteURL = 'https://e2b994bth5.execute-api.eu-north-1.amazonaws.com/prod/';

/*
read named album from Amazon lambda endpoint remoteURL
instantiate class getShowImages (the real workhorse) 
*/
  async function readAlbumPhoto(){
    var value = null;
    var a= [];
    for (var i = 0; i < places.length; i++) {
    
      const URL = remoteURL + 'photos/?albumName='+ places[i].posit;
      //console.log(URL);
      try {
        let fetchResult = await fetch(URL)
        receivedUrls = await fetchResult.json();
        if (!fetchResult.ok) throw (receivedUrls);
        photoIndex = 0;
        a[i] = new getShowImages(receivedUrls, places[i]);
        await a[i].showPic();
      }
      catch (error) {
        console.log(  "Something went wrong " + error );
      } 
    }
  }
    
