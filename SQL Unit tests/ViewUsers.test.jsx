import ViewUsers from '../frontend/src/pages/ViewUsers';

describe('ViewUsers component', () => {
  test('renders UserTable with correct props', () => {
    // Render the ViewUsers component
    const viewUsers = ViewUsers.default ? ViewUsers.default : ViewUsers();

    // Check if the main title is rendered
    viewUsers.props.children.forEach((child) => {
      if (child && child.props.mainTitle) {
        expect(child.props.mainTitle).toEqual('Radiation Data');
      }
    });

    // Check if the secondary title is rendered
    viewUsers.props.children.forEach((child) => {
      if (child && child.props.title) {
        expect(child.props.title).toEqual('Users List');
      }
    });

    // Check if the UserTable component is rendered
    const headers = ['ID', 'Username', 'Email', 'Role'];
    headers.forEach((header) => {
      expect(getByText(header)).toBeTruthy();
    });

    // Test prop passing for users (assuming getByText is defined somewhere)
    const mockUsers = [
      { id: 1, username: 'user1', email: 'user1@example.com', role: 'Role1' },
      { id: 2, username: 'user2', email: 'user2@example.com', role: 'Role2' },
    ];
    mockUsers.forEach((user) => {
      expect(getByText(user.username)).toBeTruthy();
      expect(getByText(user.email)).toBeTruthy();
      expect(getByText(user.role)).toBeTruthy();
    });
  });
});
