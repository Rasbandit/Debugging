insert into houses (img, loan, title, description, desired_rent, address, zip, city, state, recomended_rent, mortgage, owner)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING *