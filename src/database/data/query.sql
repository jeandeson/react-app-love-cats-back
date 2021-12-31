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

create table tb_users_info(
  id int auto_increment primary key,
  user_id int not null,
  user_image varchar(200) not null,
  created_at datetime default CURRENT_TIMESTAMP,
    foreign key (user_id) references tb_users(id)
);

create table tb_cats(
  id int auto_increment primary key,
  user_id int not null,
  name varchar(50) not null,
  brand varchar(50) not null,
  genere varchar(50) not null,
  color varchar(50) not null,
    foreign key (user_id) references tb_users(id)
);

create table tb_posts(
  id int auto_increment primary key,
  user_id int not null,
  content varchar(500) not null,
  created_at datetime default current timestamp
    foreign key (user_id) references tb_users(id)
)

create table tb_likes(
  id int auto_increment primary key,
  user_id int not null,
  post_id int not null,
    foreign key (user_id) references tb_users(id)
    foreign key (post_id) references tb_posts(id),
)

create table tb_follows(
  id int not null PRIMARY KEY AUTO_INCREMENT,
  user_id int not null,
  followed_id int not null
);

create table tb_comments(
  id int not null PRIMARY KEY AUTO_INCREMENT,
  user_id int not null,
  post_id int not null,
  content varchar(200) not null
)

-- CREATE TRIGGER AFTERPOST
--     AFTER insert ON tb_posts
--     FOR EACH ROW
--     INSERT INTO tb_likes (post_id, user_id) VALUES(new.id, new.user_id);