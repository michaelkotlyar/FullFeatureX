create table user_types (
  type_code integer unique not null,
  type_name varchar(20) unique not null
);

COPY user_types (type_code, type_name) FROM stdin;
0	user
1	admin
\.

create table users (
  user_id serial primary key,
  user_name varchar(25) not null,
  user_password varchar(100) not null,
  user_email varchar(100) unique not null,
  user_type integer references user_types(type_code) default 0
);

-- Create users (Username: Borat, Password: borat) (Username: Michael, Password: michael)
COPY users (user_name, user_password, user_email) FROM stdin;
Borat	$2a$10$JFLMr12qjfoTdVOp/INmvOCKzzs0r0KvMQQX9O4aOSnrEIC79Xvoi	borat@kazakhstan.com
Michael	$2a$10$2st4h76DMLOhU4flJPcqA.70vWFTpaCzPJ/dKQrtMli6IWg2UaFCC	michael@michael.com
\.
