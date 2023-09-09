import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import foodsJson from '../foods.json';
import FoodBox from './FoodBox';
import AddFoodForm from './AddFoodForm';
import { Divider, Input, Row } from 'antd';

const FoodList = () => {
  const [foods, setFoods] = useState(foodsJson);
  const [search, setSearch] = useState('');

  const onDelete = (event) => {
    const { value: foodId } = event.currentTarget;

    setFoods(foods.filter((food) => food.id !== foodId));
  };

  const onCreate = (food) => {
    const foodToCreate = {
      ...food,
      id: uuidv4(),
    };

    setFoods([foodToCreate, ...foods]);
  };

  const onSearch = (event) => {
    setSearch(event.target.value);
  };

  const foodsToRender = search
    ? foods.filter((food) => food.name.toLowerCase().includes(search))
    : foods;

  return (
    <div className="FoodList">
      <AddFoodForm onCreate={onCreate} />

      <Divider>Food List</Divider>

      <Input
        value={search}
        onChange={onSearch}
        autoComplete="off"
        placeholder="Type the item's name you are searching for"
      />
      {foodsToRender.length > 0 ? (
        <Row style={{ width: '100%' }}>
          {foodsToRender.map((food) => (
            <FoodBox key={food.id} food={food} onDelete={onDelete} />
          ))}
        </Row>
      ) : (
        <p>There are no foods to show</p>
      )}
    </div>
  );
};

export default FoodList;
