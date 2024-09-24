import {SortBy, addToTable, editRowTable, deleteFromTable, restorefromTable} from '../Backend/MySQL_Functions';

const queryMock = jest.fn();
// Test cases for SortBy function
describe('SortBy function', () => {

    it('executes the SortBy function with different scenarios', async () => {
        // Test Case 1: Successful sort by name
        const TableName1 = 'LX'; // Table being called
        const ColumnName1 = 'Name (first)'; // column name
        const expectedSQL1 = 'CALL SortByName(First)_LX'; //Expected SQL response to ensure its not accessing other column


        await SortBy({ query: queryMock }, TableName1, ColumnName1, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

        // Test Case 2: Successful sort by ID
        const TableName2 = 'LX';
        const ColumnName2 = 'Name (last)'; 
        const expectedSQL2 = 'CALL SortByName(Last)_LX';

        await SortBy({ query: queryMock }, TableName2, ColumnName2, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL2, expect.any(Function));

        // Test Case 3: Successful sort by email
        const TableName3 = 'LX';
        const ColumnName3 = 'Email'; // Example column name
        const expectedSQL3 = 'CALL SortByEmail_LX';

        await SortBy({ query: queryMock }, TableName3, ColumnName3, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL3, expect.any(Function));

        // Test Case 4: Sort by phone
        const TableName4 = 'LX';
        const ColumnName4 = 'Phone';
        const expectedSQL4 = 'CALL SortByPhone_LX';

        await SortBy({ query: queryMock }, TableName4, ColumnName4, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL4, expect.any(Function));

        // Test Case 5: Sort by License Number
        const TableName5 = 'LX';
        const ColumnName5 = 'License no';
        const expectedSQL5 = 'CALL SortByLicenseNo_LX';

        await SortBy({ query: queryMock }, TableName5, ColumnName5, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL5, expect.any(Function));

        // Test Case 6: Sort by custodian
        const TableName6 = 'LX';
        const ColumnName6 = 'Sequence No';
        const expectedSQL6 = 'CALL SortBySequenceNo_LX';

        await SortBy({ query: queryMock }, TableName6, ColumnName6, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL6, expect.any(Function));

        // Test Case 7: Sort by Expiry
        const TableName7 = 'LX';
        const ColumnName7 = 'Expiry';
        const expectedSQL7 = 'CALL SortByExpiry_LX';

        await SortBy({ query: queryMock }, TableName7, ColumnName7, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL7, expect.any(Function));

        // Test Case 8: Sort by Purposes
        const TableName8 = 'LX';
        const ColumnName8 = 'Purposes';
        const expectedSQL8 = 'CALL SortByPurposes_LX';

        await SortBy({ query: queryMock }, TableName8, ColumnName8, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL8, expect.any(Function));

        // Test Case 9: Sort by RSS
        const TableName9 = 'LX';
        const ColumnName9 = 'RSS';
        const expectedSQL9 = 'CALL SortByRSS_LX';

        await SortBy({ query: queryMock }, TableName9, ColumnName9, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL9, expect.any(Function));

        // Test Case 10: Sort by Comments
        const TableName10 = 'LX';
        const ColumnName10 = 'Comments';
        const expectedSQL10 = 'CALL SortByComments_LX';

        await SortBy({ query: queryMock }, TableName10, ColumnName10, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL10, expect.any(Function));
    });
});

describe('Add, Edit, and Delete Operations for LX Table', () => {
    // Test cases for adding entries to LX table
    describe('Add Operation for LX Table', () => {
        it('executes the addToTable function with different scenarios for LX table', async () => {
            // Test Case 1: Successful Insertion
            const TableName1 = 'LX';
            const Data1 = ['matthew', 'tam', '11111111@student.curtin.edu.au', '', '', '', '', '6/09/2024', '', '', ''];
            const expectedSQL1 = 'CALL AddLXEntry("matthew","tam","11111111@student.curtin.edu.au","","","","","6/09/2024","","","");';
            
            await addToTable({ query: queryMock }, TableName1, Data1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

            // Test Case 2: Empty Data
            const TableName2 = 'LX';
            const Data2 = [];
            // Since there's no data, the function shouldn't be called
            expect.assertions(1);
            try {
                await addToTable({ query: queryMock }, TableName2, Data2);
            } catch (err) {
                expect(err).toEqual('No data provided');
            }

            // Test Case 3: Missing Data
            const TableName3 = 'LX';
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

    // Test cases for editing entries in LX table
    describe('Edit Operation for LX Table', () => {
        it('executes the editRowTable function with different scenarios for LX table', async () => {
            // Test Case 1: Successful edit
            const TableName1 = 'LX';
            const ID1 = 123; // Example ID
            const NewData1 = ['NewName', 'NewLastName', 'NewEmail']; // Example new data
            const expectedSQL1 = 'CALL Edit'+TableName1+'Entry(123, "NewName", "NewLastName", "NewEmail");';

            await editRowTable({ query: queryMock }, TableName1, ID1, NewData1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

            // Test Case 2: Attempt edit with empty ID
            const TableName2 = 'LX';
            const ID2 = ''; // Empty ID
            const NewData2 = ['NewName', 'NewLastName', 'NewEmail']; // Example new data
            // Since the ID is empty, the function shouldn't be called
            try {
                await editRowTable({ query: queryMock }, TableName2, ID2, NewData2);
            } catch (err) {
                expect(err).toEqual('No ID provided');
            }
            
            // Test Case 3: Attempt edit with invalid ID format
            const TableName3 = 'LX';
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

    // Test cases for deleting entries from LX table
    describe('Delete Operation for LX Table', () => {
        it('executes the deleteFromTable function with different scenarios for LX table', async () => {
            // Test Case 1: Successful deletion
            const TableName1 = 'LX';
            const ID1 = 123; // Example ID
            const expectedSQL1 = 'CALL MoveTo'+TableName1+'Archive(\'123\');';
 
            await deleteFromTable({ query: queryMock }, TableName1, ID1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));
 
            // Test Case 2: Attempt deletion with empty ID
            const TableName2 = 'LX';
            const ID2 = ''; // Empty ID
            // Since the ID is empty, the function shouldn't be called
            try {
                await deleteFromTable({ query: queryMock }, TableName2, ID2);
            } catch (err) {
                expect(err).toEqual('No ID provided');
            }
 
            // Test Case 3: Attempt deletion with invalid ID format
            const TableName3 = 'LX';
            const ID3 = 'invalidID'; // Invalid ID format
            // Since the ID format is invalid, the function shouldn't be called
            try {
                await deleteFromTable({ query: queryMock }, TableName3, ID3);
            } catch (err) {
                expect(err).toEqual('Invalid ID format');
            }
        });
    });

           // Test cases for Recovering entries from LX table
           describe('Recover Operation for LX Table', () => {
            it('executes the restorefromTable function with different scenarios for LX table', async () => {
                // Test Case 1: Successful Recovery
                const TableName1 = 'LX';
                const ID1 = 123; // Example ID
                const call = 'CALL MoveFrom'+TableName1+'Archive(\'123\');';
     
                await restorefromTable({ query: queryMock }, TableName1, ID1);
                expect(queryMock).toHaveBeenCalledWith(call, expect.any(Function));
     
                // Test Case 2: Attempt deletion with empty ID
                const TableName2 = 'LX';
                const ID2 = ''; // Empty ID
                // Since the ID is empty, the function shouldn't be called
                try {
                    await restorefromTable({ query: queryMock }, TableName2, ID2);
                } catch (err) {
                    expect(err).toEqual('No ID provided');
                }
     
                // Test Case 3: Attempt deletion with invalid ID format
                const TableName3 = 'LX';
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
