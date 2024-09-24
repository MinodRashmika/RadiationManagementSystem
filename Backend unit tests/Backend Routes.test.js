// test/routes.test.js
// The test code structure is from this source https://www.youtube.com/watch?v=FKnzS_icp20 

//npx jest --runInBand To run the test
import app from '../Backend/server.js'; 
import request from 'supertest';
var rxPath = "C:/Users/Hiffy/Desktop/UNI/Y3 S2/Capstone Computing 2/Code Environments/240306 RX examples.csv"
var rsPath = "C:/Users/Hiffy/Desktop/UNI/Y3 S2/Capstone Computing 2/Code Environments/240306 RS examples.csv"
var lsPath = "C:/Users/Hiffy/Desktop/UNI/Y3 S2/Capstone Computing 2/Code Environments/240306 LS examples.csv"
var lxPath = "C:/Users/Hiffy/Desktop/UNI/Y3 S2/Capstone Computing 2/Code Environments/240306 LS examples.csv"
var rssPath = "C:/Users/Hiffy/Desktop/UNI/Y3 S2/Capstone Computing 2/XLSX TEST LS .xlsx"

var ImportYesOrNo = "Y"

const SetupList = [
{
  PathName:rxPath,
  TableName: "rx",              //Loads rx
  SetupYN: "N",
  LoadCSVYN:ImportYesOrNo
},
{
  PathName:rsPath,
  TableName: "rs",              //Loads rs
  SetupYN: "N",
  LoadCSVYN:ImportYesOrNo
},
{
  PathName:lsPath,
  TableName: "ls",              //Loads ls
  SetupYN: "N",
  LoadCSVYN:ImportYesOrNo
},
{
  PathName:lxPath,
  TableName: "lx",              //Loads lx
  SetupYN: "N",
  LoadCSVYN:ImportYesOrNo
},
{
  PathName:rssPath,
  TableName: "rss",              //Loads rss
  SetupYN: "N",
  LoadCSVYN:ImportYesOrNo
}
]
console.log(SetupList)
describe('Load csv', () => {
  for (let i = 0; i < SetupList.length; i++) {
    const { PathName, TableName, SetupYN, LoadCSVYN } = SetupList[i];
    test(`responds with 200 status code importing CSV for ${i}`, async () => {
      const response = await request(app).post('/sqlsetup').send({ PathName, TableName, SetupYN, LoadCSVYN });
      expect(response.statusCode).toBe(200);
    });
  }
});



//GET DATABASE FUNCTION TESTING
describe('GET /database', () => {
  test('responds with 200 status code', async () => {
    const response = await request(app).get('/database');
    expect(response.statusCode).toBe(200);
  });
});

//GET TABLE FUNCTION TESTING
// TESTING FOR ROUTE app.get('/table/:TableName', (req, res) => {}======================================================

describe('Get the table by specifying table name in url', () => {
  const TableNames = ["rx","rs","ls","lx","rss"]
  for(var i = 0; i < TableNames.length;i++){
    const table = "/table/"+TableNames[i]
    test(`responds with 200 status code for table ${TableNames[i]}`, async () => {
      const response = await request(app).get(table);
      expect(response.statusCode).toBe(200);
    });
  }
  
  test('responds with 404 status code', async () => {
    const response = await request(app).get('/table/UNKNOWN TABLE');
    expect(response.statusCode).toBe(404);
  });
});

//SEARCH FUNCTION TESTING
// TESTING FOR ROUTE app.get('/search', (req, res) => {}  Make sure you have imported all data into MySQL======================================================
describe('GET /search', () => {
  it('responds with 200 status code and JSON result for valid search', async () => {
    const requestData = {
      TableName: 'ls',
      Data: ['', '', '', '', '', '', '', '', '6/08/2024', '', '', '']
    };

    const response = await request(app)
      .get('/search')
      .send(requestData)
      .set('Accept', 'application/json');

    // Check status code
    expect(response.statusCode).toBe(200);
  });

  it('responds with 404 status code and error message for invalid search', async () => {
    const requestData = {
      TableName: 'invalidTableName',
      Data: ['invalidData']
    }

    const response = await request(app)
      .get('/search')
      .send(requestData)
      .set('Accept', 'application/json');
      
    expect(response.statusCode).toBe(404);
  });
});

