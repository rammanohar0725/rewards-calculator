import React, { useState, useCallback } from 'react';
import RewardsDisplay from './RewardsDisplay';

const RewardsCalculator = () => {
    const [transactions, setTransactions] = useState('');
    const [rewards, setRewards] = useState({});
  
    const handleInputChange = useCallback((e) => {
      const { value } = e.target;
      setTransactions(value);
    }, []);

    const calculateRewards = useCallback((transactions) => {
        const rewards = {};
    
        transactions.forEach(({ customer, amount, date }) => {
        const month = new Date(date).getMonth() + 1; // getMonth() is zero-based
        const points = calculatePoints(amount);
    
        if (!rewards[customer]) {
            rewards[customer] = { monthly: {}, total: 0 };
        }
    
        if (!rewards[customer].monthly[month]) {
            rewards[customer].monthly[month] = 0;
        }
    
        rewards[customer].monthly[month] += points;
        rewards[customer].total += points;
        });
    
        return rewards;
    }, []);
  
    const handleCalculate = useCallback(() => {
      try {
        const parsedTransactions = JSON.parse(transactions);
        const calculatedRewards = calculateRewards(parsedTransactions);
        setRewards(calculatedRewards);
      } catch (error) {
        console.error("Invalid JSON input:", error);
        alert("Invalid JSON input. Please check your format.");
      }
    }, [transactions, calculateRewards]);

    const calculatePoints = (amount) => {
        let points = 0;
        if (amount > 100) {
        points += (amount - 100) * 2;
        amount = 100;
        }
        if (amount > 50) {
        points += (amount - 50) * 1;
        }
        return points;
    };
  
    return (
      <div>
        <h1>Rewards Calculator</h1>
        <textarea
          name="transactions"
          rows="10"
          cols="50"
          value={transactions}
          onChange={handleInputChange}
          placeholder='Enter transactions as JSON: [{"customer": "John", "amount": 120, "date": "2024-05-15"}, ...]'
        ></textarea>
        <br />
        <button onClick={handleCalculate}>Calculate Rewards</button>
        <RewardsDisplay rewards={rewards} />
      </div>
    );
  };

  export default RewardsCalculator;