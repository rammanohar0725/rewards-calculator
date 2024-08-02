import React from 'react';

const RewardsDisplay = React.memo(({ rewards }) => {
    return (
      <div>
        <h2>Rewards</h2>
        {Object.entries(rewards).map(([customer, { monthly, total }]) => (
          <div key={customer}>
            <h3>{customer}</h3>
            <div>Total Points: {total}</div>
            <div>
              {Object.entries(monthly).map(([month, points]) => (
                <div key={month}>
                  Month {month}: {points} points
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  });
  
export default RewardsDisplay;