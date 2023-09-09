import { Button, Divider, Input, Space } from 'antd';
import { useState } from 'react';

const URL_REGEX = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi


const INITIAL_STATE = {
  name: '',
  image: '',
  calories: 100,
  servings: 1,
}

const validators = {
  name: (value) => {
    if (!value) {
      return 'Name is required'
    }

    return ''
  },
  image: (value) => {
    if (!value) {
      return 'Image is required'
    }

    if (URL_REGEX.test(value) === false) {
      return 'Image url is unsupported'
    }

    return ''
  },
  calories: value => {
    if (!value) {
      return 'Calories number is required'
    }

    if (typeof value !== 'number') {
      return 'Calories must be a number'
    }

    return ''
  },
  servings: value => {
    if (!value) {
      return 'Servings number is required'
    }

    if (typeof value !== 'number') {
      return 'Servings must be a number'
    }

    return ''
  }
}

const AddFoodForm = ({ onCreate }) => {
  const [values, setValues] = useState({
    name: '',
    image: '',
    calories: 100,
    servings: 1,
  });
  const [errors, setErrors] = useState({
    name: '',
    image: '',
    calories: '',
    servings: '',
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const errors = {}
    //['name', 'image', 'calories', 'servings']
    Object.keys(INITIAL_STATE).forEach(key => {
      errors[key] = validators[key](values[key])
    })
    setErrors(errors)

    // ['', '', '', '']
    if (Object.values(errors).every(value => value === '')) {
      onCreate(values);
      setValues(INITIAL_STATE);
    }
  };

  const onChange = (event) => {
    const { name, value, type } = event.target;

    setValues({
      ...values,
      [name]: type === 'number' ? Number(value) : value,
    });

    setErrors({
      ...errors,
      [name]: validators[name](value)
    })
  };

  const onBlur = (event) => {
    // const { name, value } = event.target;

    // setErrors({
    //   ...errors,
    //   [name]: validators[name](value)
    // })
  }

  const isFormValid = Object.values(errors).every(value => value === '');

  return (
    <form onSubmit={onSubmit}>
      <Divider>Add Food Entry</Divider>

      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={onChange}
            autoComplete="off"
            status={errors.name ? 'error' : ''}
            onBlur={onBlur}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <Input
            id="image"
            name="image"
            value={values.image}
            onChange={onChange}
            autoComplete="off"
            status={errors.image ? 'error' : ''}
            
          />
          {errors.image && <p>{errors.image}</p>}
        </div>

        <div>
          <label htmlFor="calories">Calories</label>
          <Input
            type="number"
            min={0}
            id="calories"
            name="calories"
            value={values.calories}
            onChange={onChange}
            autoComplete="off"
            status={errors.calories ? 'error' : ''}
            
          />
          {errors.calories && <p>{errors.calories}</p>}
        </div>

        <div>
          <label htmlFor="servings">Servings</label>
          <Input
            type="number"
            min={0}
            id="servings"
            name="servings"
            value={values.servings}
            onChange={onChange}
            autoComplete="off"
            status={errors.servings ? 'error' : ''}
            
          />
          {errors.servings && <p>{errors.servings}</p>}
        </div>

        <Button htmlType="submit" type="primary" disabled={!isFormValid}>Create</Button>
      </Space>
    </form>
  );
};

export default AddFoodForm;
