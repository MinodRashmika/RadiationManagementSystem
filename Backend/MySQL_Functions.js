import fs from 'fs'
import XLSX from 'xlsx';
import bcrypt from 'bcrypt';

//Wrapper function for MySQL.query(sql,function(err,result,fields){})
function MySQL_query(MySQL,sql,callback){
    MySQL.query(sql, function (err, result, fields) {
        if (err) {
            callback({"status":"404",err}); // Pass error to the callback
        } else {
            callback(result);  // Attaches a "success" status for error checking
        }
    })
}

//================Executes multiple queries from one variable
function querySequence(MySQL,sql,seperator,callback)            // If there are multiple queries from one variable 
{                                                               // (e.g "DROP DATABASE IF EXISTS `group26 capstone2`;CREATE DATABASE `group26 capstone2`;"),
    
                                                                // this function will split the query and executes them individually. This is because MySQL.query module does not allow mutiple queries in the same line
    sql = sql.replace(/\r/g,"");                    //https://www.textfixer.com/tutorials/javascript-line-breaks.php#:~:text=Javascript%20Code%20for%20Line%20Break%20Removal&text=someText%20%3D%20someText.,n%7C%5Cn%7C%5Cr.
    
    sql = sql.split(seperator)
    

    var sqlLength = sql.length
    for(var i = 0;i < sqlLength-1; i++){
            var query = sql[i].replace(/\n/g,"") + seperator
            console.log(query)
            MySQL_query(MySQL,query,callback)               
            
    }
}

async function getColumns(MySQL,TableName)
{
    var SQLcolumns = "DESCRIBE "+ TableName;
    const TableColumnNames = await new Promise((resolve, reject) => {
        MySQL_query(MySQL, SQLcolumns, function (result) {
            var columnLength = result.length
            const names = [];
            for (var h = 0; h < columnLength; h++) {
                var sqlcols = "`"+result[h]["Field"]+"`"
                names.push(sqlcols)
            }
            resolve(names)
        })
    })
    return TableColumnNames
}
//=================Sets up database========================
function DatabaseSetup(MySQL,databaseName,callback){

    var path = "./SQL/Nodejs load ready SQL files/"
    try {                          
        var pathTable = path + "TableStructure"                                 
        const Tables = fs.readFileSync(pathTable, 'utf8');                      //https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs

        var pathRX_CRUD = path + "RX_CRUD"  
        const RX_CRUD = fs.readFileSync(pathRX_CRUD, 'utf8');

        var pathRSS_CRUD = path + "RSS_CRUD"  
        const RSS_CRUD = fs.readFileSync(pathRSS_CRUD, 'utf8');

        var pathRS_CRUD = path + "RS_CRUD"  
        const RS_CRUD = fs.readFileSync(pathRS_CRUD, 'utf8');

        var pathLX_CRUD = path + "LX_CRUD"  
        const LX_CRUD = fs.readFileSync(pathLX_CRUD, 'utf8');

        var pathLS_CRUD = path + "LS_CRUD"  
        const LS_CRUD = fs.readFileSync(pathLS_CRUD, 'utf8');

        var pathEDITAnyColumns = path + "EDITAnyColumns"  
        const EDITAnyColumns = fs.readFileSync(pathEDITAnyColumns, 'utf8');
 
        var sql
        sql = "DROP DATABASE IF EXISTS \`"+databaseName+"\`;CREATE DATABASE \`"+databaseName+"\`; "
        querySequence(MySQL,sql,";",function(result){})
        
        MySQL_query(MySQL,"USE \`"+databaseName+"\`",function(result){})
        querySequence(MySQL,Tables,";",function(result){})


        querySequence(MySQL,RX_CRUD,"END\n",callback)
        querySequence(MySQL,RSS_CRUD,"END\n",callback)
        querySequence(MySQL,RS_CRUD,"END\n",callback)
        querySequence(MySQL,LX_CRUD,"END\n",callback)
        querySequence(MySQL,LS_CRUD,"END\n",callback)
        querySequence(MySQL,EDITAnyColumns,"END\n",callback)
        
    } catch (err) {
    console.error(err);
    }

}

