create table users (
   user_id      int primary key,
   username     varchar(255) not null,
   email        varchar(255) unique not null,
   password     text not null,
   bio          text,
   created_date timestamp default current_timestamp
);

create table groups (
   group_id     int primary key,
   name         varchar(255) not null,
   creator_id   int,
   created_date timestamp default current_timestamp,
   foreign key ( creator_id )
      references users ( user_id )
);

create table group_users (
   id       int primary key,
   user_id  int,
   group_id int,
   role     varchar(10) check ( role in ( 'admin',
                                      'member' ) ),
   foreign key ( user_id )
      references users ( user_id ),
   foreign key ( group_id )
      references groups ( group_id )
);

create table channels (
   id           int primary key,
   name         varchar(255) not null,
   group_id     int,
   created_date timestamp default current_timestamp,
   foreign key ( group_id )
      references groups ( group_id )
);

create table channel_users (
   id         int primary key,
   user_id    int,
   channel_id int,
   foreign key ( user_id )
      references users ( user_id ),
   foreign key ( channel_id )
      references channels ( id )
);

create table dm (
   id           int primary key,
   user1_id     int,
   user2_id     int,
   created_date timestamp default current_timestamp,
   foreign key ( user1_id )
      references users ( user_id ),
   foreign key ( user2_id )
      references users ( user_id )
);

create table messages (
   id         int primary key,
   sender_id  int,
   is_dm boolean,
   content    text not null,
   created_at timestamp default current_timestamp,
   deleted    boolean default false,
   foreign key ( sender_id )
      references users ( user_id ),
);

 create table channel_messages (
   id         int primary key,
   message_id int,
   channel_id int,
   foreign key ( channel_id )
      references channels ( id ),
 )

 create table dm_messages (
   id         int primary key,
   message_id int,
   dm_id      int,
   foreign key ( dm_id )
      references dm ( id )
 )