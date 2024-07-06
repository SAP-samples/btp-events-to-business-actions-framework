import React, { useState } from 'react';

const StepByStep = () => {
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleStepCompletion = (step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  return (
    <div>
      <h2>Step-by-Step Documentation</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={completedSteps.includes('Step 1')}
            onChange={() => handleStepCompletion('Step 1')}
          />
          Step 1: Introduction
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={completedSteps.includes('Step 2')}
            onChange={() => handleStepCompletion('Step 2')}
          />
          Step 2: Perform Action A
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={completedSteps.includes('Step 3')}
            onChange={() => handleStepCompletion('Step 3')}
          />
          Step 3: Perform Action B
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={completedSteps.includes('Step 4')}
            onChange={() => handleStepCompletion('Step 4')}
          />
          Step 4: Perform Action C
        </label>
      </div>
    </div>
  );
};

export default StepByStep;
