var http = require('http');
var fs = require('fs');

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("datenbank.db");

var array_unsplit;
var array_first_value = [];     //pin
var array_second_value = [];    //port
var array_third_value = [];     //name

var port = [];
var name = [];
var pin = [];

var server = [];

var laufvar;

var b = [];

var bool = [];

var laufvariable = 0;
var array_pin = [];



db.serialize(function() {
    db.run("CREATE TABLE if not exists protokoll (ID INTEGER PRIMARY KEY,NAME TEXT,PIN INTEGER,PORT INTEGER,STATUS INTEGER,ZEITPUNKT INTEGER)");
    db.run("CREATE TABLE if not exists zustand (PIN INTEGER, PORT INTEGER, STATUS INTEGER)");
});






fs.readFile('config.txt', 'utf8', function (err,data) {
    if(err){
        return console.log(err);
    }
       
        array_unsplit = data.split(";");

        for(array of array_unsplit){                    //er geht array_unsplit durch und nimmt die inhalte als neues array an
                array_split = array.split(',');
                console.log(array_split);
                array_first_value.push(array_split[0]);     
                array_second_value.push(array_split[1]);  
                array_third_value.push(array_split[2]);   
        }


        //---------------------------------------------------------------------------------------



        function f(request, response){
            port_unsplit = response['connection']['server']['_connectionKey'];
            port_split = port_unsplit.split(':');
            
            port = port_split[port_split.length-1];
            var a = array_second_value.indexOf(port);
            
            pin = array_first_value[a];
            name = array_third_value[a];
            port = port;


            var zustand = b[pin];

            console.log("_______________")
            console.log("Port: " + port);
            console.log("Pin: " + pin);
            console.log("Name: " + name);
            console.log("Zeitpunkt: " + Date.now());    //Date.now = UTC timestamp in millisekunden
            fs.writeFile("/Users/Philip/Documents/Schule/5.\ Klasse/PPM/HALLOOOOO");


            if(zustand == true){
                zustand = false;
            }else{
                zustand = true;
            }
            b[pin] = zustand;



            db.serialize(function(){
                
                var stmt = db.prepare("INSERT INTO protokoll(NAME,PIN,PORT,STATUS,ZEITPUNKT) VALUES (?,?,?,?,?)"); 
                stmt.run(name,pin,port,zustand,Date.now());      //id,name,pin,port,zustand,uts
                                                            //PIN INTEGER PRIMARY KEY, PORT INTEGER, STATUS INTEGER
                stmt.finalize();



                stmt = db.prepare("INSERT INTO zustand(PIN, PORT, STATUS) VALUES (?,?,?)");
                    stmt.run(pin,port,zustand);
                    stmt.finalize();                
            });
        }


       function cServer(port){
            http.createServer(f).listen(port);
       }


        for(var i=0; i<array_first_value.length; i++){
            pin[i] = array_first_value[i];
            port[i] = array_second_value[i];
            name[i] = array_third_value[i];

            cServer(port[i]);

        }
});




