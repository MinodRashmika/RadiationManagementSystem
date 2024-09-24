import {SortBy, addToTable, editRowTable, deleteFromTable, restorefromTable} from '../Backend/MySQL_Functions';

const queryMock = jest.fn();
// Test cases for SortBy function
describe('SortBy function', () => {

    it('executes the SortBy function with different scenarios', async () => {
        // Test Case 1: Successful sort by Isotope
        const TableName1 = 'RS';
        const ColumnName1 = 'Isotope'; 
        const expectedSQL1 = 'CALL SortByIsotope_RS';

        await SortBy({ query: queryMock }, TableName1, ColumnName1, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

        // Test Case 2: Successful sort by Quantity
        const TableName2 = 'RS';
        const ColumnName2 = 'Quantity'; 
        const expectedSQL2 = 'CALL SortByQuantity_RS';

        await SortBy({ query: queryMock }, TableName2, ColumnName2, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL2, expect.any(Function));

        // Test Case 3: Successful sort by Form
        const TableName3 = 'RS';
        const ColumnName3 = 'Form'; 
        const expectedSQL3 = 'CALL SortByForm_RS';

        await SortBy({ query: queryMock }, TableName3, ColumnName3, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL3, expect.any(Function));

        // Test Case 4: Sort by Purpose
        const TableName4 = 'RS';
        const ColumnName4 = 'Purpose';
        const expectedSQL4 = 'CALL SortByPurpose_RS';

        await SortBy({ query: queryMock }, TableName4, ColumnName4, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL4, expect.any(Function));

        // Test Case 5: Sort by Manufacturer
        const TableName5 = 'RS';
        const ColumnName5 = 'Manufacturer';
        const expectedSQL5 = 'CALL SortByManufacturer_RS';

        await SortBy({ query: queryMock }, TableName5, ColumnName5, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL5, expect.any(Function));

        // Test Case 6: Sort by Model
        const TableName6 = 'RS';
        const ColumnName6 = 'Model';
        const expectedSQL6 = 'CALL SortByModel_RS';

        await SortBy({ query: queryMock }, TableName6, ColumnName6, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL6, expect.any(Function));

        // Test Case 7: Sort by Serial Number
        const TableName7 = 'RS';
        const ColumnName7 = 'Serial No';
        const expectedSQL7 = 'CALL SortBySerialNo_RS';

        await SortBy({ query: queryMock }, TableName7, ColumnName7, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL7, expect.any(Function));

        // Test Case 8: Sort by Location
        const TableName8 = 'RS';
        const ColumnName8 = 'Location';
        const expectedSQL8 = 'CALL SortByLocation_RS';

        await SortBy({ query: queryMock }, TableName8, ColumnName8, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL8, expect.any(Function));

        // Test Case 9: Sort by RSS
        const TableName9 = 'RS';
        const ColumnName9 = 'RSS';
        const expectedSQL9 = 'CALL SortByRSS_RS';

        await SortBy({ query: queryMock }, TableName9, ColumnName9, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL9, expect.any(Function));

        // Test Case 10: Sort by Custodian
        const TableName10 = 'RS';
        const ColumnName10 = 'Custodian';
        const expectedSQL10 = 'CALL SortByCustodian_RS';

        await SortBy({ query: queryMock }, TableName10, ColumnName10, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL10, expect.any(Function));
        

        // Test Case 11: Sort by Last Seen
        const TableName11 = 'RS';
        const ColumnName11 = 'Last Seen';
        const expectedSQL11 = 'CALL SortByLastSeen_RS';

        await SortBy({ query: queryMock }, TableName11, ColumnName11, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL11, expect.any(Function));

         // Test Case 12: Sort by RC Notified
         const TableName12 = 'RS';
         const ColumnName12 = 'RC Notified';
         const expectedSQL12 = 'CALL SortByRCNotified_RS';
 
         await SortBy({ query: queryMock }, TableName12, ColumnName12, jest.fn());
         expect(queryMock).toHaveBeenCalledWith(expectedSQL12, expect.any(Function));


         // Test Case 13: Sort by RC Notified
         const TableName13 = 'RS';
         const ColumnName13 = 'Comments';
         const expectedSQL13 = 'CALL SortByComments_RS';
 
         await SortBy({ query: queryMock }, TableName13, ColumnName13, jest.fn());
         expect(queryMock).toHaveBeenCalledWith(expectedSQL13, expect.any(Function));
    });
});

describe('Add, Edit, and Delete Operations for RS Table', () => {
    // Test cases for adding entries to RS table
    describe('Add Operation for RS Table', () => {
        it('executes the addToTable function with different scenarios for RS table', async () => {
            // Test Case 1: Successful Insertion
            const TableName1 = 'RS';
            const Data1 = ['isotope', '2', 'liquid', 'destroy', 'corp', 'v2', '12345', 'lab', 'jeff', 'lab2', 'no', 'no', 'destructive'];
            const expectedSQL1 = 'CALL AddRSEntry("isotope","2","liquid","destroy","corp","v2","12345","lab","jeff","lab2","no","no","destructive");';

            await addToTable({ query: queryMock }, TableName1, Data1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));
    
            // Test Case 2: Empty Data
            const TableName2 = 'RS';
            const Data2 = [];
            // Since there's no data, the function shouldn't be called
            expect.assertions(1);
            try {
                await addToTable({ query: queryMock }, TableName2, Data2);
            } catch (err) {
                expect(err).toEqual('No data provided');
            }

            // Test Case 3: Missing Data
            const TableName3 = 'RS';
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

    // Test cases for editing entries in RS table
    describe('Edit Operation for RS Table', () => {
        it('executes the editRowTable function with different scenarios for RS table', async () => {
            // Test Case 1: Successful edit
            const TableName1 = 'RS';
            const ID1 = 123; // Example ID
            const NewData1 = ['NewName', 'NewLastName', 'NewEmail']; // Example new data
            const expectedSQL1 = 'CALL Edit'+TableName1+'Entry(123, "NewName", "NewLastName", "NewEmail");';

            await editRowTable({ query: queryMock }, TableName1, ID1, NewData1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

            // Test Case 2: Attempt edit with empty ID
            const TableName2 = 'RS';
            const ID2 = ''; // Empty ID
            const NewData2 = ['NewName', 'NewLastName', 'NewEmail']; // Example new data
            // Since the ID is empty, the function shouldn't be called
            try {
                await editRowTable({ query: queryMock }, TableName2, ID2, NewData2);
            } catch (err) {
                expect(err).toEqual('No ID provided');
            }
            
            // Test Case 3: Attempt edit with invalid ID format
            const TableName3 = 'RS';
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

    // Test cases for deleting entries from RS table
    describe('Delete Operation for RS Table', () => {
        it('executes the deleteFromTable function with different scenarios for RS table', async () => {
            // Test Case 1: Successful deletion
            const TableName1 = 'RS';
            const ID1 = 123; // Example ID
            const expectedSQL1 = 'CALL MoveTo'+TableName1+'Archive(\'123\');';
 
            await deleteFromTable({ query: queryMock }, TableName1, ID1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));
 
            // Test Case 2: Attempt deletion with empty ID
            const TableName2 = 'RS';
            const ID2 = ''; // Empty ID
            // Since the ID is empty, the function shouldn't be called
            try {
                await deleteFromTable({ query: queryMock }, TableName2, ID2);
            } catch (err) {
                expect(err).toEqual('No ID provided');
            }
 
            // Test Case 3: Attempt deletion with invalid ID format
            const TableName3 = 'RS';
            const ID3 = 'invalidID'; // Invalid ID format
            // Since the ID format is invalid, the function shouldn't be called
            try {
                await deleteFromTable({ query: queryMock }, TableName3, ID3);
            } catch (err) {
                expect(err).toEqual('Invalid ID format');
            }
        });
    });

    describe('Restore Operation for RS Table', () => {
        it('executes the restorefromTable function with different scenarios for RS table', async () => {
            // Test Case 1: Successful deletion
            const TableName1 = 'RS';
            const ID1 = 123; // Example ID
            const call = 'CALL MoveFrom'+TableName1+'Archive(\'123\');';
 
            await restorefromTable({ query: queryMock }, TableName1, ID1);
            expect(queryMock).toHaveBeenCalledWith(call, expect.any(Function));
 
            // Test Case 2: Attempt deletion with empty ID
            const TableName2 = 'RS';
            const ID2 = ''; // Empty ID
            // Since the ID is empty, the function shouldn't be called
            try {
                await restorefromTable({ query: queryMock }, TableName2, ID2);
            } catch (err) {
                expect(err).toEqual('No ID provided');
            }
 
            // Test Case 3: Attempt deletion with invalid ID format
            const TableName3 = 'RS';
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
