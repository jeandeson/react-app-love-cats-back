create database app-cat-lover;
use app-cat-lover;

create table tb_users(
  id int auto_increment primary key,
  name varchar(50) not null,
  email varchar(50) not null unique,
  password varchar(500) not null,
  pass_reset_token varchar(50),
  pass_reset_expires datetime,
);

-- create table tb_users_info(
--   id int auto_increment primary key,
--   user_id int not null,
--   user_image varchar(200) not null,
--   created_at datetime not null,
--   pass_res_token varchar(50) not null,
--   pass_res_expires datetime not null,
--     foreign key (user_id) references tb_users(id)
-- );

create table tb_cats(
  id int auto_increment primary key,
  user_id int not null,
  name varchar(50) not null,
  brand varchar(50) not null,
  genere varchar(50) not null,
  color varchar(50) not null,
    foreign key (user_id) references tb_users(id)
);

-- create table brands(
--   id int auto_increment primary key,
--   cat_id int foreign key (cat_id_fk) references tb_cats(id),
--   brand varchar(50) not null
-- );