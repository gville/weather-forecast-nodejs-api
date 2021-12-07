#mongoimport --uri mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_NAME>/<DATABASE> --collection <COLLECTION> --type json --file <FILENAME>

mongoimport --uri mongodb://localhost/mydatabase --collection forecasts --jsonArray --file weather_data.json

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