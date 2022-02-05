const fs = require('fs')
// import fs from 'fs';
var writedata = {
  // "0": [],
  "1": [],
  "2": [],
  "3": [],
};
fs.readFile('input.tsv', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  var lines = data.split("\n");
  var prev = 0;
  for (var i = 4; i < 179; i++) {
    var words = lines[i].split("\t");
    console.log(words);
    var current = words[0];
    for (var index of ["1", "2", "3"]) {
      var value = words[index];
      // console.log(value);
      if (value.length > 1) {
        var json = {
          "slab_start": 0,
          "slab_end": 0,
          "pricing": [
            {
              "measurement": "ONE",
              "multiplier": 0
            }
          ]
        };
        json["slab_end"] = parseInt(current) / 100;
        json["slab_start"] = parseInt(prev) / 100;
        value = value.slice(1);
        value = value.replace(',', '');
        value = value.replace('\r', '');
        json["pricing"][0]["multiplier"] = parseInt(value);
        // console.log(writedata[index]);
        writedata[index].push(json);
        // console.log(writedata[index]);
      }
    }
    prev = current;
  }
  writedata = JSON.stringify(writedata);
  fs.writeFile('output.json', writedata, { flag: 'a+' }, err => {
    if (err) {
      console.error(err)
      return
    }
  })
})