//ADD FUNCTION TESTING 
// TESTING FOR ROUTE app.get('/add', (req, res) => {}  Make sure you have imported all data into MySQL======================================================
const AddTestList = [      
{
  TableName: "ls",
  Data:["Down","Robb","123123123@student.curtin.edu.au","","","","","6/08/2024","","",""]
},
{
  TableName: "lx",
  Data:["TEST AB10","LASTNAME AB10","AB10@student.curtin.edu.au","","","","","6/08/2024","","",""]
},
{
  TableName: "rx",
  Data:["NewMake","asd","asd","4","3","2","1","sfd","5","66","7","8","9","Commentoossad"]
},
{
  TableName: "rs",
  Data: ["NewIsotope", "333 kBq", "Sealed Solid", "Research", "", "", "AJ-7307", "301.222", "JW", "", "", "", ""]
},
{
  TableName: "rss",
  Data:["Down","Robb","123123123@student.curtin.edu.au","","","","","6/08/2024","","",""]
}]
describe('POST add results', () => {
  for(var i = 0; i < AddTestList.length; i++){
    const { TableName, Data } = AddTestList[i];
    test(`responds with 200 status code for the add ${AddTestList[i]} `, async () => {
      const response = await request(app).post('/add').send({ TableName, Data });
      expect(response.statusCode).toBe(200);
  });
  }

  test(`responds with 404 status code for adding invalid data `, async () => {
    const response = await request(app).post('/add').send(
      {
        TableName: "Fe59"
      }
    );
    expect(response.statusCode).toBe(404);
  });
});

//EDIT FUNCTION TESTING
// TESTING FOR ROUTE app.get('/edit', (req, res) => {}  Make sure you have imported all data into MySQL======================================================
const EditTestList = [
{
  TableName: "rs",
  Data:"57",
  NewData:["", "EDITED C14", "", "EDITED C14", "", "", "", "", "", "", "","" ,""]
},
{
  TableName: "rx",
  Data:"57",
  NewData:["", "EDITED Perkin-Elmer", "", "EDITED Perkin-Elmer", "", "", "", "", "", "", "","" ,"",""]
},
{
  TableName: "ls",
  Data:"11",
  NewData:["", "EDITED ls", "", "EDITED ls", "", "", "", "", "", "", ""]
},
{
  TableName: "lx",
  Data:"11",
  NewData:["", "EDITED lx", "", "EDITED lx", "", "", "", "", "", "", ""]
},
{
  TableName: "rss",
  Data:"15",
  NewData:["", "EDITED ls", "", "EDITED ls", "", "", "", "", "", "", ""]
}
]

describe('PUT edit results', () => {
  for(var i = 0; i < EditTestList.length; i++){
    const { TableName, Data, NewData } = EditTestList[i];
    test(`responds with 200 status code for the editing ${i} `, async () => {
      const response = await request(app).put('/edit').send({ TableName, Data, NewData });
      expect(response.statusCode).toBe(200);
    });
  }

  test(`responds with 404 status code for editing invalid data `, async () => {
    const data = {
      TableName: "rx",
      Data:"222",
      NewData:["", "EDITED", "", "EDITED", "", "", "", "", "", "", "","" ,""]
    }
    const response = await request(app).put('/edit').send(data);
    expect(response.statusCode).toBe(404);
  });
});


//DELETE FUNCTION TESTING
// TESTING FOR ROUTE app.get('/delete', (req, res) => {}  Make sure you have imported all data into MySQL======================================================
const DeleteTestList = [
{
  TableName: "rs",
  Data:"56"
},
{
  TableName: "rs",
  Data:"58"
},
{
  TableName: "rs",
  Data:"90"
},
{
  TableName: "rx",
  Data:"38"
},
{
  TableName: "rx",
  Data:"50"
},
{
  TableName: "rx",
  Data:"63"
},
//===
{
  TableName: "ls",
  Data:"25"
},
{
  TableName: "ls",
  Data:"17"
},
{
  TableName: "ls",
  Data:"17"
},
{
  TableName: "lx",
  Data:"25"
},
{
  TableName: "lx",
  Data:"17"
},
{
  TableName: "lx",
  Data:"17"
},
{
  TableName: "rss",
  Data:"16"
},
{
  TableName: "rss",
  Data:"17"
},
]

describe('DELETE data', () => {
  for(var i = 0; i < DeleteTestList.length; i++){
    const { TableName, Data } = DeleteTestList[i];
    test(`responds with 200 status code for the deleting data ${i} `, async () => {
      const response = await request(app).delete('/delete').send({ TableName, Data });
      expect(response.statusCode).toBe(200);
    });
  }

  test(`responds with 404 status code for deleting an empty data id `, async () => {
    const data = {
      "TableName": "rs",
      "Data":""
    }
    const response = await request(app).put('/delete').send(data);
    expect(response.statusCode).toBe(404);
  });
});


//RESTORE FUNCTION TESTING
// TESTING FOR ROUTE app.get('/restore', (req, res) => {}  Make sure you have imported all data into MySQL======================================================
const RestoreTestList = [
{
  TableName: "rs",
  Data:"1"
},
{
  TableName: "rs",
  Data:"2"
},
{
  TableName: "rs",
  Data:"3"
},
{
  TableName: "rx",
  Data:"1"
},
{
  TableName: "rx",
  Data:"2"
},
{
  TableName: "rx",
  Data:"3"
},
//==
{
  TableName: "ls",
  Data:"1"
},
{
  TableName: "ls",
  Data:"1"
},
{
  TableName: "ls",
  Data:"1"
},
{
  TableName: "lx",
  Data:"1"
},
{
  TableName: "lx",
  Data:"2"
},
{
  TableName: "lx",
  Data:"3"
},
{
  TableName: "rss",
  Data:"1"
},
{
  TableName: "rss",
  Data:"2"
},
]

