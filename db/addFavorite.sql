insert into favorites (user_id, house_id)
values ($1, $2)
RETURNING *