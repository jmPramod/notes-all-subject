-- user tables
   
CREATE TABLE users ( 
    id SERIAL PRIMARY KEY,  
    user_name VARCHAR(100),
    user_secondName VARCHAR(100),
    user_email VARCHAR(255) UNIQUE,
    user_phone  VARCHAR(15) UNIQUE,
    user_password VARCHAR(255),
    user_role VARCHAR(50),
    cloudinaryPublicId VARCHAR(255),
    user_address VARCHAR(255),
    user_pinCode INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE userImages (
    id SERIAL PRIMARY KEY, 
    user_id INT, -- line 4
    image_url TEXT,-- cloudinary url
    img_public_id VARCHAR(255),--cloudinary public id
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE cartAdded (
    id SERIAL PRIMARY KEY, 
    user_id INT,  
    cart_item_id VARCHAR(255),
     save_later BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  );

-- room Tables

CREATE TABLE rooms (
    
    id SERIAL PRIMARY KEY,
    room_title VARCHAR(255) NOT NULL,
    room_description TEXT,
    room_price int NOT NULL,
    discount_percentage int NOT Null,
    room_rating NUMERIC(3, 1)  ,
    room_city VARCHAR(100),
    room_category VARCHAR(100),
    room_avalibility DECIMAL(2, 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    thumbnail_image_url VARCHAR(255),
    thumbnail_img_public_id VARCHAR(255)
);

CREATE TABLE roomImages (
    id SERIAL PRIMARY KEY,
    room_img_id INTEGER REFERENCES rooms(room_id) ON DELETE CASCADE,
    room_img_url VARCHAR(255),
    room_public_id VARCHAR(255)
);
