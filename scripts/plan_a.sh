#!/usr/bin/bash

mongoimport --uri mongodb://localhost/mydatabase --collection forecasts --jsonArray --file weather_data.json

mongo mongodb://localhost/mydatabase <<EOF
db.getCollection('forecasts').find({}).forEach( function(item){
        if (typeof(item.from) == "string"){
            print(item.from);
            item.from = new Date(item.from);
            db.getCollection('forecasts').save(item);
        }
        if (typeof(item.to) == "string"){
            print(item.to);
            item.to = new Date(item.to);
            db.getCollection('forecasts').save(item);
        }
    }
);
EOF