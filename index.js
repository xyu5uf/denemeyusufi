// JavaScript code for Simple Truss Analysis
// my_truss_analysis.js

// Input parameters
const E = 30e6;  // Modulus of elasticity (psi)
const A = 2;     // Cross-sectional area (in^2)
const L = 120;   // Length of the truss member (in)
const P = 10000; // Applied load (lbs)

// Nodal coordinates and connectivity matrix
const nodeCoordinates = [[0, 0], [0, 120], [120, 10], [120, 0]];
const elementNodes = [[1, 2], [1, 3], [1, 4]];

// Number of nodes and elements
const numberNodes = nodeCoordinates.length;
const numberElements = elementNodes.length;

// Compute element length and cosine of the angle
const L_array = [];
const cosTheta_array = [];

for (let i = 0; i < numberElements; i++) {
    const node1 = elementNodes[i][0] - 1;
    const node2 = elementNodes[i][1] - 1;
    const dx = nodeCoordinates[node2][0] - nodeCoordinates[node1][0];
    const dy = nodeCoordinates[node2][1] - nodeCoordinates[node1][1];
    L_array[i] = .sqrt(dx ** 2 + dy ** 2);
    cosTheta_array[i] = dx / L_array[i];
}

// Compute axial force in each element
const force = cosTheta_array.map(cosTheta => P * cosTheta);

// Compute displacements
const displacements = new Array(2 * numberNodes).fill(0);
for (let i = 1; i < numberNodes; i++) {
    displacements[2 * i] = force[i] / E;
}

// Display results
console.log('Nodal Displacements:');
console.log(displacements);

console.log('Axial Forces in Elements:');

