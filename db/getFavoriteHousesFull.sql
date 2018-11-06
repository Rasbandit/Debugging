select * from favorites
join houses on houses.id = favorites.house_id
where user_id = $1