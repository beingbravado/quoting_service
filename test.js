const fs = require("fs");
// import fs from 'fs';
fs.readFile("catalogue.tsv", "utf8", (err, data) => {
  // var writedata = {
  //   // "0": [],
  //   1: [],
  //   2: [],
  //   3: [],
  // };
  var writedata = [];
  if (err) {
    console.error(err);
    return;
  }
  var lines = data.split("\n");
  console.log(lines[8]);
  for (var x = 1; x < lines.length; x++) {
    var service = {
      title: "",
      name: "",
      description: "",
      service_image_url: "",
      color_code: "#fff",
      is_active: true,
      service_type: "PROGRAM",
      isCompulsory: false,
      associated_branches: [],
      services_offered: [],
      associated_products: [],
      associated_tax_codes: [],
      serviceable_days: [],
      recurrence: {
        schedule: [],
      },
      schedule: [],
      services: [],
      price_calculation: {
        type: "SLABS",
        classifying_measurement: [
          {
            measurement: "BUILDINGFOOTPRINT_PERIMETER",
            multiplier: 1,
          },
        ],
        pricing_strategy: [],
      }
    };
    var prev = 0;
    for (var i = 4; i < 179; i++) {
      var words = lines[i].split("\t");
      console.log(words);
      var current = words[0];
      var json = {
        slab_start: 0,
        slab_end: 0,
        pricing: [
          {
            measurement: "ONE",
            multiplier: 0,
          },
        ],
      };
      for (var index of ["1"]) {
        var value = words[index];
        // console.log(value);
        if (value.length > 1) {
          json["slab_end"] = parseInt(current) / 100;
          json["slab_start"] = parseInt(prev) / 100;
          value = value.slice(1);
          value = value.replace(",", "");
          value = value.replace("\r", "");
          json["pricing"][0]["multiplier"] = parseInt(value);
          // console.log(writedata[index]);
          writedata[index].push(json);
          // console.log(writedata[index]);
        }
      }
      prev = current;
    }
  }
  writedata = JSON.stringify(writedata);
  fs.writeFile("output.json", writedata, { flag: "a+" }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
});
