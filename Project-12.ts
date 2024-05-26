#!/usr/bin/env node

//BMI Calculator

import inquirer from 'inquirer';
import chalk from 'chalk';

type Answers = {
  weight: number;
  height: number;
};

const questions = [
  {
    type: 'input',
    name: 'weight',
    message: 'Enter your weight in kilograms (kg):',
    validate: (input: string) => {
      const value = parseFloat(input);
      if (isNaN(value) || value <= 0) {
        return 'Please enter a valid weight.';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'height',
    message: 'Enter your height in meters (m):',
    validate: (input: string) => {
      const value = parseFloat(input);
      if (isNaN(value) || value <= 0) {
        return 'Please enter a valid height.';
      }
      return true;
    },
  },
];

function calculateBMI(weight: number, height: number): number {
  return weight / (height * height);
}

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obesity';
  }
}

async function main() {
  console.log(chalk.bold('Welcome to the BMI Calculator!'));

  const answers: Answers = await inquirer.prompt(questions);

  const weight = parseFloat(answers.weight.toString());
  const height = parseFloat(answers.height.toString());

  const bmi = calculateBMI(weight, height);
  const category = getBMICategory(bmi);

  console.log(chalk.green(`Your BMI is: ${bmi.toFixed(2)}`));
  console.log(chalk.blue(`BMI Category: ${category}`));
}

main();
