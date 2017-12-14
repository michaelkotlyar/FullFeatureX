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

COPY users (user_name, user_password, user_email) FROM stdin;
Harley	Monss	Uce@o.com
Drongo	cappucino	wowowowow@o.com
Kotlya	oinoi	grams@themansion.com
Rebbe	bromane	traphouse@themansion.com
Sixfigure	03910139	rollsroyce@themansion.com
Grandtowerboy	hunnedmil	mills@themansion.com
OneThree6	oinoi	feelins@themansion.com
Bromane	oinoi	ghosts@themansion.com
Borat	borat	rocketships@themansion.com
Concrete	oinoi	60degreez@themansion.com
Syndicate3333	oidnoi	40onthehill@themansion.com
Kotlya	oiss	lakehouse@themansion.com
\.
