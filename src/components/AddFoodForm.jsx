import React, { useState, useEffect } from 'react';
import '../css/AddFoodForm.css'; // Import external CSS

const AddFoodForm = () => {
  const [food, setFood] = useState({
    name: '',
    category: '',
    provider: '',
    grams: '',
    carbs: '',
    protein: '',
    fat: '',
    alcohol: '',
    salt: '',
  });

  const [foodsList, setFoodsList] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [totals, setTotals] = useState({
    protein: 0,
    fat: 0,
    carbs: 0,
    alcohol: 0,
    salt: 0,
  });

  const categories = [
    'Fructe', 'Legume', 'Cereale', 'Leguminoase', 'Oleaginoase',
    'Carne', 'Pește', 'Lactate', 'Ouă', 'Grăsimi', 'Condimente',
    'Băuturi', 'Dulciuri', 'Procesate'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  const fetchFoods = async () => {
    try {
      const response = await fetch('https://booking-backend-mond.onrender.com/api/foods');
      const data = await response.json();
      setFoodsList(data);
  
      const uniqueDates = [...new Set(data.map(item => item.created_at.split('T')[0]))];
      uniqueDates.sort((a, b) => new Date(b) - new Date(a)); // Sort dates in descending order
  
      setDates(uniqueDates);
      
      if (uniqueDates.length > 0) {
        setSelectedDate(uniqueDates[0]); // Set to the latest date
      }
    } catch (err) {
      console.error('Error fetching food data:', err);
    }
  };
  

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
  
    const filteredFoods = foodsList.filter(food => food.created_at.startsWith(selectedDate));
  
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalAlcohol = 0;
    let totalSalt = 0;
    let totalCalories = 0;
  
    filteredFoods.forEach(foodItem => {
      const gramsConsumed = parseFloat(foodItem.grams) || 0;
  
      const protein = (gramsConsumed / 100) * (parseFloat(foodItem.protein) || 0);
      const fat = (gramsConsumed / 100) * (parseFloat(foodItem.fat) || 0);
      const carbs = (gramsConsumed / 100) * (parseFloat(foodItem.carbs) || 0);
      const alcohol = (gramsConsumed / 100) * (parseFloat(foodItem.alcohol) || 0);
      const salt = (gramsConsumed / 100) * (parseFloat(foodItem.salt) || 0);
  
      totalProtein += protein;
      totalFat += fat;
      totalCarbs += carbs;
      totalAlcohol += alcohol;
      totalSalt += salt;
  
      totalCalories += (protein * 4) + (fat * 9) + (carbs * 4) + (alcohol * 7);
    });
  
    setTotals({
      protein: totalProtein.toFixed(2),
      fat: totalFat.toFixed(2),
      carbs: totalCarbs.toFixed(2),
      alcohol: totalAlcohol.toFixed(2),
      salt: totalSalt.toFixed(2),
      calories: totalCalories.toFixed(2),
    });
  
  }, [selectedDate, foodsList]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://booking-backend-mond.onrender.com/api/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Food added successfully!');
        setFood({
          name: '',
          category: '',
          provider: '',
          grams: '',
          carbs: '',
          protein: '',
          fat: '',
          alcohol: '',
          salt: '',
        });

        fetchFoods();
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Add a New Food Item</h1>
      <form onSubmit={handleSubmit} className="food-form">
        <label>Name:</label>
        <input type="text" name="name" value={food.name} onChange={handleInputChange} required />

        <label>Category:</label>
        <select name="category" value={food.category} onChange={handleInputChange} required>
          <option value="" disabled>Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <label>Provider:</label>
        <input type="text" name="provider" value={food.provider} onChange={handleInputChange} />

        <label>Grams:</label>
        <input type="number" name="grams" value={food.grams} onChange={handleInputChange} />

        <div className="macro-inputs">
          <div>
            <label>Carbs:</label>
            <input type="number" name="carbs" value={food.carbs} onChange={handleInputChange} />
          </div>
          <div>
            <label>Protein:</label>
            <input type="number" name="protein" value={food.protein} onChange={handleInputChange} />
          </div>
          <div>
            <label>Fat:</label>
            <input type="number" name="fat" value={food.fat} onChange={handleInputChange} />
          </div>
          <div>
            <label>Salt:</label>
            <input type="number" name="salt" value={food.salt} onChange={handleInputChange} />
          </div>
          <div>
            <label>Alcohol:</label>
            <input type="number" name="alcohol" value={food.alcohol} onChange={handleInputChange} />
          </div>
        </div>

        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Add Food'}</button>
      </form>
      {message && <p className="message">{message}</p>}

      <h2>Select Date to View Daily Intake</h2>
      <select value={selectedDate} onChange={handleDateChange}>
        {dates.map((date, index) => (
          <option key={index} value={date}>{date}</option>
        ))}
      </select>
      <h2>Daily Intake for {selectedDate}</h2>
<table className="daily-intake-table">
  <thead>
    <tr>
      <th>Carbs (g)</th>
      <th>Protein (g)</th>
      <th>Fat (g)</th>
      <th>Alcohol (g)</th>
      <th>Salt (g)</th>
      <th>Calories (kcal)</th> {/* Add Calories Column */}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{totals.carbs}</td>
      <td>{totals.protein}</td>
      <td>{totals.fat}</td>
      <td>{totals.alcohol}</td>
      <td>{totals.salt}</td>
      <td>{totals.calories}</td> {/* Display Calories */}
    </tr>
  </tbody>
</table>

    </div>
  );
};

export default AddFoodForm;
