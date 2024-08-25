document.addEventListener('DOMContentLoaded',()=>{
    const feetInput = document.getElementById('feet');
    const inchesInput = document.getElementById('inches');
    const heightInput=document.querySelector('.height-inputs');
    const weightInput = document.getElementById('weight');
    const calculateButton = document.getElementById('calculate-bmi');
    const bmiValueElement = document.getElementById('bmi-value');
    const bmiNeedle = document.querySelector('.bmi-needle');
    const healthyWeightRangeElement = document.querySelector('.bmi-weight-range div');

    calculateButton.addEventListener('click', (e) => {
        e.preventDefault();

        let heightInMeters;
        const feet = document.getElementById('feet').value;
        const inches = document.getElementById('inches').value;
        heightInMeters = (parseInt(feet) * 12 + parseInt(inches)) * 0.0254;
        

        const weight = parseFloat(weightInput.value);
        const bmi = weight / (heightInMeters * heightInMeters);
        bmiValueElement.textContent = bmi.toFixed(2);

        updateNeedlePosition(bmi);
        updateHealthyWeightRange(heightInMeters);
        updateMessage(bmi);
    });

    function updateNeedlePosition(bmi) {
        const minBmi = 10;
        const maxBmi = 40;
        const meterWidth = document.querySelector('.bmi-meter-band').offsetWidth;
    
        // Calculate position percentage based on BMI value
        let positionPercentage = (bmi - minBmi) / (maxBmi - minBmi);
    
        // Clamp the position percentage to be between 0 and 1
        positionPercentage = Math.max(0, Math.min(1, positionPercentage));
    
        // Calculate position in pixels
        const position = positionPercentage * meterWidth;
    
        // Ensure the needle stays within the band
        const bmiNeedle = document.querySelector('.bmi-needle');
        bmiNeedle.style.left = `${position}px`;
    }
    

    function updateHealthyWeightRange(heightInMeters) {
        const minHealthyWeight = 18.5 * (heightInMeters * heightInMeters);
        const maxHealthyWeight = 24.9 * (heightInMeters * heightInMeters);
        healthyWeightRangeElement.textContent = `${minHealthyWeight.toFixed(1)} - ${maxHealthyWeight.toFixed(1)} Kg`;
    }

    function updateMessage(bmi) {

        const bmiIconDiv = document.querySelector('.bmi-message img'); 
        const bmiTitle = document.querySelector('.bmi-message h3');
        const bmiMessage = document.querySelector('.bmi-message p');

        if (bmi < 18.5) {
            bmiIconDiv.src = "alert.png";
            bmiTitle.textContent = "Underweight";
            bmiMessage.textContent = "You are underweight. It's important to eat a nutritious diet and consult a healthcare provider.";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            bmiIconDiv.src = "happy.png";
            bmiTitle.textContent = "Normal Weight";
            bmiMessage.textContent = "Good job! You’re managing a healthy weight, so make sure you do not tip on either side of the scale.";
        } else if (bmi >= 25 && bmi <= 29.9) {
            bmiIconDiv.src = "alert.png";
            bmiTitle.textContent = "Overweight";
            bmiMessage.textContent = "You are overweight. Consider a balanced diet and regular exercise.";
        } else {
            bmiIconDiv.src = "alert.png";
            bmiTitle.textContent = "Obesity";
            bmiMessage.textContent = "You are in the obesity range. It's advisable to seek guidance from a healthcare provider.";
        }

    }
});