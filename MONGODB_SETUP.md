# MongoDB Setup Guide for Blog Module

This guide will help you set up MongoDB for the blog module.

## Prerequisites

- MongoDB database (local or cloud)
- MongoDB connection string (URI)

## Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the free tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter username and password (save these!)
   - Set user privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your server's IP address
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `kenmccoy`)

### Option 2: Local MongoDB

1. **Install MongoDB**
   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB**
   ```bash
   # On Linux/Mac
   sudo systemctl start mongod
   
   # On Windows
   # MongoDB should start automatically as a service
   ```

3. **Connection String**
   - Default local connection: `mongodb://localhost:27017/kenmccoy`
   - Or: `mongodb://127.0.0.1:27017/kenmccoy`

## Environment Variables

Add the MongoDB connection string to your `.env.local` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kenmccoy?retryWrites=true&w=majority

# Or for local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/kenmccoy
```

**Important:** 
- Replace `username` and `password` with your MongoDB credentials
- Replace `cluster` with your actual cluster name
- Replace `kenmccoy` with your database name

## Install Dependencies

Make sure to install mongoose:

```bash
npm install
```

This will install `mongoose` which is already added to `package.json`.

## Verify Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Check the console - you should see:
   ```
   ✅ MongoDB connected successfully
   ```

3. Try creating a blog post through the admin panel:
   - Go to `/blog/admin/login`
   - Login with OTP
   - Create a new blog post
   - Check your MongoDB database - you should see the new document in the `blogs` collection

## Database Structure

The blog posts are stored in a collection called `blogs` with the following structure:

```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  excerpt: String,
  tags: [String],
  status: "published" | "draft",
  featuredImage: String | null,
  slug: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Connection Error: "MongoNetworkError"

- Check your MongoDB connection string
- Verify your IP is whitelisted (for Atlas)
- Check if MongoDB service is running (for local)

### Connection Error: "Authentication failed"

- Verify your username and password are correct
- Make sure special characters in password are URL-encoded

### "Cannot find module 'mongoose'"

- Run `npm install` to install dependencies

### "MONGODB_URI is not defined"

- Make sure `.env.local` file exists in the project root
- Verify the `MONGODB_URI` variable is set correctly
- Restart your development server after adding the variable

## Production Setup

For production deployment:

1. Add `MONGODB_URI` to your production environment variables
2. Make sure your production server's IP is whitelisted in MongoDB Atlas
3. Use a strong database password
4. Consider using MongoDB connection pooling for better performance

## Migration from File Storage

If you were using file-based storage before:

1. The old data in `/data/blog-posts.json` will not be automatically migrated
2. You can manually import data if needed:
   - Export data from the JSON file
   - Use MongoDB Compass or mongoimport to import into your database
   - Or create a migration script to transfer data

## Next Steps

Once MongoDB is set up:
- ✅ Blog posts will be stored in MongoDB
- ✅ All CRUD operations will work with the database
- ✅ Data will persist across server restarts
- ✅ You can scale your application easily








