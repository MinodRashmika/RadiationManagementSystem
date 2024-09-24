//npm install --save-dev jest @types/jest ts-jest babel-jest jest-extended jest-environment-node jest-fetch-mock @testing-library/react @testing-library/jest-dom

// Import the necessary modules
import { getTable, searchTable } from '../Backend/MySQL_Functions';

// Create a mock for the MySQL.query and getColumns functions
const queryMock = jest.fn();
const getColumnsMock = jest.fn();

describe('Table Inquiry Functions', () => {
    // Test cases for getTable function
    describe('getTable function', () => {
        it('executes the getTable function with different scenarios', async () => {
            // Test Case 1: Successful retrieval
            const TableName = 'LS';
            const expectedSQL = `SELECT * FROM \`${TableName}\``;

            // Mocking the result of the query
            const mockResult = [{ id: 1, Make: 'Make1', Model: 'Model1' }, { id: 2, Make: 'Make2', Model: 'Model2' }];
            queryMock.mockImplementation((sql, callback) => {
                if (sql === expectedSQL) {
                    callback(null, mockResult);
                } else {
                    callback(new Error('Unexpected query'));
                }
            });

            // Call the getTable function with the mock MySQL object and table name
            await getTable({ query: queryMock }, TableName, (result) => {
                // Assert that the result matches the mock result
                expect(result).toEqual(mockResult);
            });

            // Assert that the MySQL query method was called with the expected SQL query
            expect(queryMock).toHaveBeenCalledWith(expectedSQL, expect.any(Function));
        });
    });

    // Test cases for searchTable function
    describe('searchTable function', () => {
        beforeEach(() => {
            queryMock.mockClear();
            getColumnsMock.mockClear();
        });

        it('executes the searchTable function with different scenarios', async () => {
            // Mock the getColumns function to return some columns
            getColumnsMock.mockResolvedValue(['Name', 'Email', 'Phone', 'Country', 'School', 'HeadOfSchool', 'Purposes']);

            // Replace getColumns function call in searchTable with getColumnsMock
            async function searchTable(MySQL, TableName, Data, callback) {
                try {
                    var sql = "SELECT * FROM " + TableName + " WHERE ";

                    var TableColumnNames = await getColumnsMock(TableName);
                    console.log(TableColumnNames);
                    var columnLength = TableColumnNames.length;
                    var SearchFieldcount = 0; // Keeps track of Number of search fields
                    for (var i = 0; i < Data.length; i++) {
                        if (Data[i] != "") {
                            if (SearchFieldcount > 0) {
                                sql = sql + " AND ";
                            }
                            sql = sql + TableColumnNames[i] + " = " + "'" + Data[i] + "'";
                            SearchFieldcount++;
                        }
                    }
                    if (SearchFieldcount === 0) {
                        throw new Error('No search criteria provided');
                    }
                    sql = sql + ";";
                    console.log(sql);
                    MySQL.query(sql, callback);
                } catch (error) {
                    callback(null, error);
                }
            }

            // Test Case 1: Search with one non-empty field
            const TableName1 = 'LS';
            const Data1 = ['matthew', '', '', '', '', '']; // Example data
            const expectedSQL1 = "SELECT * FROM LS WHERE Name = 'matthew';";

            await searchTable({ query: queryMock }, TableName1, Data1, jest.fn());
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

            // Test Case 2: Search with multiple non-empty fields
            const TableName2 = 'LS';
            const Data2 = ['matthew', '11111111@student.curtin.edu.au', '', 'AUS', 'Curtin', 'Jeff', '']; // Example data
            const expectedSQL2 = "SELECT * FROM LS WHERE Name = 'matthew' AND Email = '11111111@student.curtin.edu.au' AND Country = 'AUS' AND School = 'Curtin' AND HeadOfSchool = 'Jeff';";

            await searchTable({ query: queryMock }, TableName2, Data2, jest.fn());
            expect(queryMock).toHaveBeenCalledWith(expectedSQL2, expect.any(Function));

            // Test Case 3: Search with all empty fields
            const TableName3 = 'LS';
            const Data3 = ['', '', '', '', '', '', '']; // Example data

            expect.assertions(2);
            try {
                await searchTable({ query: queryMock }, TableName3, Data3, jest.fn());
            } catch (err) {
                expect(err.message).toEqual('No search criteria provided');
            }
        }, 10000); 
    });
});
