# Marketplace Backend Setup

## Overview
This is the Node.js/Express backend for the Marketplace application with MongoDB integration.

## Project Structure
```
backend/
├── src/
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore file
├── package.json        # Dependencies
└── README.md           # This file
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT tokens
- `CORS_ORIGIN`: Frontend URL for CORS

### 3. MongoDB Setup
Make sure MongoDB is running locally or use MongoDB Atlas:

**Local MongoDB:**
```bash
# Windows - using MongoDB Community Edition
mongod
```

**MongoDB Atlas (Cloud):**
Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/marketplace?retryWrites=true&w=majority
```

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### User Routes (`/api/users`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update user profile (protected)
- `GET /` - Get all users (admin)

### Product Routes (`/api/products`)
- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `GET /seller/:sellerId` - Get seller's products
- `POST /` - Create product (protected)
- `PUT /:id` - Update product (protected)
- `DELETE /:id` - Delete product (protected)

### Order Routes (`/api/orders`)
- `GET /` - Get user's orders (protected)
- `GET /:id` - Get order by ID (protected)
- `POST /` - Create order (protected)
- `PUT /:id` - Update order status (protected)
- `GET /admin/all` - Get all orders (admin)

### Review Routes (`/api/reviews`)
- `GET /product/:productId` - Get product reviews
- `POST /` - Create review (protected)
- `PUT /:id` - Update review (protected)
- `DELETE /:id` - Delete review (protected)

## Database Models

### User
- name, email, password, phone, avatar
- address (street, city, state, zipCode, country)
- role (user, seller, admin)
- timestamps

### Product
- title, description, price, discount
- category, images, stock, sold
- seller (reference to User)
- rating, reviews count
- location, tags
- timestamps

### Order
- orderNumber, user, items
- totalAmount, shippingAddress
- paymentMethod, paymentStatus
- orderStatus, trackingNumber
- timestamps

### Review
- product, user, rating, title, comment
- helpful count, verified status
- timestamps

## Environment Variables Reference

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/marketplace
MONGODB_USER=
MONGODB_PASSWORD=

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

## Testing the API

### Using cURL:
```bash
# Register
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Get products
curl http://localhost:5000/api/products
```

### Using Postman:
Import the API endpoints and test them using the Postman collection (can be created separately).

## Key Features
✅ User authentication with JWT
✅ Product management
✅ Order management
✅ Review system
✅ MongoDB integration
✅ CORS enabled
✅ Error handling
✅ Input validation

## Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variables
- **cors**: Cross-origin requests
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **multer**: File upload handling
- **nodemon** (dev): Auto-reload server

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For MongoDB Atlas, verify IP whitelist

### CORS Error
- Update `CORS_ORIGIN` in `.env` with your frontend URL
- Default is `http://localhost:5173`

### JWT Errors
- Ensure `JWT_SECRET` is set in `.env`
- Token must be sent in Authorization header: `Bearer <token>`

## Next Steps
1. Connect frontend to these APIs
2. Implement image upload functionality
3. Add payment gateway integration
4. Implement search and filtering
5. Add admin dashboard

## Frontend Integration Example

```javascript
// Frontend API call example
const response = await axios.get('http://localhost:5000/api/products');
```

## Support & Maintenance
- Review MongoDB documentation for schema optimization
- Monitor API performance
- Implement logging for production
- Set up automated backups for MongoDB