//=======================Loads CSV files=====================
async function loadCSV(MySQL,CSVPath,TableName,callback){
    var path = CSVPath.replace("C:", '').replace(/["']/g, ''); // Removes "C:" and double quotation marks
    var pathList,fileName,fileFormat,outputFile
    //Convert to csv code
    if (path.indexOf('\\') > -1)
        {
          console.log("Backslash\n\n")
          pathList = path.split("\\")
          fileName = pathList[pathList.length-1]
          
        }
    else if (path.indexOf('/') > -1)
        {
          console.log("forward slash\n\n")
          pathList = path.split("/")
          fileName = pathList[pathList.length-1]
        }
    else
    {
        return 1
    }

    fileName = fileName.split(".")
    fileFormat = fileName[1]
    if (fileFormat == "xlsx")
        {
            outputFile = pathList.slice(1,pathList.length-1)
            outputFile = "/" + outputFile.join("/") + "/" + fileName[0] + ".csv"

            const workBook = XLSX.readFile(path);                       //https://stackoverflow.com/questions/34342425/convert-xls-to-csv-on-the-server-in-node
            XLSX.writeFile(workBook, outputFile, { bookType: "csv" });
            path = outputFile
        }


    // End of Convert to csv code
    try
    {
        var fileCSV = fs.readFileSync(path, 'utf8');
    
        fileCSV = fileCSV.split("\n") 
        var sql
        for(var i=1; i< fileCSV.length -1; i++)
        {
            sql = "INSERT INTO "+TableName+ " ("
            var SQLcolumns = "DESCRIBE "+ TableName;
            const TableColumnNames = await new Promise((resolve, reject) => {
                MySQL_query(MySQL, SQLcolumns, function (result) {
                    var columnLength = result.length
                    const names = [];
                    for (var h = 1; h < columnLength; h++) {
                        var sqlcols = "`"+result[h]["Field"]+"`"
                        names.push(sqlcols)
                    }
                    resolve(names)
                })
            })
            sql = sql +TableColumnNames.toString() +")"+" VALUES (\""
            var values = fileCSV[i].split(/,(?=(?:[^"]|"[^"]*")*$)/)                // Reference for splitting by comma but not splitting commas inside double quotation marks https://stackoverflow.com/questions/11456850/split-a-string-by-commas-but-ignore-commas-within-double-quotes-using-javascript
            
            if (fileCSV[i] == ",".repeat(fileCSV[i].length))                        // This if statement will skip over empty rows in the table by checking if theres a constant number of commas like ",,,,," without anything in between like e.g Name,,phone,,,
                {
                    continue
                }
            for(var j= 0; j< TableColumnNames.length-1;j++)             // Uses tablecolumnnames.length instead of values.length to restrict the number of columns (e.g when tables have empty columns)
            {   
                //console.log(values[j])
                sql = sql+ values[j].replace(/"/g,"") + "\",\""
            }
            
            var lastkey = TableColumnNames.length-1
            sql = sql + values[lastkey].replace("\r",'').replace(/"/g,"") + "\");"
            console.log(sql)
            MySQL_query(MySQL,sql,callback)
        }
        if (fileFormat == "xlsx")
            {
                fs.unlink(outputFile, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return;
                    }
                    console.log('File deleted successfully');
                });
            }
    } catch{
        console.log("ERROR Opening file")
    }

}
//=================================================== READ FUNCTIONS (Display Table contents, sorted table, search function (To be added))=================================================


//This function displays all the column inside a table as a json. 
function getTable(MySQL,TableName,callback){               //USE "Callback function because mysql is an Asynchronous Function"
    var sql = "SELECT * FROM "+"`"+TableName+"`";
    MySQL_query(MySQL,sql,callback)     
}

//===============================================
// //Example of using the function in code
// //get_Table("RX",function(result){
// //    console.log(result)                   //This will print result retrieved from mysql "RX" table

// //});


//================== SORT commands FOR RX Table WIP====================
function SortBy(MySQL,TableName,ColumnName,callback){

    function ColumnNameFormat(sentence) {
        function Capitalizeword(sentence) {
            return sentence.replace(/\b\w/g, match => match.toUpperCase());
        }
        return Capitalizeword(sentence).replace(/\s/g, '');
    }

    var ColumnName = ColumnNameFormat(ColumnName);
    var TableName = TableName.toUpperCase()


    var sql = "CALL SortBy"+ColumnName+"_"+TableName;
    MySQL_query(MySQL,sql,function(result){
        callback(result)
    })

  
}

async function searchTable(MySQL,TableName,Data,callback) // Creates an SQL "SELECT * FROM WHERE ColumnName = Data" statement 
{
    try{
        var sql = "SELECT * FROM "+TableName+" WHERE ";

        var TableColumnNames = await getColumns(MySQL,TableName)
        console.log(TableColumnNames)
        var columnLength = TableColumnNames.length
        var SearchFieldcount = 0  // Keeps track of Number of search fields 
        for(var i = 0 ; i < Data.length ; i++)  
        {
            if (Data[i] != "")
            {
                if(SearchFieldcount > 0)
                {
                    sql = sql + " AND "
                }
                sql = sql + TableColumnNames[i] + " = " + "'"+Data[i] + "'"
                SearchFieldcount++;
            }     
        }
        sql = sql + ";"
        console.log(sql)
        MySQL_query(MySQL,sql,callback)

    }catch (error){
        callback(null, error);

    }


}

//===================================================CUD FUNCTIONS (CREATE, UPDATE AND DELETE)=================================================

//================ ADD data to table function ======================
function addToTable(MySQL,TableName,Data,callback)
{   
    TableName = TableName.toUpperCase() // Change Tablename to upper case

    const dataLength = Object.keys(Data).length // number of columns
    var sql = "CALL Add"+TableName+"Entry(\""+Data[0]+"\"";

    for (var i = 1; i <dataLength; i++){  // attach data from each column into the add procedure's fields
        sql = sql+",\""+Data[i]+"\""
    }
    sql = sql + ");"; // attach closing brackets and semi column to the sql statement 
    console.log(sql)
    MySQL_query(MySQL,sql,callback)

}

function deleteFromTable(MySQL,TableName,ID,callback)
{
    TableName = TableName.toUpperCase()
    const ParamLength = Object.keys(ID).length
    var sql = "CALL MoveTo"+TableName+"Archive(\'"+ID+"\'";

    sql = sql + ");";
    console.log(sql);
    MySQL_query(MySQL,sql,callback)
}

function restorefromTable(MySQL,TableName,ID,callback)
{
    TableName = TableName.toUpperCase()
    const ParamLength = Object.keys(ID).length
    var sql = "CALL MoveFrom"+TableName+"Archive(\'"+ID+"\'";

    sql = sql + ");";
    console.log(sql);
    MySQL_query(MySQL,sql,callback)
}

function editRowTable(MySQL,TableName,ID,NewData,callback)
{
    TableName = TableName.toUpperCase()
    var sql = "CALL Edit"+TableName+"Entry("+ID
    for (var i=0 ; i < NewData.length; i++)
    {
        
        if (NewData[i] != "")
        {   
            
            sql = sql + ", \"" + NewData[i]+"\""
        }
        else if (NewData[i] == "")
        {
            sql = sql + ", NULL"
        }
    }
    sql = sql + ");";
    console.log(sql)
    MySQL_query(MySQL,sql,callback)
}
    // CODE VERSION of ADD, UPDATE, DELETE

async function addData(MySQL,TableName,Data,callback){
    var sql = "INSERT INTO "+ TableName+ " ("
    var TableColumns = await getColumns(MySQL,TableName)
    TableColumns = TableColumns.slice(1,TableColumns.length)
    for (var i=0; i < TableColumns.length;i++)
        {
            console.log(TableColumns[i].toLowerCase())
           if(TableColumns[i].toLowerCase() == `\`password\``)
            {
                Data[i] = await bcrypt.hash(Data[i], 10)
            }
        }

    const quotedData = Data.map(value => `"${value}"`);     // adds quote around data
    sql = sql + TableColumns.join(",") + ") VALUES (" + quotedData.join(",") + ");"
    console.log(sql)
    MySQL_query(MySQL,sql,callback)
}

async function updateData(MySQL,TableName,Data,NewData,callback){              //The Data field is the "id"
    
    var TableColumns = await getColumns(MySQL,TableName)
    TableColumns = TableColumns.slice(1,TableColumns.length)
    var UpdateColumns = []

    for(var i = 0; i < TableColumns.length; i++)
        {
            if(NewData[i] != "")
                {
                    UpdateColumns.push(TableColumns[i] + "= \"" +NewData[i] + "\"")
                }
        }
    var sql = "UPDATE "+TableName+" SET " + UpdateColumns.join(",") + " WHERE id = " + Data + ";"
    console.log(sql)
    MySQL_query(MySQL,sql,callback)
}
    //This acts as an archive
async function deleteData(MySQL,Data,SourceTable,DestinationTable,callback){                      //The Data field is the "id"
    console.log(Data,SourceTable,DestinationTable)
    Data = [Data]
    var values
    var sql = "DELETE FROM "+ SourceTable+ " WHERE `id` =" +Data
    const TempStore = await new Promise((resolve, reject) => {
        searchTable(MySQL,SourceTable,Data,function(result){
            resolve(result[0])
        })

    })
    values = Object.values(TempStore)   //puts value as list
    values = values.slice(1,values.length)  //gets rid of the id column
    
    var TableColumns = await getColumns(MySQL,DestinationTable)
    TableColumns = TableColumns.slice(1,DestinationTable.length)
    const quotedData = values.map(value => `"${value}"`);
    
    var sql2 = "INSERT INTO "+DestinationTable+" ("+TableColumns.join(",") + ") VALUES (" + quotedData.join(",") + ");"
    MySQL_query(MySQL,sql2,function(result){
    }) // Moves the data to the archive table
    console.log(sql)
    MySQL_query(MySQL,sql,callback)
}
// check if licence is about to expire
async function licence_checker(MySQL,TableName,expiryMonthInterval,transporter)
{
    var Data = ["","","","","","","","","","","",""] 

    var Expirdate = new Date()
    Expirdate.setMonth(Expirdate.getMonth()+expiryMonthInterval); //Generates a date 3 months from current date

    var dd = Expirdate.getDate()                //Changes date format from ISO to DD/MM/YYY
    var mm = Expirdate.getMonth()+1
    if (mm.toString.length == 1){ mm = "0"+mm}  //adds a "0" infront of a single digit months 1-9
    var yyyy = Expirdate.getFullYear();
    var dateformat = dd+"/"+mm+"/"+yyyy         //Changes date format from ISO to DD/MM/YYY

    Data[8] = dateformat
    
    var Expiry_data = await new Promise((resolve, reject) => { //gets all data from ls lx or RSS and puts it in variable
        searchTable(MySQL,TableName,Data,function(result){
            resolve(result)
        })
    })

    for(var i = 0; i < Expiry_data.length; i++)     // Sends an expiry email to all ls and lx users whos email is about to expire in specified months
    {
        var mailOptions = {                                          //Reference for sending email to user https://www.w3schools.com/nodejs/nodejs_email.asp
            from: 'radiationassetmanagementapplic@gmail.com',
            to: Expiry_data[i]["Email"],
            subject: 'Licence expiry',
            text: 'Your '+TableName.toUpperCase()+' licence is about to expire on '+dateformat
          };
        
        console.log(mailOptions)
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}


export { MySQL_query, DatabaseSetup, getTable , SortBy ,
    searchTable , addToTable , loadCSV, deleteFromTable, 
    restorefromTable, editRowTable, addData, updateData,
     deleteData, licence_checker}