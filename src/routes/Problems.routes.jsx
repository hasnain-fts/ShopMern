import { lazy } from "react";

const MinimumBottleChange = lazy(() =>
  import("@/components/Problems/MinimumBottleChange/MinimumBottleChange")
);
const CardValueMinimization = lazy(() =>
  import("@/components/Problems/CardValueMinimization/CardValueMinimization")
);

const MaxMinDifference = lazy(() =>
  import("@/components/Problems/MaxMinDifference/MaxMinDifference")
);

export const problemRoutes = [
  {
    path: "/minimum-bottle-change",
    title: "Minimum Bottle Change",
    showInMenu: true,
    hocProblemLayout: true,
    component: <MinimumBottleChange />,
    ProblemQuestion: `<h2>🧃 Minimum Bottle Change Problem</h2>

<p>
You are given an unlimited supply of bottles with the following sizes:
</p>

<ul>
  <li><strong>1 liter</strong></li>
  <li><strong>5 liters</strong></li>
  <li><strong>7 liters</strong></li>
  <li><strong>10 liters</strong></li>
</ul>

<p>
You are also given a number <strong>N</strong>, representing the total liters of liquid you want to collect.
</p>

<p>
Your task is to determine:
</p>

<ol>
  <li>The <strong>minimum number of bottles</strong> required to collect exactly <strong>N</strong> liters.</li>
  <li>The <strong>sizes of the bottles</strong> used to achieve this minimum.</li>
</ol>

<h3>Rules</h3>
<ul>
  <li>You may use <strong>any bottle size</strong> any number of times.</li>
  <li>The total amount collected must be <strong>exactly N liters</strong>.</li>
</ul>

<h3>Example</h3>

<p>
<strong>Input:</strong> N = 14
</p>

<p>
<strong>Output:</strong>
</p>

<ul>
  <li>Minimum Bottles: <strong>2</strong></li>
  <li>Bottles Used: <strong>[7, 7]</strong></li>
</ul>

<p>
Because <strong>7 + 7 = 14</strong> and no solution uses fewer bottles.
</p>
`,
  },
  {
    path: "/card-value-minimization",
    title: "Card Value Minimization",
    showInMenu: true,
    hocProblemLayout: true,
    component: <CardValueMinimization />,
    ProblemQuestion: `<h2>🃏 Card Value Minimization Problem</h2>

<p>
You have recently joined a company. Your manager takes your team out for a team building activity.
There are <strong>N</strong> people in your team excluding you and your manager.
</p>

<p>
Each person is given a card containing an integer value and they are seated in a row from
position <strong>0</strong> to <strong>N - 1</strong>.
</p>

<p>
You are allowed to erase the integers on the cards and write new integers, with the following rule:
</p>

<ul>
  <li>If <strong>A[i] &lt; A[i + 1]</strong>, then the new value at position <strong>i</strong> must still be less than the value at position <strong>i + 1</strong>.</li>
  <li>If <strong>A[i] &gt; A[i + 1]</strong>, then the new value at position <strong>i</strong> must still be greater than the value at position <strong>i + 1</strong>.</li>
  <li>If <strong>A[i] = A[i + 1]</strong>, then the new values must also be equal.</li>
</ul>

<p>
Your goal is to create a new array such that:
</p>

<ul>
  <li>All values are <strong>non-negative integers</strong>.</li>
  <li>The values are as <strong>small as possible</strong>.</li>
  <li>All original relationships between adjacent values are preserved.</li>
</ul>

<p>
After creating this minimized array, return the <strong>maximum value</strong> present in it.
</p>

<h3>Function Description</h3>

<p>
Complete the function <strong>max_value</strong> which accepts the following parameters:
</p>

<ul>
  <li><strong>values_on_cards[]</strong>: an array of integers</li>
  <li><strong>no_of_people</strong>: number of people (size of the array)</li>
</ul>

<p>
The function should return a single integer representing the maximum value of the minimized array.
</p>

<h3>Example</h3>

<p><strong>Input:</strong></p>
<pre>
values_on_cards = [4, 2, 6]
no_of_people = 3
</pre>

<p><strong>Output:</strong></p>
<pre>
1
</pre>

<p>
<strong>Explanation:</strong><br />
The original relationships are preserved as:
</p>

<ul>
  <li>4 &gt; 2</li>
  <li>2 &lt; 6</li>
</ul>

<p>
The minimized non-negative array becomes:
</p>

<pre>
[1, 0, 1]
</pre>

<p>
The maximum value in this array is <strong>1</strong>.
</p>

<h3>Constraints</h3>

<ul>
  <li>1 ≤ N ≤ 10<sup>5</sup></li>
  <li>−10<sup>9</sup> ≤ values_on_cards[i] ≤ 10<sup>9</sup></li>
</ul>
`,
  },
  {
    path: "/Max-Min-Difference",
    title: "Max Min Difference",
    showInMenu: true,
    hocProblemLayout: true,
    component: <MaxMinDifference />,
    ProblemQuestion: `<h2>🌡️ Maximum Temperature Variation Problem</h2> 
    <p> You are working as a warehouse manager. 
    Your warehouse records the **daily temperature readings** over several days in order to monitor storage conditions. </p> 
    <p> There are <strong>N</strong> days of recorded temperatures, given as integer values in a row from day <strong>0</strong> to day <strong>N - 1</strong>. </p> 
    <p> Management wants to know the **maximum possible temperature variation** during this period. </p> <p> Your task is to find the difference between the **highest and lowest temperatures** recorded. 
    </p> 
    <h3>Example</h3> 
    <p><strong>Input:</strong></p> <pre> temperatures = 4, 9, 2, 7, 5 <br/> no_of_days = 5 </pre> <p><strong>Output:</strong></p> <pre> 11 </pre> <p> <strong>Explanation:</strong><br /> The highest temperature is <strong>9</strong> and the lowest temperature is <strong>2</strong>.<br /> The difference is <strong>9 - (2) = 7</strong>. </p> <h3>Constraints</h3> <ul> <li>1 ≤ N ≤ 10<sup>5</sup></li> <li>−10<sup>9</sup> ≤ temperatures[i] ≤ 10<sup>9</sup></li> </ul>
`,
  },
];
