import {SortBy, addToTable, editRowTable, deleteFromTable, restorefromTable} from '../Backend/MySQL_Functions';

const queryMock = jest.fn();
// Test cases for SortBy function
describe('SortBy function', () => {

    it('executes the SortBy function with different scenarios', async () => {
        // Test Case 1: Successful sort by Make
        const TableName1 = 'RX';
        const ColumnName1 = 'Make';
        const expectedSQL1 = 'CALL SortByMake_RX';

        await SortBy({ query: queryMock }, TableName1, ColumnName1, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

        // Test Case 2: Successful sort by Model
        const TableName2 = 'RX';
        const ColumnName2 = 'Model';
        const expectedSQL2 = 'CALL SortByModel_RX';

        await SortBy({ query: queryMock }, TableName2, ColumnName2, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL2, expect.any(Function));

        // Test Case 3: Successful sort by Serial Number
        const TableName3 = 'RX';
        const ColumnName3 = 'Serial No';
        const expectedSQL3 = 'CALL SortBySerialNo_RX';

        await SortBy({ query: queryMock }, TableName3, ColumnName3, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL3, expect.any(Function));

        // Test Case 4: Sort by Equipment Use
        const TableName4 = 'RX';
        const ColumnName4 = 'Equipment Use';
        const expectedSQL4 = 'CALL SortByEquipmentUse_RX';

        await SortBy({ query: queryMock }, TableName4, ColumnName4, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL4, expect.any(Function));

        // Test Case 5: Sort by Location
        const TableName5 = 'RX';
        const ColumnName5 = 'Location';
        const expectedSQL5 = 'CALL SortByLocation_RX';

        await SortBy({ query: queryMock }, TableName5, ColumnName5, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL5, expect.any(Function));

        // Test Case 6: Sort by RSS
        const TableName6 = 'RX';
        const ColumnName6 = 'RSS';
        const expectedSQL6 = 'CALL SortByRSS_RX';

        await SortBy({ query: queryMock }, TableName6, ColumnName6, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL6, expect.any(Function));

        // Test Case 7: Sort by Custodian
        const TableName7 = 'RX';
        const ColumnName7 = 'Custodian';
        const expectedSQL7 = 'CALL SortByCustodian_RX';

        await SortBy({ query: queryMock }, TableName7, ColumnName7, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL7, expect.any(Function));

        // Test Case 8: Sort by Last Seen
        const TableName8 = 'RX';
        const ColumnName8 = 'Last Seen';
        const expectedSQL8 = 'CALL SortByLastSeen_RX';

        await SortBy({ query: queryMock }, TableName8, ColumnName8, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL8, expect.any(Function));

        // Test Case 9: Sort by RC Notified
        const TableName9 = 'RX';
        const ColumnName9 = 'RC Notified';
        const expectedSQL9 = 'CALL SortByRCNotified_RX';

        await SortBy({ query: queryMock }, TableName9, ColumnName9, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL9, expect.any(Function));

        // Test Case 10: Sort by Specs 1
        const TableName10 = 'RX';
        const ColumnName10 = 'Specs 1';
        const expectedSQL10 = 'CALL SortBySpecs1_RX';

        await SortBy({ query: queryMock }, TableName10, ColumnName10, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL10, expect.any(Function));

        // Test Case 11: Sort by Specs 2
        const TableName11 = 'RX';
        const ColumnName11 = 'Specs 2';
        const expectedSQL11 = 'CALL SortBySpecs2_RX';

        await SortBy({ query: queryMock }, TableName11, ColumnName11, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL11, expect.any(Function));


        // Test Case 12: Sort by Specs 3
        const TableName12 = 'RX';
        const ColumnName12 = 'Specs 3';
        const expectedSQL12 = 'CALL SortBySpecs3_RX';

        await SortBy({ query: queryMock }, TableName12, ColumnName12, jest.fn());
        expect(queryMock).toHaveBeenCalledWith(expectedSQL12, expect.any(Function));

       // Test Case 13: Sort by Specs 4
       const TableName13 = 'RX';
       const ColumnName13 = 'Specs 4';
       const expectedSQL13 = 'CALL SortBySpecs4_RX';

       await SortBy({ query: queryMock }, TableName13, ColumnName13, jest.fn());
       expect(queryMock).toHaveBeenCalledWith(expectedSQL13, expect.any(Function));
    

       // Test Case 14: Sort by Comments
       const TableName14 = 'RX';
       const ColumnName14 = 'Comments';
       const expectedSQL14 = 'CALL SortByComments_RX';

       await SortBy({ query: queryMock }, TableName14, ColumnName14, jest.fn());
       expect(queryMock).toHaveBeenCalledWith(expectedSQL14, expect.any(Function));
    });
});

describe('Add, Edit, and Delete Operations for RX Table', () => {
    // Test cases for adding entries to RX table
    describe('Add Operation for RX Table', () => {
        it('executes the addToTable function with different scenarios for RX table', async () => {
            // Test Case 1: Successful Insertion
            const TableName1 = 'RX';
            const Data1 = ['Trotec', 'Speedy400 Flexx', 'X4-0276', 'Laser - industrial', '202.163', 'GM', '2023-12-14', '10600', '130', 'Laser cutter.'];
            const expectedSQL1 = 'CALL AddRXEntry("Trotec","Speedy400 Flexx","X4-0276","Laser - industrial","202.163","GM","2023-12-14","10600","130","Laser cutter.");';
            
            await addToTable({ query: queryMock }, TableName1, Data1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

            // Test Case 2: Empty Data
            const TableName2 = 'RX';
            const Data2 = [];
            // Since there's no data, the function shouldn't be called
            expect.assertions(1);
            try {
                await addToTable({ query: queryMock }, TableName2, Data2);
            } catch (err) {
                expect(err).toEqual('No data provided');
            }

            // Test Case 3: Missing Data
            const TableName3 = 'RX';
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

    // Test cases for editing entries in RX table
    describe('Edit Operation for RX Table', () => {
        it('executes the editRowTable function with different scenarios for RX table', async () => {
            // Test Case 1: Successful edit
            const TableName1 = 'RX';
            const ID1 = 123; // Example ID
            const NewData1 = ['NewName', 'NewLastName', 'NewEmail']; // Example new data
            const expectedSQL1 = 'CALL Edit'+TableName1+'Entry(123, "NewName", "NewLastName", "NewEmail");';

            await editRowTable({ query: queryMock }, TableName1, ID1, NewData1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));

            // Test Case 2: Attempt edit with empty ID
            const TableName2 = 'RX';
            const ID2 = ''; // Empty ID
            const NewData2 = ['NewName', 'NewLastName', 'NewEmail']; // Example new data
            // Since the ID is empty, the function shouldn't be called
            try {
                await editRowTable({ query: queryMock }, TableName2, ID2, NewData2);
            } catch (err) {
                expect(err).toEqual('No ID provided');
            }
            
            // Test Case 3: Attempt edit with invalid ID format
            const TableName3 = 'RX';
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

    // Test cases for deleting entries from RX table
    describe('Delete Operation for RX Table', () => {
        it('executes the deleteFromTable function with different scenarios for RX table', async () => {
            // Test Case 1: Successful deletion
            const TableName1 = 'RX';
            const ID1 = 123; // Example ID
            const expectedSQL1 = 'CALL MoveTo'+TableName1+'Archive(\'123\');';
 
            await deleteFromTable({ query: queryMock }, TableName1, ID1);
            expect(queryMock).toHaveBeenCalledWith(expectedSQL1, expect.any(Function));
 
            // Test Case 2: Attempt deletion with empty ID
            const TableName2 = 'RX';
            const ID2 = ''; // Empty ID
            // Since the ID is empty, the function shouldn't be called
            try {
                await deleteFromTable({ query: queryMock }, TableName2, ID2);
            } catch (err) {
                expect(err).toEqual('No ID provided');
            }
 
            // Test Case 3: Attempt deletion with invalid ID format
            const TableName3 = 'RX';
            const ID3 = 'invalidID'; // Invalid ID format
            // Since the ID format is invalid, the function shouldn't be called
            try {
                await deleteFromTable({ query: queryMock }, TableName3, ID3);
            } catch (err) {
                expect(err).toEqual('Invalid ID format');
            }
        });
    });

        // Test cases for restoring entries from RX table
        describe('Delete Operation for RX Table', () => {
            it('executes the restorefromTable function with different scenarios for RX table', async () => {
                // Test Case 1: Successful deletion
                const TableName1 = 'RX';
                const ID1 = 123; // Example ID
                const call = 'CALL MoveFrom'+TableName1+'Archive(\'123\');';
     
                await restorefromTable({ query: queryMock }, TableName1, ID1);
                expect(queryMock).toHaveBeenCalledWith(call, expect.any(Function));
     
                // Test Case 2: Attempt deletion with empty ID
                const TableName2 = 'RX';
                const ID2 = ''; // Empty ID
                // Since the ID is empty, the function shouldn't be called
                try {
                    await restorefromTable({ query: queryMock }, TableName2, ID2);
                } catch (err) {
                    expect(err).toEqual('No ID provided');
                }
     
                // Test Case 3: Attempt deletion with invalid ID format
                const TableName3 = 'RX';
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
