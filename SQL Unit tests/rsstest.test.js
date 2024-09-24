import {SortBy, addToTable, editRowTable, deleteFromTable, restorefromTable} from '../Backend/MySQL_Functions';

const queryMock = jest.fn();
// Test cases for SortBy function
describe('SortBy function', () => {
    it('executes the SortBy function with different scenarios', async () => {
        // Test Case 1: Successful sort by name
        const TableName1 = 'RSS';
        const ColumnName1 = 'Name'; 
        const expectedSQL1 = 'CALL SortByName_RSS';

        await SortBy({ query: queryMock }, TableName1, ColumnName1, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

        // Test Case 2: Successful sort by Email
        const TableName2 = 'RSS';
        const ColumnName2 = 'Email';
        const expectedSQL2 = 'CALL SortByEmail_RSS';

        await SortBy({ query: queryMock }, TableName2, ColumnName2, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL2, expect.any(Function));

        // Test Case 3: Successful sort by Phone
        const TableName3 = 'RSS';
        const ColumnName3 = 'Phone';
        const expectedSQL3 = 'CALL SortByPhone_RSS';

        await SortBy({ query: queryMock }, TableName3, ColumnName3, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL3, expect.any(Function));

        // Test Case 4: Sort by School
        const TableName4 = 'RSS';
        const ColumnName4 = 'School';
        const expectedSQL4 = 'CALL SortBySchool_RSS';

        await SortBy({ query: queryMock }, TableName4, ColumnName4, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL4, expect.any(Function));

        // Test Case 5: Sort by Head Of School
        const TableName5 = 'RSS';
        const ColumnName5 = 'HeadOfSchool'; // Corrected column name
        const expectedSQL5 = 'CALL SortByHeadOfSchool_RSS';

        await SortBy({ query: queryMock }, TableName5, ColumnName5, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL5, expect.any(Function));

        // Test Case 6: Sort by Purposes
        const TableName6 = 'RSS';
        const ColumnName6 = 'Purposes';
        const expectedSQL6 = 'CALL SortByPurposes_RSS';

        await SortBy({ query: queryMock }, TableName6, ColumnName6, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL6, expect.any(Function));
    });
});

describe('Add, Edit, and Delete Operations for RSS Table', () => {
    // Test cases for adding entries to RSS table
    describe('Add Operation for RSS Table', () => {
        it('executes the addToTable function with different scenarios for RSS table', async () => {
            // Test Case 1: Successful Insertion
            const TableName1 = 'RSS';
            const Data1 = ["matthew tam","11111111@student.curtin.edu.au","123456789","AUS","JEREMY","TESTING"];
            const expectedSQL1 = 'CALL AddRSSEntry("matthew tam","11111111@student.curtin.edu.au","123456789","AUS","JEREMY","TESTING");';
            
            await addToTable({ query: queryMock }, TableName1, Data1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));
    
            // Test Case 2: Empty Data
            const TableName2 = 'RSS';
            const Data2 = [];
            // Since there's no data, the function shouldn't be called
            expect.assertions(1);
            try {
                await addToTable({ query: queryMock }, TableName2, Data2);
            } catch (err) {
                expect(err).toEqual('No data provided');
            }

        // Test Case 3: Missing Data
        const TableName3 = 'RSS';
        const Data3 = ['matthew', 'tam', '11111111@student.curtin.edu.au']; // Missing some fields
        // Since there's missing data, the function shouldn't be called
        expect.assertions(1);
        try {
            await addToTable({ query: queryMock }, TableName3, Data3);
        } catch (err) {
            expect(err).toEqual('Some fields are missing');
        }
        });
    });

    // Test cases for editing entries in RSS table
    describe('Edit Operation for RSS Table', () => {
        it('executes the editRowTable function with different scenarios for RSS table', async () => {
            // Test Case 1: Successful edit
            const TableName1 = 'RSS';
            const ID1 = 123; // Example ID
            const NewData1 = ['NewName', 'NewLastName', 'NewEmail']; // Example new data
            const expectedSQL1 = 'CALL Edit'+TableName1+'Entry(123, "NewName", "NewLastName", "NewEmail");';

            await editRowTable({ query: queryMock }, TableName1, ID1, NewData1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

            // Test Case 2: Attempt edit with empty ID
            const TableName2 = 'RSS';
            const ID2 = ''; // Empty ID
            const NewData2 = ['NewName', 'NewLastName', 'NewEmail']; // Example new data
            // Since the ID is empty, the function shouldn't be called
            try {
                await editRowTable({ query: queryMock }, TableName2, ID2, NewData2);
            } catch (err) {
                expect(err).toEqual('No ID provided');
            }
            
            // Test Case 3: Attempt edit with invalid ID format
            const TableName3 = 'RSS';
            const ID3 = 'invalidID'; // Invalid ID format
            const NewData3 = ['NewName', 'NewLastName', 'NewEmail']; // Example new data
            // Since the ID format is invalid, the function shouldn't be called
            try {
                await editRowTable({ query: queryMock }, TableName3, ID3, NewData3);
            } catch (err) {
                expect(err).toEqual('Invalid ID format');
            }
        });
    });

    // Test cases for deleting entries from RSS table
    describe('Delete Operation for RSS Table', () => {
        it('executes the deleteFromTable function with different scenarios for RSS table', async () => {
            // Test Case 1: Successful deletion
            const TableName1 = 'RSS';
            const ID1 = 123; // Example ID
            const expectedSQL1 = 'CALL MoveTo'+TableName1+'Archive(\'123\');';
 
            await deleteFromTable({ query: queryMock }, TableName1, ID1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));
 
            // Test Case 2: Attempt deletion with empty ID
            const TableName2 = 'RSS';
            const ID2 = ''; // Empty ID
            // Since the ID is empty, the function shouldn't be called
            try {
                await deleteFromTable({ query: queryMock }, TableName2, ID2);
            } catch (err) {
                expect(err).toEqual('No ID provided');
            }
 
            // Test Case 3: Attempt deletion with invalid ID format
            const TableName3 = 'RSS';
            const ID3 = 'invalidID'; // Invalid ID format
            // Since the ID format is invalid, the function shouldn't be called
            try {
                await deleteFromTable({ query: queryMock }, TableName3, ID3);
            } catch (err) {
                expect(err).toEqual('Invalid ID format');
            }
        });
    });

        // Test cases for recovering entries from RSS table
        describe('Restore Operation for RSS Table', () => {
            it('executes the restorefromTable function with different scenarios for RSS table', async () => {
                // Test Case 1: Successful deletion
                const TableName1 = 'RSS';
                const ID1 = 123; // Example ID
                const call = 'CALL MoveFrom'+TableName1+'Archive(\'123\');';
     
                await restorefromTable({ query: queryMock }, TableName1, ID1);
                expect(queryMock).toHaveBeenCalledWith(call, expect.any(Function));
     
                // Test Case 2: Attempt deletion with empty ID
                const TableName2 = 'RSS';
                const ID2 = ''; // Empty ID
                // Since the ID is empty, the function shouldn't be called
                try {
                    await restorefromTable({ query: queryMock }, TableName2, ID2);
                } catch (err) {
                    expect(err).toEqual('No ID provided');
                }
     
                // Test Case 3: Attempt deletion with invalid ID format
                const TableName3 = 'RSS';
                const ID3 = 'invalidID'; // Invalid ID format
                // Since the ID format is invalid, the function shouldn't be called
                try {
                    await restorefromTable({ query: queryMock }, TableName3, ID3);
                } catch (err) {
                    expect(err).toEqual('Invalid ID format');
                }
            });
        });
});
