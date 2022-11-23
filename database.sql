
create TABLE event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    info VARCHAR(255),
    date DATE,
    time TIME,
    address VARCHAR(255),
    subject VARCHAR(255)
);
