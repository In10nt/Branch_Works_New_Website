# Database Files

This directory contains the database files and schemas for the BranchWorks application.

## Contents

### H2 Database Files (Current Data)
- `branchworks_db.mv.db` - H2 database file with current data
- `branchworks_db.trace.db` - H2 trace file

**These files contain:**
- Blog posts (2 entries)
- Career openings
- Admin users
- All application data

### SQL Schema Files
- `blog-schema.sql` - Blog table schema
- `import-current-blogs.sql` - Sample blog data

## Using the Database

### Option 1: Use Existing H2 Database (Recommended)

Copy the H2 database files to your backend data directory:

```bash
# From project root
cp database/branchworks_db.* backend/data/
```

Then configure `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:h2:file:./data/branchworks_db
spring.datasource.username=sa
spring.datasource.password=
```

### Option 2: Start Fresh with H2

Delete the database files and let the application create a new database:

```bash
rm backend/data/branchworks_db.*
```

The application will create a new empty database on startup.

### Option 3: Migrate to MySQL

1. **Create MySQL Database:**
```sql
CREATE DATABASE branchworks_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Update application.properties:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/branchworks_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

3. **Run Application:**
Hibernate will automatically create the tables.

### Option 4: Migrate to PostgreSQL

1. **Create PostgreSQL Database:**
```sql
CREATE DATABASE branchworks_db;
```

2. **Update application.properties:**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/branchworks_db
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

3. **Run Application:**
Hibernate will automatically create the tables.

## Database Schema

### Tables

1. **users** - Admin users for CMS
   - id (Primary Key)
   - username
   - password (BCrypt hashed)
   - role
   - created_at
   - updated_at

2. **blog_posts** - Blog articles
   - id (Primary Key)
   - title
   - slug (URL-friendly)
   - excerpt
   - content (HTML)
   - author
   - featured_image
   - published (boolean)
   - published_at
   - created_at
   - updated_at

3. **careers** - Job openings
   - id (Primary Key)
   - title
   - location
   - work_type (Full-time, Part-time, Remote, etc.)
   - department
   - linkedin_url
   - description
   - experience
   - salary
   - skills
   - responsibilities
   - qualifications
   - active (boolean)
   - created_at
   - updated_at

## Default Admin User

**Username:** `admin`  
**Password:** `admin123`

⚠️ **IMPORTANT:** Change this password immediately after first login!

## Accessing H2 Console (Development Only)

When using H2 database:

1. Start the backend application
2. Go to: `http://localhost:5000/h2-console`
3. Use these settings:
   - **JDBC URL:** `jdbc:h2:file:./data/branchworks_db`
   - **User Name:** `sa`
   - **Password:** (leave empty)

## Data Migration

To migrate data from H2 to MySQL/PostgreSQL:

1. Export data from H2 Console as SQL
2. Modify SQL for target database syntax
3. Import into MySQL/PostgreSQL

Or use a migration tool like Flyway or Liquibase.

## Backup

To backup the H2 database:

```bash
cp backend/data/branchworks_db.* backup/
```

To backup MySQL/PostgreSQL:

```bash
# MySQL
mysqldump -u username -p branchworks_db > backup.sql

# PostgreSQL
pg_dump -U username branchworks_db > backup.sql
```

## Notes

- The H2 database files are included for convenience
- For production, use MySQL or PostgreSQL
- Hibernate auto-creates tables based on entity classes
- Database schema is managed by JPA annotations in the code
