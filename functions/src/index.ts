import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://meshitsukuba.firebaseio.com"
});

const db = admin.database()

function buildShopOgp(shopname: string,shopid: string) {
  return `<!DOCTYPE html>
  <head>
  <title>${shopname}のレビュー | めしくつば</title>
  <meta property="og:title" content="${shopname}のレビュー | めしつくば">
  <meta property="og:image" content="https://meshitsukuba.web.app/img/icon.png">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${shopname}のレビュー | めしつくば">
  <meta name="twitter:image" content="https://meshitsukuba.web.app/img/icon.png">
  <link rel="canonical" href="/review/${shopid}">
  </head><body>
  <script>window.location="/review/${shopid}";</script>
  </body></html>`
}

function buildSingleOgp(shopname: string,shopid: string,reviewid: string,username: string) {
  return `<!DOCTYPE html>
  <head>
  <title>${username}さんによる${shopname}のレビュー | めしくつば</title>
  <meta property="og:title" content="${username}さんによる${shopname}のレビュー | めしつくば">
  <meta property="og:image" content="https://meshitsukuba.web.app/img/icon.png">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${username}さんによる${shopname}のレビュー | めしつくば">
  <meta name="twitter:image" content="https://meshitsukuba.web.app/img/icon.png">
  <link rel="canonical" href="/review/${shopid}/${reviewid}">
  </head><body>
  <script>window.location="/review/${shopid}/${reviewid}";</script>
  </body></html>`
}


export const shop = functions.https.onRequest((req, res) => {
  res.charset = 'utf8'
  const path = req.path.split('/ogp')[1];
  console.log('shop path',path.split('/'))
  const shopid = path.split('/')[1];
  db.ref(`shop/${shopid}`).once('value',(snapshot) => {
    const received = snapshot.val()
    const shopname = received.name as string; 
    res.status(200).end(buildShopOgp(shopname,shopid))
    return;
  }).catch((e) => console.log(e))
})

export const single = functions.https.onRequest((req, res) => {
  res.charset = 'utf8'
  const path = req.path.split('/ogp')[1];
  const shopid = path.split('/')[1];
  const reviewid = path.split('/')[2];
  db.ref(`review/${reviewid}`).once('value',(snapshot) => {
    const received = snapshot.val();
    const username = received.username as string;
    db.ref(`shop/${shopid}`).once('value',(snap) => {
      const rec = snap.val()
      const shopname = rec.name as string; 
      res.status(200).end(buildSingleOgp(shopname,shopid,reviewid,username));
      return;
    }).catch((e) => console.log(e))
    return;
  }).catch((e) => console.log(e))
  console.log(shopid,reviewid)
})