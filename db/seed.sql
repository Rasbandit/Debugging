create table houses (
    id serial PRIMARY KEY,
    img varChar,
    loan DECIMAL,
    title varChar,
    description varChar,
    desired_rent float,
    address varChar,
    zip INTEGER,
    city varChar,
    state varChar,
    recomended_rent numeric,
    mortgage numeric,
    owner integer references user(id)
)

create table favorites (
    id serial primary key,
    user_id INTEGER references users(id) ON DELETE CASCADE,
    house_id Integer references houses(id) ON DELETE CASCADE
)

create table images (
    id serial PRIMARY key,
    url varchar,
    house_id INTEGER REFERENCES houses(id) on delete Cascade
)

create table users(
    id serial PRIMARY key,
    username varchar not null,
    password varchar not null
)

insert into images (url, house_id)
values
(
    'https://static1.squarespace.com/static/560dca68e4b0ffb1cd6f8ae7/5622e16ae4b0501d4068f6ce/5622e16be4b012625400eb4a/1445126508015/Cabin+by+the+Lake+Cline+2015.jpg?format=500w',
    1
),
(
    'https://i.pinimg.com/736x/bd/fa/36/bdfa36950870722ac3439cbfb976a629--bob-ross-paintings-paintings-for-sale.jpg',
    1
),
(
    'https://1209k.com/bobross/images/4066931.jpg',
    1
)

insert into houses (img, loan, title, description, desired_rent, address, zip, city, state, recomended_rent, mortgage)
values
(
'https://render.fineartamerica.com/images/rendered/search/print/images-medium-5/mountain-cabin-c-steele.jpg',
70000,
'Happy Little Cabin',
'The most joyus place on the whole earth',
500,
'235 W Ross Way',
84004,
'Alpine',
'Utah',
400,
6000
),
(
'http://imagescdn.gabriels.net/reno/imagereader.aspx?imageurl=http%3A%2F%2Fm.sothebysrealty.com%2F1103i215%2F8ceqq6py02n5m6jq94w18e5sw6i215&option=N&w=1600&permitphotoenlargement=false',
50000000,
'Owl Mountain Ranch',
'Never before offered legacy ranch! Located adjacent to West Buttermilk Ski Area on 61 private acres at the end of the road.',
25000,
'2900 west buttermilk way',
81611,
'aspen',
'colorado',
3000,
750000
),
('https://vignette.wikia.nocookie.net/fallout/images/9/90/Harpers_shack.jpg/revision/latest?cb=20120831231543',
25,
'The Shack',
'An iradiated house.',
5,
'123 fallout way',
841444,
'Lake Stevens',
'Washington',
50,
2000
),
('https://2.bp.blogspot.com/-IJRYdujk7tU/WSzstqE8GXI/AAAAAAAAXtw/Gzq5eVXPYhojn5EZ4Gtd5_QbwmVem17FgCLcB/s1600/tiny-house-bookstore-5.jpg',
150000,
'Traveling Tiny House Bookstore',
'A traveling tiny house bookstore from France!',
200,
'open road',
0,
'any town',
'any state',
0,
30000
),
('https://i.ytimg.com/vi/6v6RLUb2TQQ/hqdefault.jpg',
10,
'Sticky',
'small but clean and comes with a dog',
5,
'4545 e drive',
89999,
'pinetop',
'AZ',
2,
50
);