import { Button, Card, Col } from 'antd';

const FoodBox = ({ food, onDelete }) => {
  const { name, calories, image, servings, id } = food;

  return (
    <Col style={{ width: '33%' }}>
      <Card title={name} style={{ margin: 10 }}>
        <img src={image} height={60} alt={name} />
        <p>Calories: {calories}</p>
        <p>Servings {servings}</p>
        <p>
          <b>Total Calories: {calories * servings}</b> kcal
        </p>
        <Button htmlType="button" type="primary" value={id} onClick={onDelete}> Delete </Button>
      </Card>
    </Col>
  )
};

export default FoodBox;
