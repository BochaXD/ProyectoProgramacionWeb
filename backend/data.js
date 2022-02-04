import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Andres',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Puma',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'Pepe',
      email: 'pepe@user.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  
};
export default data;
