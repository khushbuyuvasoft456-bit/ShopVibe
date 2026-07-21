// Global object cache to persist across hot reloads in development
if (!global.mockDb) {
  global.mockDb = {
    users: [
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
        phone: "+1 (555) 019-2834",
        shippingAddress: {
          fullName: "Jane Doe",
          street: "123 Market Street, Apt 4B",
          city: "San Francisco",
          state: "CA",
          zipCode: "94103",
          country: "United States",
          phone: "+1 (555) 019-2834",
        },
        billingAddress: {
          fullName: "Jane Doe",
          street: "123 Market Street, Apt 4B",
          city: "San Francisco",
          state: "CA",
          zipCode: "94103",
          country: "United States",
          phone: "+1 (555) 019-2834",
        },
      },
      {
        name: "Test User",
        email: "test@example.com",
        password: "123456",
        phone: "+1 (555) 111-2222",
        shippingAddress: {
          fullName: "Test User",
          street: "456 Oak Street",
          city: "San Francisco",
          state: "CA",
          zipCode: "94102",
          country: "United States",
          phone: "+1 (555) 111-2222",
        },
        billingAddress: {
          fullName: "Test User",
          street: "456 Oak Street",
          city: "San Francisco",
          state: "CA",
          zipCode: "94102",
          country: "United States",
          phone: "+1 (555) 111-2222",
        },
      }
    ]
  };
}

const db = global.mockDb;

export function findUserByEmail(email) {
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function addUser(user) {
  if (findUserByEmail(user.email)) {
    throw new Error("User already exists");
  }
  db.users.push(user);
  return user;
}

export function updateUser(email, updatedData) {
  const index = db.users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...updatedData };
    return db.users[index];
  }
  return null;
}
