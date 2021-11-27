create database api_produtos;
use api_produtos;

create table tb_produtos(
  id int auto_increment primary key,
  descricao varchar(200) not null,
  preco float(8,2) not null
);