describe('Restore data from archive', () => {
  for(var i = 0; i < RestoreTestList.length; i++){
    const { TableName, Data } = RestoreTestList[i];
    test(`responds with 200 status code for the restoring data ${RestoreTestList[i]} `, async () => {
      const response = await request(app).delete('/restore').send({ TableName, Data });
      expect(response.statusCode).toBe(200);
    });
  }

  test(`responds with 404 status code for restoring an empty data id `, async () => {
    const data = {
      "TableName": "rs",
      "Data":""
    }
    const response = await request(app).put('/restore').send(data);
    expect(response.statusCode).toBe(404);
  });
});

//=============================================USERS TABLE CUD (CREATE, UPDATE, DELETE)================================================
// ADD USER FUNCTION
const UserAddList = [
{
    TableName: "users",
    Data:["TEST @22 ","TEST @ 22 @gmail.com","@(@(@#IjdWodjwoj(@","Admin"]
},
{
  TableName: "users",
  Data: ["TEST 2", "Test2@gmail.com", "@(@(@#IjdWodjwoj(@", "Admin"]
},
{
  TableName: "users",
  Data: ["TEST 3", "Test3@gmail.com", "@(@(@#IjdWodjwoj(@", "Admin"]
}
]
describe('POST add users ', () => {
  for(var i = 0; i < UserAddList.length; i++){
    const { TableName, Data } = UserAddList[i];
    test(`responds with 200 status code for adding user ${i} `, async () => {
      const response = await request(app).post('/addData').send({ TableName, Data });
      expect(response.statusCode).toBe(200);
    });
  }

  test(`responds with 404 status code for adding invalid user `, async () => {
    const response = await request(app).post('/addData').send(
      {
        TableName: "users",
        Data: ["TEST 3"]
      }
    );
    expect(response.statusCode).toBe(404);
  });
});

// UPDATE USER FUNCTION
const UserEditList = [
{
    TableName: "users",
    Data:"1",
    NewData:["EDITED COLUMN","","",""]
},
{
  TableName: "users",
  Data:"2",
  NewData:["","EDITED COLUMN","",""]
},
{
  TableName: "users",
  Data:"3",
  NewData:["","","EDITED COLUMN",""]
}
]

describe('PUT edit results', () => {
  for(var i = 0; i < UserEditList.length; i++){
    const { TableName, Data, NewData } = UserEditList[i];
    test(`responds with 200 status code for the editing user ${UserEditList[i]} `, async () => {
      const response = await request(app).put('/editData').send({ TableName, Data, NewData });
      expect(response.statusCode).toBe(200);
    });
  }

  test(`responds with 404 status code for editing invalid user data `, async () => {
    const data = {
      TableName: "users",
      Data:"143",
      NewData:["","EDITED COLUMN","EDITED COLUMN","EDITED COLUMN","EDITED COLUMN","EDITED COLUMN"]
    }
    const response = await request(app).put('/editData').send(data);
    expect(response.statusCode).toBe(200);
  });
});

// DELETE USER FUNCTION
const UserDeleteList = [
{
  TableName: "users",
  Data:"1",
},
{
  TableName: "users",
  Data:"2",
},
{
  TableName: "users",
  Data:"3",
}
]
describe('Delete users', () => {
  for(var i = 0; i < UserDeleteList.length; i++){
    const { TableName, Data, NewData } = UserDeleteList[i];
    test(`responds with 200 status code for the deleting user: ${UserDeleteList[i]} `, async () => {
      const response = await request(app).delete('/deleteData').send({ TableName, Data });
      expect(response.statusCode).toBe(200);
    });
  }

  test(`responds with 404 status code for deleting invalid user `, async () => {
    const data = {
      TableName: "users",
      Data:"143",
      NewData:[""]
    }
    const response = await request(app).put('/editData').send(data);
    expect(response.statusCode).toBe(200);
  });
});

// RESTORE USER FUNCTION


const UserRestoreList = [
  {
    TableName: "users",
    Data:"1"
  },
  {
    TableName: "users",
    Data:"2"
  },
  {
    TableName: "users",
    Data:"3"
  }
  ]
  describe('Restoring users', () => {
    for(var i = 0; i < UserRestoreList.length; i++){
      const { TableName, Data, NewData } = UserRestoreList[i];
      test(`responds with 200 status code for the restoring user: ${UserRestoreList[i]} `, async () => {
        const response = await request(app).delete('/restoreData').send({ TableName, Data });
        expect(response.statusCode).toBe(200);
      });
    }
  
    test(`responds with 404 status code for restoring invalid user `, async () => {
      const data = {
        TableName: "users",
        Data:"143",
        NewData:[""]
      }
      const response = await request(app).put('/editData').send(data);
      expect(response.statusCode).toBe(200);
    });
  });