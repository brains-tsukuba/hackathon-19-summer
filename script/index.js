const axios = require('axios')
const fs = require("fs")

const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function generateSerial(len){
  let serial = ''
  for (let i = 0; i < len; i++) {
    const idx = Math.floor(Math.random() * chars.length)
    serial += chars.substring(idx, idx + 1)
  }
  return serial
}

let output = [];
for(let i = 1; i <= 54;i++) {
  axios.get(`https://tsukumeshi.herokuapp.com/result?keyword=&page=${i}&utf8=%E2%9C%93`)
  .then((res) => {
    const regrep = /\[\{"id"([\s\S]*?)]/g;
    const re = new RegExp(regrep)
    output = output.concat(JSON.parse(res.data.match(re)[0]))
    if(i == 54) {
      const out = output.reduce((acc,cur) => {
        acc[generateSerial(20)] = {
            name: cur.name,
            latitude: cur.latitude,
            longitude: cur.longitude
        }
        return acc
      },{});
      
      const data = new Uint8Array(Buffer.from(JSON.stringify(out)));
      fs.writeFile('message.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }
  })
  .catch((err) => console.log(err))
}
