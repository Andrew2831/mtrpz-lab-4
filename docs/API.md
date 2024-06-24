## Створити рецепт

`POST /recipes`

* Request:
  * Body:
    ```json
    {
      "name": "Omuraisu",
      "ingridients": "2-eggs, 2-spoons-milk, 1-portion-rice, 5-spoons-ketchup, 2-spoons-soy_sauce, 1-onion, 1-spoon-oil, 1-kg-chicken",
      "stages": "1.cut onions, 2.fire them with oil till the transparency...etc",
      "notes": "якісь замітки"
    }
    ```
* Response:
  ```json
  {
    "message": "Рецепт успішно збережено."
  }
  ```

## Оновити рецепт

`PATCH /recipes/id`

* Request:
  * Body:
    ```json
    {
      "name": "Omuraisu",
      "ingridients": "2-eggs, 2-spoons-milk, 1-portion-rice, 5-spoons-ketchup",
      "stages": "ніяк",
      "notes": "Оновленні замітки"
    }
    ```
* Response:
  ```json
  {
    "message": "Рецепт успішно оновленно."
  }
  ```

## Видалити рецепт

  `DELETE /recipes/id`

  * Response:
    ```json
    {
      "message": "Рецепт успішно видалено."
    }
    ```

## Знайти рецепит за назвою

`GET /recipes/name`

* Response:
  ```json
  {
    "Знайденно": "Такий-то рецепт."
  }
  ```

## Знайти рецепти за інгрідієнтами

`GET /recipes/recommend/ingridient1-ingridient2-...`

* Response:
  ```json
  {
    "Список знайдених рецептів": [...]
  }
  ```
