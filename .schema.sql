create table users (
  user_id serial primary key,
  user_name varchar(25) not null,
  user_password varchar(100) not null,
  user_email varchar(100)
);
